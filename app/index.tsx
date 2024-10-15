import useScreenTime from '@/hooks/useScreenTime'
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
  TextInput,
  Platform,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import {
  FamilyActivitySelection,
  ScreenTime,
  AuthorizationStatus,
} from 'react-native-screen-time-api'

export default function Home() {
  const [sessionName, setSessionName] = useState('Friday Focus Session')
  const [duration, setDuration] = useState(new Date(0, 0, 0, 2, 0)) // Default to 2 hours
  const [showPicker, setShowPicker] = useState(false)
  const [animation] = useState(new Animated.Value(0))

  const { checkAuthorization, handleAddNewBlockingList, handleStartSession } =
    useScreenTime({
      sessionName,
      duration: `${duration.getHours()}h${duration.getMinutes()}m`,
    })

  React.useEffect(() => {
    ScreenTime.requestAuthorization('individual').then(async () => {
      const status = await ScreenTime.getAuthorizationStatus()
      console.log('Authorization status:', status) // 'approved', 'denied', or 'notDetermined'
      if (status !== 'approved') {
        throw new Error('user denied screen time access')
      }
    })
  }, [])

  const fadeInStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || duration
    setShowPicker(Platform.OS === 'ios')
    setDuration(currentDate)
  }

  const showTimepicker = () => {
    setShowPicker(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, fadeInStyle]}>
        <Text style={styles.title}>Start Session</Text>
        <View style={styles.nameContainer}>
          <Text style={styles.nameLabel}>Session Name</Text>
          <TextInput
            style={styles.sessionName}
            value={sessionName}
            onChangeText={setSessionName}
          />
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.durationTitle}>Select Duration</Text>
          <TouchableOpacity
            onPress={showTimepicker}
            style={styles.durationDisplay}
          >
            <Text style={styles.durationText}>
              {duration.getHours()} hours {duration.getMinutes()} minutes
            </Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              className={styles.datePicker}
              testID="dateTimePicker"
              value={duration}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            />
          )}
        </View>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleAddNewBlockingList}
          >
            <Text style={styles.optionText}>Blocking Lists</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartSession}
        >
          <Text style={styles.startButtonText}>START SESSION</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1c2a',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  nameContainer: {
    marginBottom: 20,
  },
  nameLabel: {
    color: '#a3e635',
    fontSize: 16,
    marginBottom: 5,
  },
  sessionName: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2c3a',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  optionText: {
    color: '#ffffff',
    marginLeft: 15,
    fontSize: 18,
  },
  durationContainer: {
    marginBottom: 20,
  },
  durationTitle: {
    color: '#a3e635',
    fontSize: 18,
    marginBottom: 10,
  },
  durationButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  durationButton: {
    width: '30%',
    backgroundColor: '#2a2c3a',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedDurationButton: {
    backgroundColor: '#a3e635',
  },
  durationButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  selectedDurationButtonText: {
    color: '#1a1c2a',
    fontWeight: 'bold',
  },
  customDurationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2c3a',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  datePicker: {
    color: '#fff',
  },
  customDurationText: {
    color: '#a3e635',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#a3e635',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#1a1c2a',
    fontWeight: 'bold',
    fontSize: 18,
  },
  customDurationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  customDurationInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  customDurationUnit: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  durationDisplay: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  durationText: {
    fontSize: 18,
    textAlign: 'center',
  },
})

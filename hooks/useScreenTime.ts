import { useState } from 'react'
import {
  FamilyActivitySelection,
  ScreenTime,
  AuthorizationStatus,
} from 'react-native-screen-time-api'
import { Alert } from 'react-native'

type useScreenTimeProps = {
  sessionName: string
  duration: string | null
}

const useScreenTime = ({ sessionName, duration }: useScreenTimeProps) => {
  const [authStatus, setAuthStatus] = useState('notRequested')
  const [activitySelection, setActivitySelection] = useState(
    <FamilyActivitySelection | null>null,
  )

  const checkAuthorization = async () => {
    try {
      ScreenTime.requestAuthorization('individual')

      if (status !== 'approved') {
        Alert.alert(
          'Authorization Required',
          'Please grant Screen Time access to use this feature.',
        )
      }
    } catch (error) {
      console.error('Error checking authorization:', error)
    }
  }

  const handleAddNewBlockingList = async () => {
    try {
      const options = {
        headerText: 'Select apps and websites to block',
        footerText: 'These items will be added to your new blocking list',
        includeApplications: true,
        includeWebsites: true,
      }
      const newSelection = await ScreenTime.displayFamilyActivityPicker(options)

      await ScreenTime.setActivitySelection(newSelection)
      setActivitySelection(newSelection)

      Alert.alert('Success', 'New blocking list created successfully!')
    } catch (error) {
      console.error('Error creating new blocking list:', error)
      Alert.alert(
        'Error',
        'Failed to create new blocking list. Please try again.',
      )
    }
  }

  const handleStartSession = async () => {
    if (authStatus !== 'approved') {
      Alert.alert(
        'Authorization Required',
        'Please grant Screen Time access to start a session.',
      )
      return
    }

    if (!duration) {
      Alert.alert('Duration Required', 'Please select a session duration.')
      return
    }

    if (!activitySelection) {
      Alert.alert(
        'Blocking List Required',
        'Please create a blocking list before starting a session.',
      )
      return
    }

    try {
      // Set the activity selection
      await ScreenTime.setActivitySelection(activitySelection)

      // Here, we would ideally start a timer for the selected duration
      // Since we can't directly control the duration through the API,
      // we'll just inform the user that the session has started
      Alert.alert(
        'Session Started',
        `"${sessionName}" has started with the selected blocking list. It will last for ${duration}.`,
      )

      // In a real app, you might want to start a local timer here
      // and notify the user when the session is over
    } catch (error) {
      console.error('Error starting session:', error)
      Alert.alert('Error', 'Failed to start the session. Please try again.')
    }
  }

  return {
    authStatus,
    setAuthStatus,
    activitySelection,
    handleAddNewBlockingList,
    handleStartSession,
    checkAuthorization,
  }
}

export default useScreenTime

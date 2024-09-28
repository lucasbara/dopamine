import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native'

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sessions</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Session</Text>
            <Text style={styles.cardSubtitle}>08:00 - 17:15 | Weekdays</Text>
          </View>
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Locked</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>No Distractions</Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>
            Did you know session templates can also be used with Siri shortcuts
            and focus filters (Do Not Disturb, etc.)?
          </Text>
          <TouchableOpacity style={styles.customizeButton}>
            <Text style={styles.customizeButtonText}>Customize</Text>
          </TouchableOpacity>
        </View>

        {/* Add more cards or components as needed */}
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    margin: 16,
  },
  cardHeader: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#ccc',
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#444',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
  },
  cardDescription: {
    color: '#ccc',
    marginBottom: 8,
  },
  customizeButton: {
    alignSelf: 'flex-start',
  },
  customizeButtonText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#3498db',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  floatingButtonText: {
    fontSize: 24,
    color: 'white',
  },
})

export default HomeScreen

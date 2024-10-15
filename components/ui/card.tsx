import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

type CardProps = {
  title: string
  subtitle: string
  tags: string[]
  description: string
}

export default function Card({
  title,
  subtitle,
  tags,
  description,
}: CardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.customizeButton}>
        <Text style={styles.customizeButtonText}>Customize</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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
})

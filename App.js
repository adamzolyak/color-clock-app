import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { AppState, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
var dayjs = require('dayjs')

export default function App() {
  const [appState, setAppState] = useState(AppState.currentState)
  const [backgroundColors, setBackgroundColors] = useState([])

  useEffect(() => {
    getBackgroundColor()

    AppState.addEventListener('change', () => setAppState(AppState.currentState))

    return () => {
      AppState.removeEventListener('change', () => setAppState(AppState.currentState))
    }
  }, [])

  useEffect(() => {
    if (appState === 'active') {
      let interval = null
      interval = setInterval(() => {
        getBackgroundColor()
      }, 60000)
      return () => clearInterval(interval)
    }
  })

  const getBackgroundColor = () => {
    let colors = ['rgb(255,255,255)']

    let hour = dayjs().hour()

    console.log('break1')

    if (hour < 6) {
    } else if ([6, 7, 8].includes(hour)) {
      colors = ['midnightblue', 'orange']
    } else if ([9, 10, 11].includes(hour)) {
      colors = ['dodgerblue', 'lightskyblue']
    } else if (hour >= 12 && hour < 17) {
      colors = ['dodgerblue', 'dodgerblue']
    } else if (hour >= 17 && hour < 21) {
      colors = ['midnightblue', 'dodgerblue']
    } else if (hour >= 21) {
      colors = ['midnightblue', 'midnightblue']
    }

    setBackgroundColors(colors)
  }

  return (
    <View style={[styles.container]}>
      <StatusBar hidden={true} />
      <LinearGradient
        // Background Linear Gradient
        colors={backgroundColors}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: '100%',
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

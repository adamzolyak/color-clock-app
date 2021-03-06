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

    if (hour < 6) {
      colors = ['#330C70', '#48208A']
    } else if ([6, 7].includes(hour)) {
      colors = ['#330C70', '#FFAE00']
    } else if ([8, 9, 10].includes(hour)) {
      colors = ['#FFAE00', '#FFC854']
    } else if ([11, 12].includes(hour)) {
      colors = ['#FFAE00', '#1E90FF']
    } else if ([13, 14, 15].includes(hour)) {
      colors = ['#1E90FF', '#81C0FF']
    } else if ([16, 17].includes(hour)) {
      colors = ['#1E90FF', '#F055EB']
    } else if ([18, 19, 20].includes(hour)) {
      colors = ['#F055EB', '#F279EE']
    } else if ([21, 22].includes(hour)) {
      colors = ['#330C70', '#F055EB']
    } else if (hour > 22) {
      colors = ['#330C70', '#48208A']
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

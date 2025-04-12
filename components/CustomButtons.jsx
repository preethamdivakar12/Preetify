import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButtons = ({title,containerStyles,handlePress,textStyles,isLoading}) => {
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7} disabled={isLoading}  className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading?'opacity-50': ' '}`}>
    <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
  </TouchableOpacity>
  )
}

export default CustomButtons

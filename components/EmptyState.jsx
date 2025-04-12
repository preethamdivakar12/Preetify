import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButtons from './CustomButtons'
import { router } from 'expo-router'

const EmptyState = ({title,subtitle}) => {
  return (
    <View className='px-4 justify-center items-center'>
       <Image
        className='w-[270px] h-[215]'
        resizeMode='contain'
        source={images.empty}
       />
       <Text className='text-xl text-center text-white font-psemibold mt-2'>
            {title}
           
       </Text>
       <Text className='font-pmedium text-gray-100 text-sm'>
           {subtitle}
       </Text>
       <CustomButtons
          title='Create a video'
          handlePress={()=>router.push('/create')}
          containerStyles='w-full my-5'
       
       />
    </View>
  )
}

export default EmptyState
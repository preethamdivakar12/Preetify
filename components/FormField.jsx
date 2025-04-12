import { View, Text ,TextInput, TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { icons } from '../constants'


const FormField = ({title,handleChangeText,value,keyboardType,otherStyles,placeholder,...props}) => {
    const [showpass, setShowpass] = useState(false)
    const [isFocused, setIsFocused] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='font-pmedium text-gray-100 text-base'>{title}</Text>
      <View className={`w-full h-16 px-4 items-center rounded-2xl border-2 ${isFocused ? 'border-secondary' : 'border-black-200'} bg-black-100 flex-row`}>
          <TextInput
              className='text-white text-base font-psemibold flex-1 mt-2'
              value={value}
              placeholder={placeholder}
              placeholderTextColor='#7b7b8b'
              onChangeText={handleChangeText}
              secureTextEntry={title==='Password' && !showpass}
              onFocus={()=>setIsFocused(true)}
              onBlur={() => setIsFocused(false)}

          />

          {title==='Password' && (
            <TouchableOpacity onPress={()=>setShowpass(!showpass)}>

                  <Image
                  source={showpass ? icons.eye: icons.eyeHide}
                  resizeMode='contain'
                  className='w-6 h-6'
                  />
                  

            </TouchableOpacity>

          )}
      </View>
    </View>
  )
}

export default FormField
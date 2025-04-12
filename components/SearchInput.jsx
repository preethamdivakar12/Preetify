import { View, Text ,TextInput, TouchableOpacity,Image, Alert} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { icons, images } from '../constants'
import { router, usePathname } from 'expo-router'


const SearchInput = ({initialQuery}) => {
    

    const pathname=usePathname();
    const [query, setQuery] = useState(initialQuery || ''); 

    const [isFocused, setIsFocused] = useState(false);
  return (
   
      <View className={`w-full h-16 px-4 items-center rounded-2xl border-2 ${isFocused ? 'border-secondary' : 'border-black-200'} bg-black-100 flex-row space-x-4`}>
          <TextInput
              className='text-white text-base font-pregular flex-1 mt-2'
              value={query}
              placeholder='Search for a video topic'
              placeholderTextColor='#CDCDE0'
              onChangeText={(e)=>setQuery(e)}
 
              onFocus={()=>setIsFocused(true)}  
              onBlur={() => setIsFocused(false)}

          />

            <TouchableOpacity 
            
            onPress={()=>{

                if(!query){
                    return Alert.alert("Missing query", "Please input something to search results across database")
                 }
                 if(pathname.startsWith('/search')){
                    router.setParams({query});
                 }
                 else router.push(`/search/${query}`);

           
            }}
            >
                   <Image
                   source={icons.search}
                   className='w-5 h-5 '
                   resizeMode='contain'
                   
                   />
                
            </TouchableOpacity>

         
      </View>
  
  )
}

export default SearchInput
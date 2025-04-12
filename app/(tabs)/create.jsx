import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { Video ,ResizeMode} from 'expo-av'
import { icons } from '../../constants'
import CustomButtons from '../../components/CustomButtons'
// import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const Create = () => {

  const {user}=useGlobalContext();
  const [uploading,setUploading]=useState(false);
  const [form,setForm]=useState({
    title:'',
    video:null,
    thumbnail:null,
    prompt:''
  })

  const submit=async()=>{
    if(!form.title || !form.prompt || !form.video || !form.thumbnail){
       return Alert.alert("Please fill in all the fields")
    }
    setUploading(true);
    try {
      //
      await createVideo({
        ...form,userId:user.$id

      })


      Alert.alert("Success",'Post Uploaded Successfully')
      router.push('/home')
    } catch (error) {
        Alert.alert('Error',error.message)
    }finally{
      setForm({
        title:'',
        video:null,
        thumbnail:null,
        prompt:''

      } )
      setUploading(false);
    }

  }
  

  const openPicker=async(selectType)=>{
          // const result=await DocumentPicker.getDocumentAsync({
          //   type:selectType==='image'?['image/png','image/jpg','image/jpeg']:['video/mp4','video/gif']
          // })

          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            aspect: [4, 3],
            quality: 1,
          });
           
          if(!result.canceled){
            if(selectType==='image'){
              setForm({...form,thumbnail:result.assets[0]})
            }
            if(selectType==='video'){
              setForm({...form,video:result.assets[0]})
            }
          }
         {/*  else{
            setTimeout(()=>{
              Alert.alert("Document picked",JSON.stringify(result,null,2))
            },100)
          }
            */}

  }

  return (
    <SafeAreaView className='h-full bg-primary'>

      <ScrollView className='px-4 my-6'>

         
            <Text className='text-white font-psemibold text-2xl'>Upload Video</Text>
             <FormField
               title="Video Title"
               value={form.title}
               handleChangeText={(e)=>setForm({...form,title:e})}
               otherStyles="mt-8"
               placeholder="Give your video a stunning title.."
             
             />
             <View className='mt-7 space-y-2'>
                 <Text className='text-gray-100 font-pmedium text-base'>
                   Upload Video
                 </Text>
                 <TouchableOpacity onPress={()=>openPicker('video')}
                  >
                  {form.video?(
                    <Video
                      source={{uri:form.video.uri}}
                      className='w-full h-64 rounded-2xl '
                      // useNativeControls
                      resizeMode={ResizeMode.COVER}
                      // isLooping
                  
                    />):(
                  <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                        <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                                 <Image
                                 source={icons.upload}
                                 className='w-8 h-18'
                                 resizeMode='contain'
                                 />
                        </View>
                  </View>
                )}
                   
                 </TouchableOpacity>

             </View>
               
             <View className='mt-7 space-y-2'>
                 <Text className='text-gray-100 font-pmedium text-base'>
                   Thumbnail Image
                 </Text>
                 <TouchableOpacity onPress={()=>openPicker('image')}
                 >
                  {form.thumbnail?(
                   <Image
                   source={{uri:form.thumbnail.uri}}
                   resizeMode='cover'
                   className='w-full h-64 rounded-2xl'
                   
                   />
                  
                  ):(
                  <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                        <View className='w-full gap-1 h-10 justify-center items-center flex-row'>
                                 <Image
                                 source={icons.upload}
                                 className='w-8 h-6'
                                 resizeMode='contain'
                                 />
                                 <Text className='text-gray-100 font-pmedium text-sm pt-1'>Choose a file</Text>
                        </View>
                  </View>
                )}
                   
                 </TouchableOpacity>

             </View>


              <FormField
               title="AI Prompt"
               value={form.prompt}
               otherStyles="mt-8"
               placeholder="The Prompt for your video"
               handleChangeText={(e)=>setForm({...form,prompt:e})}
             
             />
            <CustomButtons
               title="Submit & Publish"
               handlePress={submit}
               containerStyles="mt-8 mb-10"
               isLoading={uploading}

            />

      </ScrollView>

    </SafeAreaView>
    
    
  )
}

export default Create
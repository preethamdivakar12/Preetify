import { View, Text ,ScrollView,Image, Alert} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images } from '../../constants'
import { useState } from 'react'
import FormField from '../../components/FormField'
import CustomButtons from '../../components/CustomButtons'
import { Link, Redirect,router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const [form, setForm] = useState({
    username:'',
    email:'',
    password:''
  })
const {setUser, setIsLoggedIn}=useGlobalContext();
const [isSubmitting,setIsSubmitting]=useState(false);

const submit=async()=>{

       if(form.username==="" || form.email==="" || form.password===""){
         Alert.alert('Error','Please fill in all the fields')
       }
       setIsSubmitting(true);
       try {
          const result = await createUser(form.email,form.password,form.username)
          setUser(result);
          setIsLoggedIn(true);
          //set it to global state...

          router.replace('/home')
       } catch (error) {
          Alert.alert('Error',error.message)
       }finally{
        setIsSubmitting(false)
       }
       

  }

  return (

  <SafeAreaView className='bg-primary h-full'>
    <ScrollView contentContainerStyle={{Height:"100%"}}>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
           <View className='flex flex-row items-center w-49 h-26'>
            <Image
            source={images.pypng}
            className='w-20 h-20'
            resizeMode='contain'
            />
            <Text className='text-3xl text-white font-pbold'>Preetify</Text>
            </View> 

            <Text className='text-white text-2xl pt-8 font-psemibold'>
              Sign Up
            </Text>
            <FormField
               title='Username'
               value={form.username}
               handleChangeText={(e)=>setForm({...form,username:e})}

               otherStyles='mt-7'
            />
            <FormField
               title='Email'
               value={form.email}
               handleChangeText={(e)=>setForm({...form,email:e})}
               keyboardType='email-address'
               otherStyles='mt-7'
            />
             <FormField
               title='Password'
               value={form.password}
               handleChangeText={(e)=>setForm({...form,password:e})}
               otherStyles='mt-7'
            />
            <Text className='text-gray-100 text-sm mt-4 font-pregular'>Forgot password</Text>
            <CustomButtons
            title='Sign Up'
            handlePress={submit}
            containerStyles="w-full mt-6"
            isLoading={isSubmitting}
            />
            <Text className='text-gray-100 mt-6 font-pregular text-center'>
               Already have an account?
              <Link href={'/sign-in'} className='text-secondary font-psemibold'> Signin</Link>
            </Text>
        </View>
        
    </ScrollView>
      
  </SafeAreaView>
    
  )
}

export default SignUp
import {  ScrollView, Text, View ,Image} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Link, Redirect,router} from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../constants';
import CustomButtons from '../components/CustomButtons'
import { useGlobalContext } from '../context/GlobalProvider';

export default function App(){

  const {isLoading,isLoggedIn}=useGlobalContext();
  if(!isLoading && isLoggedIn) return <Redirect href="/home" />
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{Height:"100%"}}
      // showsVerticalScrollIndicator={false}
      >{/*whole screen should be scrollable */}
          <View className='w-full min-h-[85vh] justify-center items-center px-4'>
            <View className='flex flex-row justify-center items-center w-49 h-26 mx-12 mt-10'>
            <Image
            source={images.pypng}
            className='w-20 h-20'
            resizeMode='contain'
            />
            <Text className='text-3xl text-white font-pbold'>Preetify</Text>
            </View>
            <Image
            source={images.cards}
            className='max-w-[375px] w-full h-[298px]'
            resizeMode='contain'
            />
            <View className='relative mt-5'>
              <Text className='text-white font-bold text-3xl leading-[36px] text-center'>Discover Endless Possibilities with {''}
                <Text className='text-orange-500'>
                Preetify
                </Text>
                </Text>
                <Image
                source={images.path}
                resizeMode='contain'
                className='w-[136px] h-[15px] absolute -bottom-2 -right-8'
                />
             
            </View>
            <Text className='text-gray-100 w-[325px] h-[44px] leading-[22.4px] mt-7 font-pregular text-center'>Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Preetify</Text>
            <CustomButtons
              title="Continue with Email"
              handlePress={()=>router.push('/sign-in')}
              containerStyles="w-full mt-8"
            />
            
          </View>
      </ScrollView>
        <StatusBar
          backgroundColor='#161622' style='light'
        />
    </SafeAreaView>

  );
}

// export default App; dont do like this


// const styles = StyleSheet.create({
//     container:{
//         display:'flex',
//         flex: 1 ,
//         alignItems:'center',
//         justifyContent:'center'
//     },
//     text:{
//         textAlign:'center'
//     }
    
// });
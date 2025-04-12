import { View, Text, FlatList,Image, RefreshControl, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import { StatusBar } from 'expo-status-bar'
import EmptyState from '../../components/EmptyState'
import { useState ,useEffect} from 'react'
import { getAllPosts ,getLatestPosts} from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {

  const { data:posts,refetch,isLoading}=useAppwrite(getAllPosts);

  const { data:latestPosts}=useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh=async()=>{
       setRefreshing(true);
       //re call-if any new videos come
       await refetch();
       setRefreshing(false);
  }
  // console.log(posts);
  return (
    <SafeAreaView className='bg-primary h-full'>
         <FlatList
            //  data={[{id:1},{id:2},]}
            data={posts}
             keyExtractor={(item)=>item.$id}
             renderItem={({item})=>(

              <VideoCard
               video={item}
              />
             )}
             ListHeaderComponent={()=>(

              <View className='px-4 my-6 space-y-6'>
                <View className='justify-between items-start flex-row mb-6'>
                  <View className='mt-1'>
                    <Text className='font-pmedium text-gray-100 text-sm'>
                       Welcome Back
                    </Text>
                    <Text className='text-2xl text-white font-psemibold'>
                       Techstars
                    </Text>
                  </View>
                  <View className='mt-0 '>
                    <Image 
                    source={images.pypng}
                    className='w-12 h-14'
                    resizeMode='contain'
                    />
                  </View>
                  
                </View>
                <SearchInput/>
                <View>
                  <Text className='text-gray-100 text-lg font-pregular mb-3'>
                    Trending Videos
                  </Text>
                  <Trending
                  posts={latestPosts ?? []}

                  />
                </View>
              </View>

             )}
           ListEmptyComponent={()=>(
              <EmptyState
                 title="No videos found"
                 subtitle="Be the first one to upload a video"
              
              />
            
           )}
           refreshControl={<RefreshControl
             refreshing={refreshing} onRefresh={onRefresh}
           />}

         />

        <StatusBar
          backgroundColor='#161622' style='light'
        />
    </SafeAreaView>

  )
}

export default Home
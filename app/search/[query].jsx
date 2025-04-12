import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import { StatusBar } from 'expo-status-bar'
import EmptyState from '../../components/EmptyState'
import {useEffect} from 'react'
import {searchPosts} from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'


const Search = () => {
  const {query}=useLocalSearchParams();
  const { data:posts,refetch}=useAppwrite(()=>searchPosts(query));

// console.log(query,posts)

  useEffect(()=>{
          refetch();
  },[query]);
 

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

              <View className='px-4 my-6 '>
               
                    <Text className='font-pmedium text-gray-100 text-sm'>
                       Search Results
                    </Text>
                    <Text className='text-2xl text-white font-psemibold'>
                       {query}
                    </Text>
                    <View className="mt-6 mb-8">

                      <SearchInput
                       initialQuery={query}
                      />

                    </View>
                  
              </View>

             )}
           ListEmptyComponent={()=>(
              <EmptyState
                 title="No videos found"
                 subtitle="No videos found for search"
              
              />
            
           )}
           

         />

        <StatusBar
          backgroundColor='#161622' style='light'
        />
    </SafeAreaView>

  )
}

export default Search
import { View, Text, FlatList, TouchableOpacity, ImageBackground ,Image} from 'react-native'
import React, { useState,useRef } from 'react'
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';
import { Video,ResizeMode } from 'expo-av';
// import { Video, ResizeMode } from 'expo-video';

const zoomIn={
    0:{
        scale:0.9
    },
    1:{
        scale:1.1,
    }
}
const zoomOut={
    0:{
        scale:1
    },
    1:{
        scale:0.9,
    }
}

const TrendingItem=({activeItem,item})=>{
    const [play,setPlay] = useState(false);
    // const videoRef = useRef(null); 


    return(

        <Animatable.View
        className='mr-5'
        animation={activeItem === item.$id? zoomIn : zoomOut}
        duration={500}
        >
          {play?(
            <Video 
            // ref={videoRef} 
          source={{uri:item.video}}
          className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status)=>{
            if(status.didJustFinish){
                setPlay(false)
            }
          }}
          />):(

            <TouchableOpacity
            className='justify-center items-center relative'
            activeOpacity={0.7 }
            onPress={()=>setPlay(true)}
            >
                <ImageBackground
                source={{uri:item.thumbnail}}
                className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                resizeMode='cover'
                />
                <Image
                className='w-12 h-12 absolute'
                source={icons.play}
                resizeMode='contain'

                />
                 
               
            </TouchableOpacity>
          )}
        </Animatable.View>
    )
}

const Trending = ({posts}) => {

    const [activeItem, setActiveItem] = useState(posts[1]);
    const viewableItemsChanged=({viewableItems})=>{
                   if(viewableItems.length > 0 ){
                    setActiveItem(viewableItems[0].key)
                   }
    }
  return (
    <FlatList
    data={posts}
    keyExtractor={(item)=>item.$id}
    renderItem={({item})=>(
          <TrendingItem
          activeItem={activeItem} item={item}
          />
    

    )}
    onViewableItemsChanged={viewableItemsChanged}
    viewabilityConfig={{
        itemVisiblePercentThreshold:70
    }}
    contentOffset={{x:170}}
    horizontal
    />
  )
}

export default Trending
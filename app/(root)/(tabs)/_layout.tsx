import icons from '@/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'


const TabIcon = ({focused, icon, title}:{focused:boolean;
    icon:any;
    title:string
})=>{
    return(
        <View className='flex-1 flex flex-col items-center '>
            <Image source={icon} tintColor={focused?'#0061ff':'#666876'} resizeMode='contain' className='size-6'/>
            <Text className={`${focused ? 'text-primary-300 font-rubik-medium':'text-black-200 font-rubik'}text-xs w-full text-center mt-1`}>{title}</Text>
        </View>
    )

}

export default function Tabslayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle:{
            backgroundColor:'white',
            position:'absolute',
            borderTopColor:"#0061FF1A",
            borderTopWidth:1,
            minHeight:60
        }
    }}
    >

        <Tabs.Screen 
        name='index'
        options={{
            title:'Home',
            headerShown:false,
            tabBarIcon:({focused})=>(
                <TabIcon focused={focused} icon={icons.home} title='Home'/>
            )
        }}
        />


        <Tabs.Screen 
        name='explore'
        options={{
            title:'Explore',
            headerShown:false,
            tabBarIcon:({focused})=>(
                <TabIcon focused={focused} icon={icons.search} title='Explore'/>
            )
        }}
        />


        <Tabs.Screen 
        name='profile'
        options={{
            title:'Profile',
            headerShown:false,
            tabBarIcon:({focused})=>(
                <TabIcon focused={focused} icon={icons.person} title='Profile'/>
            )
        }}
        />
      
    </Tabs>
  )
}
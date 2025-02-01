import icons from '@/constants/icons'
import images from '@/constants/images'
import { login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { Redirect } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIn = () => {
  const {refetch, loading, isLogged} = useGlobalContext();

  if(!loading && isLogged){
   return <Redirect href="/"/>
  }
  
  const handleLogin = async() => {
   const result = await login();

   if(result){
    refetch()
   }else{
    console.log("Login Failed")
   }
  }
  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerClassName='h-full'>
      <Image source={images.onboarding} className='w-full h-4/6' resizeMode='contain'/>

      <View className='px-8 -mt-5' >
        <Text className='text-base text-center uppercase font-rubik text-black-200'>Welcome to ReState</Text>
        <Text className='text-3xl font-rubik-bold text-black-300 text-center mt-5'>
          Let's get You Closer to {"\n"}
          <Text className='text-primary-300 font-rubik-bold text-3xl'>Your Dream Home</Text>
          
        </Text>
        <Text className='text-lg font-rubik text-black-200 text-center mt-4'>Login to ReState with Google</Text>
      </View>

      <TouchableOpacity 
  onPress={handleLogin} 
  className="bg-white shadow-lg rounded-full w-4/5 py-4 mt-5 ml-9"
  style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 6 }}
>
  <View className="flex flex-row justify-center items-center ">  
    <Image source={icons.google} className="w-6 h-6" resizeMode="contain" />
    <Text className="text-lg font-rubik-medium text-black ml-2">Continue with Google</Text>
  </View>
</TouchableOpacity>


        </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
import { settings } from '@/constants/data';
import icons from '@/constants/icons';
import { logout } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import React from 'react';
import { Alert, Image, ImageSourcePropType, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
interface SettingsItemProps{
  icon:ImageSourcePropType;
  title:string;
  onPress?:()=>void;
  textStyle?:string;
  showArrow?:boolean;
}


const SettingItem = ({icon, title, onPress, textStyle, showArrow= true}:SettingsItemProps)=>{
  return (
    <TouchableOpacity  className='flex flex-row items-center justify-between py-5 ' onPress={onPress}>
      <View className='flex flex-row items-center gap-3'>
        <Image source={icon} className='size-6'/>
        <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
      </View>

      {showArrow && <Image source={icons.rightArrow} className='size-5'/>}
    </TouchableOpacity>
  );
}



const profile = () => {

  const {user, refetch} = useGlobalContext();


const handleLogout = async() => {
  const result = await logout();
  if(result){
    Alert.alert('Success', 'You have been logged out successfully');
    refetch();
  }
  else{
    Alert.alert('Error', 'Something went wrong');
  }
}

  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName='pb-32 px-7'
      >
        <View className='flex flex-row items-center justify-between mt-10'>
          <Text className='text-xl font-rubik-bold'>
            Profile
          </Text>
          <Image source={icons.bell} className='size-5' />
        </View>

        <View className='flex-row justify-center flex mt-5'>
            <View className='flex flex-col items-center relative mt-5'>
                <Image source={{uri:user?.avatar}} 
                style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'gray' }} 
                // className='size-50 relative rounded-full'
                
                />

                
                <Text className='text-2xl font-rubik-bold mt-3'>{user?.name}</Text>
                <Text className='text-sm font-rubik-medium mt-1'>{user?.email}</Text>
            </View>
        </View>


        <View className='flex flex-col mt-5'>
        <SettingItem icon={icons.calendar} title='My Bookings' />
        <SettingItem icon={icons.wallet} title='Payments' />
        </View>

       {/* Boarder ka code */}
        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200 '>
        {settings.slice(2).map((item, index)=>( 
          <SettingItem key={index} {...item} />
        ))}
        
        </View>

        {/* Boarder ka code */}
        <View className='flex flex-col mt-5 border-t pt-5 border-primary-200 '>
            <SettingItem icon={icons.logout} title='Logout' textStyle='text-danger' showArrow={false} onPress={handleLogout}/>
          </View>



      </ScrollView>
    </SafeAreaView>
  )
}

export default profile
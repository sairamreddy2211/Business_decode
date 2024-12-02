import { View, Text, SafeAreaView, ScrollView, Image, TouchableHighlight, Button } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router';

const index = () => {

  const handleWelcome = () => {
    router.replace("/login", { relativeToDirectory: true })
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{
        height: "100%",
      }}>
        <View className='h-full flex justify-center items-center gap-9'>
          <Image source={require('../assets/images/main_logo.png')} className='w-[200px] h-[200px]' resizeMode='contain' />
          <Text className='font-pmedium text-4xl text-white'>Business Decode</Text>
          <Text className='text-white font-pregular text-lg'>Where Ideas Meet Execution</Text>
          <TouchableHighlight onPress={handleWelcome} className='mt-28' ><Text className=' bg-orange-500 p-4 rounded-lg text-blue-800 font-psemibold'>Welcome</Text></TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default index
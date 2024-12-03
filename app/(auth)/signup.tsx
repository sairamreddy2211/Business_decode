import { View, Text, SafeAreaView, ScrollView, Image, TextInput, TouchableHighlight } from 'react-native'
import React from 'react'
import Formfield from '../../components/form_field'
import { Link, router } from 'expo-router';

const SignUp = () => {
  const handleSignUp = () => {

  };
  const handleEmail = () => {

  }
  const handlePassword = () => {

  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='flex mt-40 px-10 gap-5'>
          <Text className='text-white text-2xl font-pregular mb-3'>Sign Up</Text>
          <Formfield handleChangeText={handleEmail} title="Email" placeholder="Email" keyboardType="email-address" />
          <Formfield handleChangeText={handlePassword} title="Password" placeholder="Password" keyboardType="text" />
          <TouchableHighlight onPress={handleSignUp} className='mt-10' >
            <View className=' bg-orange-500 p-4 rounded-lg'>
              <Text className='text-blue-800 font-psemibold text-center'>
                Sign In
              </Text>
            </View>
          </TouchableHighlight>
          <Text className='text-white text-sm font-pextralight text-center'> or </Text>
          <View className='flex items-center flex-row justify-center' >
            <Text className='text-white text-sm font-pextralight text-center'>
              Already Have An Account ?
            </Text>
            <TouchableHighlight onPress={() => { router.back()}} >
              <Text className='text-orange-500 text-sm font-pextralight text-center'> Sign In </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
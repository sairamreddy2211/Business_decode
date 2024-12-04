import { View, Text, SafeAreaView, ScrollView, Image, TextInput, TouchableHighlight, Button, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import Formfield from '../../components/form_field'
import { router } from 'expo-router';
import { AuthFormState } from '@/models/types';
import { validateEmail, validatePassword } from '@/constants/utils';

const login = () => {
  const handleLogin = async () => {
    router.replace('/(tabs)/home');

    if (!validateForm()) return;

    try {
      setForm(prev => ({ ...prev, isLoading: true }));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Add your actual login logic here
      console.log('Login successful');

      // Navigate to main app
      router.replace('/(tabs)/home');
    } catch (error) {
      // setForm(prev => ({
      //   ...prev,
      //   errors: [...prev.errors, { field: 'general', message: 'Login failed. Please try again.' }]
      // }));
    } finally {
      setForm(prev => ({ ...prev, isLoading: false }));
    }
  };
  const [form, setForm] = useState<AuthFormState>({
    email: "",
    password: "",
    isLoading: false,
    errors: []
  })

  const setError = (field: string, message: string) => {
    setForm(prev => ({
      ...prev,
      errors: [...prev.errors.filter(e => e.field !== field), { field, message }]
    }));
  };

  const clearError = (field: string) => {
    setForm(prev => ({
      ...prev,
      errors: prev.errors.filter(e => e.field !== field)
    }));
  };

  const validateForm = (): boolean => {
    let isValid = true;

    const emailError = validateEmail(form.email);
    if (emailError) {
      setError('email', emailError);
      isValid = false;
    }

    const passwordError = validatePassword(form.password);
    if (passwordError) {
      setError('password', passwordError);
      isValid = false;
    }

    return isValid;
  };


  const handleDataInput = (value: string, field: 'email' | 'password') => {
    clearError(field);
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const getFieldError = (field: string) =>
    form.errors.find(e => e.field === field)?.message;


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='flex mt-40 px-10 gap-5'>
          <Text className='text-white text-2xl font-pregular mb-3'>Sign In</Text>
          <Formfield handleChangeText={(e: string) => handleDataInput(e, 'email')} title="Email" placeholder="Email" keyboardType="email-address" value={form.email} errorMsg={getFieldError('email')} />
          <Formfield handleChangeText={(e: string) => handleDataInput(e, 'password')} title="Password" placeholder="Password" keyboardType="text" value={form.password} errorMsg={getFieldError('password')} isSecureEntry={true} />
          <TouchableHighlight onPress={handleLogin} className='mt-10' >
            <View className=' bg-orange-500 p-4 rounded-lg '>
              <Text className='text-blue-800 font-psemibold text-center'>
                Sign In
              </Text>
            </View>
          </TouchableHighlight>
          <Text className='text-white text-sm font-pextralight text-center'> or </Text>
          <View className='flex items-center flex-row justify-center' >
            <Text className='text-white text-sm font-pextralight text-center'>
              No Account ?
            </Text>
            <TouchableHighlight onPress={() => { router.replace('/signup') }} >
              <Text className='text-orange-500 text-sm font-pextralight text-center'> Sign Up </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default login
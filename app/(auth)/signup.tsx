import { View, Text, SafeAreaView, ScrollView, TouchableHighlight, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import Formfield from '../../components/form_field'
import { router } from 'expo-router';
import { AuthFormState } from '@/models/types';
import { validateEmail, validatePassword, validateName } from '@/constants/utils';
import { useToast } from 'native-base';
const SignUp = () => {
  const [form, setForm] = useState<AuthFormState>({
    name: "",
    email: "",
    password: "",
    isLoading: false,
    errors: []
  });
  const toast = useToast();

  const handleSignUp = async () => {
    router.replace('/profilesetup')
    if (!validateForm()) return;

    try {
      setForm(prev => ({ ...prev, isLoading: true }));

      // Simulate API call
      await new Promise((resolve, reject) => setTimeout(reject, 1500));

      // Add your actual signup logic here
      console.log('Signup successful');

      // Navigate to main app
      router.replace('/(tabs)/home');
    } catch (error) {
      toast.show({
        description: "Something Went Wrong!"
      })
      // setForm(prev => ({
      //   ...prev,
      //   errors: [...prev.errors, { field: 'general', message: 'Sign up failed. Please try again.' }]
      // }));
    } finally {
      setForm(prev => ({ ...prev, isLoading: false }));
    }
  };

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

    const nameError = validateName(form.name || "");
    if (nameError) {
      setError('name', nameError);
      isValid = false;
    }

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

  const handleDataInput = (value: string, field: 'name' | 'email' | 'password') => {
    clearError(field);
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const getFieldError = (field: string) =>
    form.errors.find(e => e.field === field)?.message;

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='h-screen flex px-10 gap-5 justify-center'>
          <Text className='text-white text-2xl font-pregular mb-3'>Sign Up</Text>
          <Formfield
            handleChangeText={(e: string) => handleDataInput(e, 'name')}
            title="Name"
            placeholder="Name"
            keyboardType="default"
            value={form.name}
            errorMsg={getFieldError('name')}
          />
          <Formfield
            handleChangeText={(e: string) => handleDataInput(e, 'email')}
            title="Email"
            placeholder="Email"
            keyboardType="email-address"
            value={form.email}
            errorMsg={getFieldError('email')}
          />
          <Formfield
            handleChangeText={(e: string) => handleDataInput(e, 'password')}
            title="Password"
            placeholder="Password"
            keyboardType="default"
            value={form.password}
            isSecureEntry={true}
            errorMsg={getFieldError('password')}
          />
          <TouchableHighlight onPress={handleSignUp} className='mt-10' disabled={form.isLoading}>
            <View className='bg-orange-500 p-4 rounded-lg'>
              <Text className='text-blue-800 font-psemibold text-center'>
                Sign Up
              </Text>
            </View>
          </TouchableHighlight>
          <Text className='text-white text-sm font-pextralight text-center'> or </Text>
          <View className='flex items-center flex-row justify-center'>
            <Text className='text-white text-sm font-pextralight text-center'>
              Already Have An Account?
            </Text>
            <TouchableHighlight onPress={() => { router.replace('/login') }}>
              <Text className='text-orange-500 text-sm font-pextralight text-center'> Sign In </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
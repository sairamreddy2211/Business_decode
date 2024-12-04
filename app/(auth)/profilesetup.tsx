import { View, Text, SafeAreaView, ScrollView, TouchableHighlight, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Formfield from '@/components/form_field';
import FormPicker from '@/components/form_picker';
import { ProfileFormState } from '@/models/types';

const ProfileSetup = () => {
  const [form, setForm] = useState<ProfileFormState>({
    fullName: '',
    location: '',
    userType: 'entrepreneur',
    businessType: '',
    bio: '',
    profileImage: '',
    isLoading: false,
    errors: []
  });

  const businessTypes = [
    { label: 'Restaurant', value: 'Restaurant' },
    { label: 'Retail Shop', value: 'Retail Shop' },
    { label: 'Boba Tea Shop', value: 'Boba Tea Shop' },
    { label: 'Other', value: 'Other' }
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      handleDataInput(result.assets[0].uri, 'profileImage');
    }
  };

  const handleDataInput = (value: string, field: keyof ProfileFormState) => {
    clearError(field);
    setForm(prev => ({ ...prev, [field]: value }));
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

  const getFieldError = (field: string) => 
    form.errors.find(e => e.field === field)?.message;

  const validateForm = (): boolean => {
    let isValid = true;

    if (!form.fullName.trim()) {
      setError('fullName', 'Full name is required');
      isValid = false;
    }

    if (!form.location.trim()) {
      setError('location', 'Location is required');
      isValid = false;
    }

    if (form.userType === 'business_owner' && !form.businessType) {
      setError('businessType', 'Business type is required for business owners');
      isValid = false;
    }

    if (!form.profileImage) {
      setError('profileImage', 'Profile image is required');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setForm(prev => ({ ...prev, isLoading: true }));
      await new Promise(resolve => setTimeout(resolve, 1500));
      router.replace('/(tabs)/home');
    } catch (error) {
      setError('general', 'Profile setup failed. Please try again.');
    } finally {
      setForm(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="flex px-6 py-10 gap-5">
            <View className="items-center mb-6">
            <Text className="text-white text-2xl font-psemibold mt-2">Complete Your Profile</Text>
            <Text className="text-gray-100 text-sm font-pregular">Help us personalize your experience</Text>
              <TouchableOpacity onPress={pickImage} className="mt-4">
                <View className="w-32 h-32 rounded-2xl bg-black-200 items-center justify-center overflow-hidden">
                  {form.profileImage ? (
                    <Image source={{ uri: form.profileImage }} className="w-full h-full" />
                  ) : (
                    <Image source={require('@/assets/icons/upload.png')} className="w-10 h-10" />
                  )}
                </View>
              </TouchableOpacity>
              {getFieldError('profileImage') && (
                <Text className="text-red-500 text-sm font-plight">{getFieldError('profileImage')}</Text>
              )}
              
            </View>

            <Formfield
              title="Full Name"
              placeholder="Your full name"
              value={form.fullName}
              handleChangeText={(e: string) => handleDataInput(e, 'fullName')}
              errorMsg={getFieldError('fullName')}
            />

            <Formfield
              title="Location"
              placeholder="City, Country"
              value={form.location}
              handleChangeText={(e: string) => handleDataInput(e, 'location')}
              errorMsg={getFieldError('location')}
            />

            <FormPicker
              title="I am a"
              value={form.userType}
              onValueChange={(value) => handleDataInput(value, 'userType')}
              items={[
                { label: 'Business Owner', value: 'business_owner' },
                { label: 'Aspiring Entrepreneur', value: 'entrepreneur' }
              ]}
            />

            {form.userType === 'business_owner' && (
              <FormPicker
                title="Business Type"
                value={form.businessType}
                onValueChange={(value) => handleDataInput(value, 'businessType')}
                items={businessTypes}
                searchable={true}
                errorMsg={getFieldError('businessType')}
              />
            )}

            <Formfield
              title="Bio"
              placeholder="Tell us about yourself"
              value={form.bio}
              handleChangeText={(e: string) => handleDataInput(e, 'bio')}
              multiline
              numberOfLines={4}
            />

            {getFieldError('general') && (
              <Text className="text-red-500 text-sm font-plight text-center">
                {getFieldError('general')}
              </Text>
            )}

            <TouchableHighlight
              onPress={handleSubmit}
              className="mt-6"
              disabled={form.isLoading}
            >
              <View className="bg-orange-500 p-4 rounded-lg">
                <Text className="text-blue-800 font-psemibold text-center">
                  {form.isLoading ? 'Setting up...' : 'Complete Profile'}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ProfileSetup;
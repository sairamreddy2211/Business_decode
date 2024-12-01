import { Link, Stack } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text>This screen doesnt exist</Text>
      <View>
      <Text  className="text-red-500">Hello, World!</Text>
      <Image
        source={require('../assets/images/business_decode_logo.png')}
            resizeMode="contain"
            className='mt-10 w-[100px] h-[100px]'
            //  style={{width:100, height:100}}
          />
    </View>
      <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora fuck you likki fuck u fuck u fuck u mee thatadengai
            mee mama
          </Text>
     
    </ScrollView>
    </SafeAreaView>
  );
}

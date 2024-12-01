import { Stack } from 'expo-router';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="bg-primary">
      <ScrollView contentContainerStyle={{
          height: "100%",
        }}>
        <Stack.Screen options={{ title: 'Oops!' }} />
        <View className='flex h-full w-full justify-center items-center px-4 gap-5'>
          <Text className='text-secondary-200 place-self-center font-plight text-4xl'>Oops!</Text>
          <Text className='text-secondary-200 place-self-center font-extralight text-2xl'>This screen doesnt exist</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

import { View, Text, SafeAreaView } from 'react-native';

export default function Home() {
  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="p-4">
        <Text className="text-white text-2xl font-psemibold">Home</Text>
      </View>
    </SafeAreaView>
  );
}

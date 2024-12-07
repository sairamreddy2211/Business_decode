import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Header() {
  const router = useRouter();
  
  return (
    <View className="flex-row justify-between items-center p-4 border-b border-black-200">
      <View>
        <Text className="text-gray-500 font-pregular">Welcome back,</Text>
        <Text className="text-white text-xl font-psemibold">John Doe</Text>
      </View>
      <TouchableOpacity 
        onPress={() => router.push('/notifications')} 
        className="relative"
      >
        <MaterialCommunityIcons name="bell" size={24} color="#FF9C01" />
        <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
          <Text className="text-white text-xs">3</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
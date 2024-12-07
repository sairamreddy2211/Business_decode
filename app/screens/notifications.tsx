import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const DUMMY_NOTIFICATIONS = [
    {
      id: '1',
      type: 'workshop',
      title: 'New Workshop Available',
      message: 'Restaurant Management Workshop starting next week',
      time: '2h ago',
      read: false
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'John Smith sent you a message',
      time: '5h ago',
      read: false
    },
    {
      id: '3',
      type: 'connection',
      title: 'New Connection Request',
      message: 'Sarah wants to connect with you',
      time: '1d ago',
      read: true
    }
  ];

  
export default function Notifications() {
    const router = useRouter();
  
    const renderNotification = ({ item}:any) => (
      <TouchableOpacity 
        className={`p-4 border-b border-black-200 ${!item.read ? 'bg-black-100/20' : ''}`}
      >
        <View className="flex-row gap-3">
          <MaterialCommunityIcons
            name={
              item.type === 'workshop' ? 'calendar' : 
              item.type === 'message' ? 'message' : 'account-plus'
            } 
            size={24} 
            color="#FF9C01" 
          />
          <View className="flex-1">
            <Text className="text-white font-pmedium">{item.title}</Text>
            <Text className="text-gray-500 text-sm">{item.message}</Text>
            <Text className="text-gray-500 text-xs mt-1">{item.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  
    return (
      <SafeAreaView className="bg-primary flex-1">
        <View className="flex-row items-center border-b border-black-200 p-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-4"
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-psemibold">Notifications</Text>
        </View>
  
        <FlatList
          data={DUMMY_NOTIFICATIONS}
          renderItem={renderNotification}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
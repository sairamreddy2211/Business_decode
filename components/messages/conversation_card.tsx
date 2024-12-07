import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ConversationProps {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  image: string | null;
  isOnline: boolean;
  isBusinessOwner: boolean;
}

export const ConversationCard = ({ conversation, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center p-4 border-b border-black-200"
    >
      <View className="relative">
        <Image
          source={conversation.image || require('@/assets/images/placeholder.png')}
          className="w-12 h-12 rounded-full"
        />
        {conversation.isOnline && (
          <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary" />
        )}
      </View>

      <View className="flex-1 ml-3">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Text className="text-white font-pmedium">{conversation.name}</Text>
            {conversation.isBusinessOwner && (
              <MaterialCommunityIcons name="check-decagram" size={16} color="#FF9C01" className="ml-1" />
            )}
          </View>
          <Text className="text-gray-500 text-xs">{conversation.time}</Text>
        </View>

        <View className="flex-row justify-between items-center mt-1">
          <Text 
            className="text-gray-500 text-sm flex-1"
            numberOfLines={1}
          >
            {conversation.lastMessage}
          </Text>
          {conversation.unreadCount > 0 && (
            <View className="bg-orange-500 rounded-full w-5 h-5 items-center justify-center ml-2">
              <Text className="text-blue-800 text-xs font-pmedium">
                {conversation.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
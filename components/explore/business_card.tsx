import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// interface BusinessCardProps {
//   business: Business;
//   onToggleBookmark: (id: string) => void;
//   isBookmarked: boolean;
// }

export const BusinessCard = ({ business, onToggleBookmark, isBookmarked }) => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      className="bg-black-200 rounded-xl mb-4 overflow-hidden"
      onPress={() => router.push(`/business/${business.id}`)}
    >
      <Image
        source={business.image || require('@/assets/images/placeholder.png')}
        className="w-full h-48"
        resizeMode="cover"
      />
      
      {/* Bookmark Button */}
      <TouchableOpacity 
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 items-center justify-center"
        onPress={() => onToggleBookmark(business.id)}
      >
        <MaterialCommunityIcons 
          name={isBookmarked ? "bookmark" : "bookmark-outline"} 
          size={20} 
          color={isBookmarked ? "#FF9C01" : "white"} 
        />
      </TouchableOpacity>

      <View className="p-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-lg font-psemibold">{business.name}</Text>
          {business.isVerified && (
            <MaterialCommunityIcons name="check-decagram" size={20} color="#FF9C01" />
          )}
        </View>
        
        <Text className="text-gray-500 mt-1">{business.type}</Text>
        
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="map-marker" size={16} color="#7B7B8B" />
            <Text className="text-gray-500 ml-1">{business.location}</Text>
            {business.distance && (
              <Text className="text-gray-500 ml-1">• {business.distance}km</Text>
            )}
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="eye" size={16} color="#7B7B8B" />
            <Text className="text-gray-500 ml-1">{business.views || 0} views</Text>
          </View>
        </View>

        <View className="flex-row mt-4">
          <View className="bg-black-100 rounded-full px-3 py-1 mr-2">
            <Text className="text-gray-500 text-xs">{business.expertise}</Text>
          </View>
          {business.isAcceptingMentees && (
            <View className="bg-lime/20 rounded-full px-3 py-1">
              <Text className="text-lime-400 text-xs">Accepting Mentees</Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View className="flex-row justify-between mt-4 pt-4 border-t border-black-100">
          <TouchableOpacity 
            className="flex-row items-center"
            onPress={() => router.push(`/chat/${business.id}`)}
          >
            <MaterialCommunityIcons name="message" size={18} color="#FF9C01" />
            <Text className="text-orange-500 ml-2 font-pmedium">Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1 ml-4 bg-orange-500 py-2 px-4 rounded-lg"
            onPress={() => router.push(`/connect/${business.id}`)}
          >
            <Text className="text-blue-800 text-center font-psemibold">Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
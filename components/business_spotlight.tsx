import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

export const BusinessSpotlight = () => {
  const businesses = [
    {
      id: '1',
      name: "Joe's Cafe",
      type: 'Restaurant',
      location: 'New York',
      image: '/path/to/image'
    },
    {
      id: '2',
      name: 'Urban Retail',
      type: 'Retail Store',
      location: 'Los Angeles',
      image: '/path/to/image'
    }
  ];

  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-white text-lg font-psemibold">Business Spotlight</Text>
        <TouchableOpacity>
          <Text className="text-orange-500 font-pmedium">View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {businesses.map(business => (
          <TouchableOpacity 
            key={business.id}
            className="bg-black-200 rounded-xl mr-4 overflow-hidden w-48"
          >
            <Image
              source={require('@/assets/images/placeholder.png')}
              className="w-full h-32"
            />
            <View className="p-3">
              <Text className="text-white font-pmedium">{business.name}</Text>
              <Text className="text-gray-500 text-sm mt-1">{business.type}</Text>
              <View className="flex-row items-center mt-2">
                <MaterialCommunityIcons name="map-marker" size={16} color="#7B7B8B" />
                <Text className="text-gray-500 text-sm ml-1">{business.location}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
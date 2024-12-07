import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const FeaturedWorkshop = () => {
  const workshops = [
    {
      id: '1',
      title: 'Restaurant Management 101',
      mentor: 'Sarah Wilson',
      time: '11:00 AM, Tomorrow',
      attendees: 45,
      image: '/path/to/image1'
    },
    {
      id: '2',
      title: 'Retail Business Essentials',
      mentor: 'John Smith',
      time: '2:00 PM, Friday',
      attendees: 32,
      image: '/path/to/image2'
    }
  ];

  return (
    <View className="mt-4">
      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text className="text-white text-lg font-psemibold">Featured Workshops</Text>
        <TouchableOpacity>
          <Text className="text-orange-500 font-pmedium">See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {workshops.map(workshop => (
          <TouchableOpacity 
            key={workshop.id}
            className="bg-black-200 rounded-xl mr-4 w-72 overflow-hidden"
          >
            <Image
              source={require('@/assets/images/placeholder.png')}
              className="w-full h-32"
            />
            <View className="p-3">
              <Text className="text-white font-pmedium text-base">{workshop.title}</Text>
              <View className="flex-row items-center mt-2">
                <MaterialCommunityIcons name="account" size={16} color="#7B7B8B" />
                <Text className="text-gray-500 ml-1">{workshop.mentor}</Text>
              </View>
              <View className="flex-row items-center justify-between mt-2">
                <View className="flex-row items-center">
                  <MaterialCommunityIcons name="clock-outline" size={16} color="#7B7B8B" />
                  <Text className="text-gray-500 ml-1">{workshop.time}</Text>
                </View>
                <View className="flex-row items-center">
                  <MaterialCommunityIcons name="account-group" size={16} color="#7B7B8B" />
                  <Text className="text-gray-500 ml-1">{workshop.attendees} joined</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

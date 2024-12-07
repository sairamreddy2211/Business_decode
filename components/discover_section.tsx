import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';

// components/home/discover_section.tsx
export const DiscoverSection = () => {
  const categories = [
    {
      id: '1',
      title: 'Problems & Solutions',
      description: 'Help businesses solve challenges',
      icon: 'lightbulb',
      color: '#84cc16',
      route: '/problems'
    },
    {
      id: '2',
      title: 'Success Stories',
      description: 'Learn from real experiences',
      icon: 'star',
      color: '#f43f5e',
      route: '/stories'
    },
    {
      id: '3',
      title: 'Resources',
      description: 'Tools, guides & templates',
      icon: 'book',
      color: '#06b6d4',
      route: '/resources'
    },
    // More categories...
  ];

  return (
    <View className="mt-6 px-4">
      <Text className="text-white text-lg font-psemibold mb-4">Discover More</Text>
      {categories.map(category => (
        <TouchableOpacity 
          key={category.id}
          onPress={() => router.push(category.route)}
          className="bg-black-200 rounded-xl mb-3 p-4 flex-row items-center"
        >
          <View 
            className="w-12 h-12 rounded-full items-center justify-center mr-4"
            style={{ backgroundColor: `${category.color}20` }}
          >
            <MaterialCommunityIcons 
              name={category.icon} 
              size={24} 
              color={category.color} 
            />
          </View>
          <View className="flex-1">
            <Text className="text-white font-pmedium">{category.title}</Text>
            <Text className="text-gray-500 text-sm">{category.description}</Text>
          </View>
          <MaterialCommunityIcons 
            name="chevron-right" 
            size={24} 
            color="#7B7B8B" 
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
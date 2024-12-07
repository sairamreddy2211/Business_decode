import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Categories = () => {
  const categories = [
    { id: '1', name: 'Restaurants', icon: 'food', color: '#f43f5e' },
    { id: '2', name: 'Retail', icon: 'shopping', color: '#84cc16' },
    { id: '3', name: 'Cafe', icon: 'coffee', color: '#FF9C01' },
    { id: '4', name: 'Services', icon: 'hand-heart', color: '#06b6d4' },
    { id: '5', name: 'Others', icon: 'dots-horizontal', color: '#c026d3' },
  ];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="p-4"
    >
      {categories.map((category) => (
        <TouchableOpacity 
          key={category.id}
          className="mr-4 items-center"
        >
          <View 
            className="w-16 h-16 rounded-full items-center justify-center mb-2"
            style={{ backgroundColor: `${category.color}20` }}
          >
            <MaterialCommunityIcons 
              name={category.icon} 
              size={24} 
              color={category.color} 
            />
          </View>
          <Text className="text-white text-sm font-pmedium">{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

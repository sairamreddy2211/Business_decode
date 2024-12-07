import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

export const QuickActions = () => {
  const actions = [
    { id: '1', title: 'Find Mentor', icon: 'account-search', color: '#84cc16' },
    { id: '2', title: 'Workshops', icon: 'calendar-check', color: '#f43f5e' },
    { id: '3', title: 'Connect', icon: 'account-group', color: '#FF9C01' },
    { id: '4', title: 'Resources', icon: 'bookmark', color: '#06b6d4' }
  ];

  return (
    <View className="px-4 mt-6">
      <Text className="text-white text-lg font-psemibold mb-4">Quick Actions</Text>
      <View className="flex-row flex-wrap justify-between">
        {actions.map(action => (
          <TouchableOpacity 
            key={action.id}
            className="bg-black-200 rounded-xl p-4 mb-4 items-center"
            style={{ width: '48%' }}
          >
            <MaterialCommunityIcons name={action.icon} size={24} color={action.color} />
            <Text className="text-white mt-2 font-pmedium">{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

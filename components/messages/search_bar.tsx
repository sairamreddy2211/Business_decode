import { View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
}

export const SearchBar = ({ value, onChangeText, onFilterPress }: SearchBarProps) => {
  return (
    <View className="p-4 flex-row items-center gap-2">
      <View className="flex-1 flex-row items-center bg-black-200 rounded-xl p-3">
        <MaterialCommunityIcons name="magnify" size={24} color="#7B7B8B" />
        <TextInput
          placeholder="Search conversations..."
          placeholderTextColor="#7B7B8B"
          className="flex-1 ml-2 text-white"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity 
        onPress={onFilterPress}
        className="bg-black-200 p-3 rounded-xl"
      >
        <MaterialCommunityIcons name="filter-variant" size={24} color="#FF9C01" />
      </TouchableOpacity>
    </View>
  );
};


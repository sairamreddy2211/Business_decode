import { View, Text, Modal, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

interface FiltersModalProps {
  visible: boolean;
  onClose: () => void;
  filters: Filters;
  onApply: (filters: Filters) => void;
}

interface Filters {
  priceRange: string;
  location: string;
  experience: string;
  acceptingMentees: boolean;
}

export const FiltersModal = ({ visible, onClose, filters, onApply }: FiltersModalProps) => {
  const [tempFilters, setTempFilters] = useState<Filters>(filters);

  const priceRanges = ['$', '$$', '$$$', '$$$$'];
  const experiences = ['0-1 years', '1-3 years', '3-5 years', '5+ years'];
  const locations = ['All', 'New York', 'Los Angeles', 'Chicago', 'Miami'];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View className="flex-1 bg-black/50">
        <View className="bg-primary mt-auto rounded-t-3xl">
          <View className="p-4 border-b border-black-200">
            <View className="flex-row justify-between items-center">
              <Text className="text-white text-xl font-psemibold">Filters</Text>
              <TouchableOpacity onPress={onClose}>
                <MaterialCommunityIcons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView className="p-4">
            {/* Price Range */}
            <View className="mb-6">
              <Text className="text-white font-pmedium mb-3">Price Range</Text>
              <View className="flex-row">
                {priceRanges.map((price) => (
                  <TouchableOpacity
                    key={price}
                    onPress={() => setTempFilters(prev => ({ ...prev, priceRange: price }))}
                    className={`mr-3 px-4 py-2 rounded-full ${tempFilters.priceRange === price ? 'bg-orange-500' : 'bg-black-200'}`}
                  >
                    <Text className={`${tempFilters.priceRange === price ? 'text-blue-800' : 'text-white'}`}>
                      {price}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Location */}
            <View className="mb-6">
              <Text className="text-white font-pmedium mb-3">Location</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {locations.map((loc) => (
                  <TouchableOpacity
                    key={loc}
                    onPress={() => setTempFilters(prev => ({ ...prev, location: loc }))}
                    className={`mr-3 px-4 py-2 rounded-full ${tempFilters.location === loc ? 'bg-orange-500' : 'bg-black-200'}`}
                  >
                    <Text className={`${tempFilters.location === loc ? 'text-blue-800' : 'text-white'}`}>
                      {loc}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Experience */}
            <View className="mb-6">
              <Text className="text-white font-pmedium mb-3">Experience</Text>
              <View className="flex-row flex-wrap">
                {experiences.map((exp) => (
                  <TouchableOpacity
                    key={exp}
                    onPress={() => setTempFilters(prev => ({ ...prev, experience: exp }))}
                    className={`mr-3 mb-3 px-4 py-2 rounded-full ${tempFilters.experience === exp ? 'bg-orange-500' : 'bg-black-200'}`}
                  >
                    <Text className={`${tempFilters.experience === exp ? 'text-blue-800' : 'text-white'}`}>
                      {exp}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Accepting Mentees Switch */}
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white font-pmedium">Accepting Mentees Only</Text>
              <Switch
                value={tempFilters.acceptingMentees}
                onValueChange={(value) => setTempFilters(prev => ({ ...prev, acceptingMentees: value }))}
                trackColor={{ false: '#232533', true: '#FF9C01' }}
                thumbColor={tempFilters.acceptingMentees ? '#fff' : '#7B7B8B'}
              />
            </View>
          </ScrollView>

          <View className="p-4 border-t border-black-200">
            <TouchableOpacity
              onPress={() => {
                onApply(tempFilters);
                onClose();
              }}
              className="bg-orange-500 p-4 rounded-lg"
            >
              <Text className="text-blue-800 font-psemibold text-center">Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

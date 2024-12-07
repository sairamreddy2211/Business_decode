import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: MessageFilters;
  onApplyFilters: (filters: MessageFilters) => void;
}

interface MessageFilters {
  showUnreadOnly: boolean;
  showBusinessOwnersOnly: boolean;
  showArchivedOnly: boolean;
}

export const FilterModal = ({ visible, onClose, filters, onApplyFilters }: FilterModalProps) => {
  const [tempFilters, setTempFilters] = useState<MessageFilters>(filters);

  const FilterOption = ({ title, value, onToggle }) => (
    <TouchableOpacity 
      onPress={onToggle}
      className="flex-row items-center justify-between py-4"
    >
      <Text className="text-white font-pmedium">{title}</Text>
      <View className={`w-6 h-6 rounded border ${value ? 'bg-orange-500 border-orange-500' : 'border-gray-500'} items-center justify-center`}>
        {value && <MaterialCommunityIcons name="check" size={16} color="white" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-primary rounded-t-3xl">
          <View className="p-4 border-b border-black-200 flex-row justify-between items-center">
            <Text className="text-white text-xl font-psemibold">Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="p-4">
            <FilterOption
              title="Show Unread Only"
              value={tempFilters.showUnreadOnly}
              onToggle={() => setTempFilters(prev => ({ ...prev, showUnreadOnly: !prev.showUnreadOnly }))}
            />
            <FilterOption
              title="Business Owners Only"
              value={tempFilters.showBusinessOwnersOnly}
              onToggle={() => setTempFilters(prev => ({ ...prev, showBusinessOwnersOnly: !prev.showBusinessOwnersOnly }))}
            />
            <FilterOption
              title="Show Archived"
              value={tempFilters.showArchivedOnly}
              onToggle={() => setTempFilters(prev => ({ ...prev, showArchivedOnly: !prev.showArchivedOnly }))}
            />
          </View>

          <View className="p-4 border-t border-black-200">
            <TouchableOpacity
              onPress={() => {
                onApplyFilters(tempFilters);
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
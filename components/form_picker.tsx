// components/form_picker.tsx
import { View, Text, TextInput, Modal, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';

interface FormPickerProps {
  title: string;
  value: string;
  onValueChange: (value: string) => void;
  items: Array<{ label: string; value: string }>;
  errorMsg?: string;
  searchable?: boolean;
  closeOnOutsideClick?: boolean;
}

const FormPicker = ({ title, value, onValueChange, items, errorMsg, searchable = false, closeOnOutsideClick = true }: FormPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedLabel = items.find(item => item.value === value)?.label || '';

  const filteredItems = searchable
    ? items.filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : items;

  const handleOutsideClick = () => {
    if (closeOnOutsideClick) {
      setModalVisible(false);
    }
  };

  return (
    <View className="mb-4">
      <Text className="text-gray-500 font-pmedium text-base mb-2">{title}</Text>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="bg-black-200 px-4 h-16 rounded-lg border-2 border-black-200 justify-center"
      >
        <Text className="text-white">{selectedLabel}</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <View className="flex-1 bg-black/50 justify-end">
            <TouchableWithoutFeedback>
              <View className="bg-primary rounded-t-3xl p-4 h-2/3">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-white text-lg font-pmedium">{title}</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text className="text-orange-500">Close</Text>
                  </TouchableOpacity>
                </View>

                {searchable && (
                  <TextInput
                    className="bg-black-200 text-white p-4 rounded-lg mb-4"
                    placeholder="Search..."
                    placeholderTextColor="#7B7B8B"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                )}

                <FlatList
                  data={filteredItems}
                  keyExtractor={item => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className={`p-4 border-b border-gray-800 ${item.value === value ? 'bg-black-200' : ''}`}
                      onPress={() => {
                        onValueChange(item.value);
                        setModalVisible(false);
                      }}
                    >
                      <Text className="text-white">{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {errorMsg && <Text className="text-red-500 text-sm font-plight mt-1">{errorMsg}</Text>}
    </View>
  );
};

export default FormPicker;

// Usage example:
{/* <FormPicker
  title="Business Type"
  value={form.businessType}
  onValueChange={(value) => handleDataInput(value, 'businessType')}
  items={businessTypes.map(type => ({ 
    label: type, 
    value: type.toLowerCase() 
  }))}
  searchable={true}
/> */}
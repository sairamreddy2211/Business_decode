// components/messages/swipeable_conversation.tsx
import { View, TouchableOpacity, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ConversationCard } from './conversation_card';

export const SwipeableConversation = ({ conversation, onArchive, onDelete, onPress }) => {
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View className="flex-row">
        <Animated.View style={{ transform: [{ scale }] }}>
          <TouchableOpacity 
            onPress={onArchive}
            className="bg-blue-500 justify-center w-16 h-full items-center"
          >
            <MaterialCommunityIcons name="archive" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale }] }}>
          <TouchableOpacity 
            onPress={onDelete}
            className="bg-red-500 justify-center w-16 h-full items-center"
          >
            <MaterialCommunityIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <ConversationCard conversation={conversation} onPress={onPress} />
    </Swipeable>
  );
};

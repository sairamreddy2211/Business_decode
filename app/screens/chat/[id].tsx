// app/chat/[id].tsx
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface Message {
  id: string;
  text: string;
  image?: string;
  timestamp: Date;
  sender: 'user' | 'business';
  status: 'sent' | 'delivered' | 'read';
  reactions?: string[];
}

const ChatScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! Thanks for reaching out.',
      timestamp: new Date(Date.now() - 3600000),
      sender: 'business',
      status: 'read',
      reactions: ['👍']
    },
    {
      id: '2',
      text: 'I would love to learn more about your business.',
      timestamp: new Date(Date.now() - 1800000),
      sender: 'user',
      status: 'read'
    },
    // Add more messages for testing
  ]);

  // Simulate typing indicator
  useEffect(() => {
    if (message.length > 0) {
      setIsTyping(true);
      const timeout = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      sendMessage('', result.assets[0].uri);
    }
  };

  const sendMessage = (text: string = message, image?: string) => {
    if (!text && !image) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      image,
      timestamp: new Date(),
      sender: 'user',
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate message status changes
    setTimeout(() => updateMessageStatus(newMessage.id, 'delivered'), 1000);
    setTimeout(() => updateMessageStatus(newMessage.id, 'read'), 2000);
  };

  const updateMessageStatus = (messageId: string, status: Message['status']) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, status } : msg
      )
    );
  };

  const addReaction = (messageId: string, reaction: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: msg.reactions
                ? [...msg.reactions, reaction]
                : [reaction]
            }
          : msg
      )
    );
  };

  const renderMessage = ({ item: message }: { item: Message }) => {
    const isSender = message.sender === 'user';

    return (
      <View className={`max-w-[80%] mb-4 ${isSender ? 'self-end' : 'self-start'}`}>
        {/* Message Bubble */}
        <TouchableOpacity
          onLongPress={() => addReaction(message.id, '👍')}
          activeOpacity={0.9}
          className={`rounded-2xl p-3 ${
            isSender ? 'bg-orange-500' : 'bg-black-200'
          }`}
        >
          {message.image && (
            <Image
              source={{ uri: message.image }}
              className="w-48 h-48 rounded-xl mb-2"
            />
          )}
          {message.text && (
            <Text className={isSender ? 'text-blue-800' : 'text-white'}>
              {message.text}
            </Text>
          )}
        </TouchableOpacity>

        {/* Time and Status */}
        <View className={`flex-row items-center mt-1 ${
          isSender ? 'justify-end' : 'justify-start'
        }`}>
          <Text className="text-gray-500 text-xs">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
          {isSender && (
            <MaterialCommunityIcons
              name={
                message.status === 'sent'
                  ? 'check'
                  : message.status === 'delivered'
                  ? 'check-all'
                  : 'eye'
              }
              size={16}
              color={message.status === 'read' ? '#FF9C01' : '#7B7B8B'}
              className="ml-1"
            />
          )}
        </View>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <View className={`flex-row mt-1 ${
            isSender ? 'justify-end' : 'justify-start'
          }`}>
            <View className="bg-black-100 rounded-full px-2 py-1">
              <Text className="text-xs">
                {message.reactions.join(' ')}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-black-200">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Image
          source={require('@/assets/images/placeholder.png')}
          className="w-10 h-10 rounded-full ml-3"
        />
        <View className="ml-3 flex-1">
          <Text className="text-white font-psemibold">Joe's Cafe</Text>
          {isTyping ? (
            <Text className="text-gray-500 text-sm">typing...</Text>
          ) : (
            <Text className="text-gray-500 text-sm">Online</Text>
          )}
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View className="flex-row items-center p-4 border-t border-black-200">
          <TouchableOpacity
            onPress={pickImage}
            className="mr-3"
          >
            <MaterialCommunityIcons name="image" size={24} color="#7B7B8B" />
          </TouchableOpacity>
          
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor="#7B7B8B"
            multiline
            className="flex-1 bg-black-200 rounded-2xl px-4 py-2 text-white min-h-[40px] max-h-[100px]"
          />
          
          <TouchableOpacity
            onPress={() => sendMessage()}
            disabled={!message.trim()}
            className="ml-3"
          >
            <MaterialCommunityIcons
              name="send"
              size={24}
              color={message.trim() ? "#FF9C01" : "#7B7B8B"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
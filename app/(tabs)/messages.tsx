import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { useMemo, useState } from 'react';
import { SearchBar } from '@/components/messages/search_bar';
import { SwipeableConversation } from '@/components/messages/swipeable_conversation';
import { FilterModal } from '@/components/messages/filter_modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const DUMMY_CONVERSATIONS = [
  {
    id: '1',
    name: "Joe's Cafe",
    lastMessage: "Thanks for reaching out! I'd be happy to share my experience...",
    time: '2m ago',
    unreadCount: 2,
    image: null,
    isOnline: true,
    isBusinessOwner: true,
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    lastMessage: 'Looking forward to our mentoring session tomorrow!',
    time: '1h ago',
    unreadCount: 0,
    image: null,
    isOnline: false,
    isBusinessOwner: true,
  },
  // Add more conversations...
];

export default function Messages() {
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<any>({
    showUnreadOnly: false,
    showBusinessOwnersOnly: false,
    showArchivedOnly: false,
  });
  const [conversations, setConversations] = useState(DUMMY_CONVERSATIONS);

  const renderEmpty = () => (
    <View className="flex-1 items-center justify-center p-4">
      <MaterialCommunityIcons name="message-text-outline" size={48} color="#7B7B8B" />
      <Text className="text-white text-lg font-pmedium mt-4">No Messages Yet</Text>
      <Text className="text-gray-500 text-center mt-2">
        {search 
          ? "No conversations found matching your search" 
          : "Connect with business owners and mentors to start a conversation"}
      </Text>
    </View>
  );

  const filteredConversations = useMemo(() => {
    return conversations
      .filter(conv => {
        if (search) {
          return conv.name.toLowerCase().includes(search.toLowerCase());
        }
        return true;
      })
      .filter(conv => {
        if (filters.showUnreadOnly && conv.unreadCount === 0) return false;
        if (filters.showBusinessOwnersOnly && !conv.isBusinessOwner) return false;
        if (filters.showArchivedOnly && !conv.isArchived) return false;
        return true;
      });
  }, [conversations, search, filters]);

  const handleArchive = (conversationId: string) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, isArchived: true }
          : conv
      )
    );
  };

  const handleDelete = (conversationId: string) => {
    setConversations(prev => 
      prev.filter(conv => conv.id !== conversationId)
    );
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="p-4 border-b border-black-200">
        <Text className="text-white text-2xl font-psemibold">Messages</Text>
      </View>

      <SearchBar
        value={search}
        onChangeText={setSearch}
        onFilterPress={() => setShowFilters(true)}
      />

      <FlatList
        data={filteredConversations}
        renderItem={({ item }) => (
          <SwipeableConversation
            conversation={item}
            onArchive={() => handleArchive(item.id)}
            onDelete={() => handleDelete(item.id)}
            onPress={() => {
              console.log("check 23",item.id);
              router.push(`/screens/chat/${item.id}`)}}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={renderEmpty}
      />

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApplyFilters={setFilters}
      />
    </SafeAreaView>
  );
}
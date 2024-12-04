// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#161622',
          borderTopColor: '#232533',
        },
        tabBarActiveTintColor: '#FF9C01',
        tabBarInactiveTintColor: '#7B7B8B'
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown:false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown:false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="compass" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          headerShown:false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown:false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// app/(tabs)/profile.tsx
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ProfileOption {
  id: string;
  title: string;
  icon: string;
  route?: string;
  action?: () => void;
}

export default function Profile() {
  const router = useRouter();
  const isBusinessOwner = true; // This will come from your auth context

  const profileOptions: ProfileOption[] = [
    {
      id: '1',
      title: 'Edit Profile',
      icon: 'account-edit',
      route: '/screens/profile/edit'
    },
    {
      id: '2',
      title: 'My Business',
      icon: 'store',
      route: '/screens/profile/business',
      // Only show for business owners
    },
    {
      id: '3',
      title: 'Saved Items',
      icon: 'bookmark',
      route: '/screens/profile/saved'
    },
    {
      id: '4',
      title: 'Settings',
      icon: 'cog',
      route: '/screens/profile/settings'
    },
    {
      id: '5',
      title: 'Help Center',
      icon: 'help-circle',
      route: '/screens/profile/help'
    },
    {
      id: '6',
      title: 'Log Out',
      icon: 'logout',
      action: () => {
        // Add logout logic
        router.replace('/login');
      }
    }
  ];

  const stats = [
    {
      title: isBusinessOwner ? 'Mentees' : 'Mentors',
      value: isBusinessOwner ? '12' : '3'
    },
    {
      title: 'Connections',
      value: '45'
    },
    {
      title: isBusinessOwner ? 'Problems Solved' : 'Solutions Given',
      value: isBusinessOwner ? '8' : '5'
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView>
        {/* Profile Header */}
        <View className="p-4">
          <View className="items-center">
            <View className="relative">
              <Image
                source={require('@/assets/images/placeholder.png')}
                className="w-24 h-24 rounded-2xl"
              />
              <View className="absolute bottom-0 right-0 bg-orange-500 p-1 rounded-full">
                <MaterialCommunityIcons name="pencil" size={16} color="#1e3a8a" />
              </View>
            </View>
            <Text className="text-white text-xl font-psemibold mt-3">John Doe</Text>
            <Text className="text-gray-500">{isBusinessOwner ? 'Business Owner' : 'Aspiring Entrepreneur'}</Text>
            
            {isBusinessOwner && (
              <View className="flex-row items-center mt-1">
                <MaterialCommunityIcons name="check-decagram" size={16} color="#FF9C01" />
                <Text className="text-orange-500 ml-1">Verified Business</Text>
              </View>
            )}
          </View>

          {/* Stats Section */}
          <View className="flex-row justify-between mt-6 bg-black-200 p-4 rounded-xl">
            {stats.map((stat, index) => (
              <View key={index} className="items-center flex-1">
                <Text className="text-white text-lg font-psemibold">{stat.value}</Text>
                <Text className="text-gray-500 text-sm">{stat.title}</Text>
              </View>
            ))}
          </View>

          {/* Bio Section */}
          <View className="mt-6 bg-black-200 p-4 rounded-xl">
            <Text className="text-white font-pmedium mb-2">About</Text>
            <Text className="text-gray-500">
              {isBusinessOwner 
                ? "Owner of Joe's Cafe. Passionate about helping new entrepreneurs in the food industry."
                : "Aspiring entrepreneur interested in the restaurant business. Looking to learn from experienced owners."}
            </Text>
          </View>
        </View>

        {/* Options List */}
        <View className="mt-4">
          {profileOptions
            .filter(option => 
              isBusinessOwner ? true : option.title !== 'My Business'
            )
            .map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => option.action ? option.action() : router.push(option.route!)}
                className="flex-row items-center px-4 py-4 border-b border-black-200"
              >
                <MaterialCommunityIcons 
                  name={option.icon} 
                  size={24} 
                  color={option.title === 'Log Out' ? '#ef4444' : '#FF9C01'} 
                />
                <Text 
                  className={`ml-3 flex-1 ${
                    option.title === 'Log Out' ? 'text-red-500' : 'text-white'
                  }`}
                >
                  {option.title}
                </Text>
                {!option.action && (
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#7B7B8B" />
                )}
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
// ```

// Key features implemented:
// 1. Profile Header
//    - Profile picture with edit button
//    - User name and type
//    - Verification badge for business owners

// 2. Stats Section
//    - Dynamic stats based on user type
//    - Clean grid layout
//    - Important metrics display

// 3. Bio Section
//    - About text
//    - Different content for business/aspiring entrepreneurs

// 4. Options Menu
//    - Edit Profile
//    - My Business (for business owners)
//    - Saved Items
//    - Settings
//    - Help Center
//    - Logout

// Would you like me to:
// 1. Add the edit profile screen?
// 2. Implement the business profile section?
// 3. Add the settings screen?
// 4. Something else?
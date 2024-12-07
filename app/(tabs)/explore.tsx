import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Categories } from '@/components/explore/categories';
import { BusinessCard } from '@/components/explore/business_card';
import { FiltersModal } from '@/components/explore/filters_modal';
import { LoadingState } from '@/components/explore/loading_state';
import { useState } from 'react';

interface Filters {
  priceRange: string;
  location: string;
  experience: string;
  acceptingMentees: boolean;
}
interface Business {
  id: string;
  name: string;
  type: string;
  location: string;
  expertise: string;
  isVerified: boolean;
  isAcceptingMentees: boolean;
  image: string | null;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
}

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: '',
    location: 'All',
    experience: '',
    acceptingMentees: false
  });
  // data/businesses.ts


const businesses: Business[] = [
  {
    id: '1',
    name: "Joe's Cafe",
    type: 'Cafe & Restaurant',
    location: 'New York, NY',
    expertise: '5+ years experience',
    isVerified: true,
    isAcceptingMentees: true,
    image: null,
    priceRange: '$$'
  },
  {
    id: '2',
    name: 'Urban Retail Store',
    type: 'Retail Shop',
    location: 'Los Angeles, CA',
    expertise: '3+ years experience',
    isVerified: true,
    isAcceptingMentees: false,
    image: null,
    priceRange: '$$$'
  },
  {
    id: '3',
    name: 'Tea & Boba Express',
    type: 'Boba Tea Shop',
    location: 'Chicago, IL',
    expertise: '1-3 years experience',
    isVerified: false,
    isAcceptingMentees: true,
    image: null,
    priceRange: '$'
  },
  // Add more dummy data as needed
];
  
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses);

  const applyFilters = (newFilters: Filters) => {
    setIsLoading(true);
    setFilters(newFilters);

    // Simulate API call
    setTimeout(() => {
      let filtered = [...businesses];

      if (selectedCategory) {
        filtered = filtered.filter(business => business.type.includes(selectedCategory));
      }

      if (newFilters.location !== 'All') {
        filtered = filtered.filter(business => business.location.includes(newFilters.location));
      }

      if (newFilters.experience) {
        filtered = filtered.filter(business => business.expertise.includes(newFilters.experience));
      }

      if (newFilters.acceptingMentees) {
        filtered = filtered.filter(business => business.isAcceptingMentees);
      }

      setFilteredBusinesses(filtered);
      setIsLoading(false);
    }, 1000);
  };

  const [bookmarkedBusinesses, setBookmarkedBusinesses] = useState<string[]>([]);

  const handleToggleBookmark = (businessId: string) => {
    setBookmarkedBusinesses(prev => 
      prev.includes(businessId) 
        ? prev.filter(id => id !== businessId)
        : [...prev, businessId]
    );
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-2xl font-psemibold">Explore</Text>
          <TouchableOpacity
            onPress={() => setShowFilters(true)}
            className="flex-row items-center"
          >
            <MaterialCommunityIcons name="filter-variant" size={24} color="#FF9C01" />
            {Object.values(filters).some(value => value) && (
              <View className="w-2 h-2 rounded-full bg-orange-500 ml-1" />
            )}
          </TouchableOpacity>
        </View>
        
        <View className="flex-row items-center bg-black-200 rounded-xl p-3 mb-2">
          <MaterialCommunityIcons name="magnify" size={24} color="#7B7B8B" />
          <TextInput
            placeholder="Search businesses..."
            placeholderTextColor="#7B7B8B"
            className="flex-1 ml-2 text-white"
          />
        </View>
      </View>

      <ScrollView>
        {isLoading ? (
          <LoadingState />
        ) : (
          <>
            <Categories 
              // selectedCategory={selectedCategory}
              // onSelectCategory={(category) => {
              //   setSelectedCategory(category);
              //   applyFilters(filters);
              // }}
            />
            <View className="p-4">
              {filteredBusinesses.map(business => (
                 <BusinessCard 
                 key={business.id} 
                 business={business}
                 onToggleBookmark={handleToggleBookmark}
                 isBookmarked={bookmarkedBusinesses.includes(business.id)}
               />
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <FiltersModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApply={applyFilters}
      />
    </SafeAreaView>
  );
}
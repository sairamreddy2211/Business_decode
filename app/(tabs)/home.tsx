import { BusinessSpotlight } from '@/components/business_spotlight';
import { DiscoverSection } from '@/components/discover_section';
import { FeaturedWorkshop } from '@/components/featured_workshop';
import Header from '@/components/header';
import { QuickActions } from '@/components/quick_actions';
import { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native';

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Add refresh logic here
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <Header />
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#FF9C01"
          />
        }
      >
        <FeaturedWorkshop />
        <QuickActions />
        <BusinessSpotlight />
        <DiscoverSection />
      </ScrollView>
    </SafeAreaView>
  );
}

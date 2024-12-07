import { View, ScrollView } from 'react-native';


export const LoadingState = () => {
  return (
    <View>
      {/* Category Loading */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="p-4"
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} className="mr-4 items-center">
            <View className="w-16 h-16 rounded-full bg-black-200 animate-pulse" />
            <View className="w-16 h-4 mt-2 rounded bg-black-200 animate-pulse" />
          </View>
        ))}
      </ScrollView>

      {/* Business Cards Loading */}
      <View className="p-4">
        {[1, 2].map((item) => (
          <View key={item} className="bg-black-200 rounded-xl mb-4 overflow-hidden">
            <View className="w-full h-48 bg-black-100 animate-pulse" />
            <View className="p-4">
              <View className="w-3/4 h-6 bg-black-100 rounded animate-pulse mb-2" />
              <View className="w-1/2 h-4 bg-black-100 rounded animate-pulse mb-4" />
              <View className="w-1/3 h-4 bg-black-100 rounded animate-pulse" />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
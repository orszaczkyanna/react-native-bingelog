// SearchResults screen
// Displays results based on the search query

import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import SearchBar from "@/components/SearchBar";

const SearchResults = () => {
  // Dynamic parameter from the URL, which comes from the [query].tsx file name
  const { query } = useLocalSearchParams();

  // Ensure query is a string by using the first element if it returns an array
  const queryString = Array.isArray(query) ? query[0] : query;

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <SearchBar initialQuery={queryString} />
      <Text className="text-foreground font-nunitoRegular text-base">
        Searching for: {queryString}
      </Text>
    </View>
  );
};

export default SearchResults;

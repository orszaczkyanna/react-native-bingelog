// SearchResults screen
// Displays results based on the search query

import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import SearchBar from "@/components/SearchBar";
import { searchMedia } from "@/features/watchlist/searchMedia";

const SearchResults = () => {
  // Dynamic parameter from the URL, which comes from the [query].tsx file name
  const { query } = useLocalSearchParams();

  // Ensure query is a string by using the first element if it returns an array
  const queryString = Array.isArray(query) ? query[0] : query;

  // Fetch movie and TV show results when the query changes
  useEffect(() => {
    const runSearch = async () => {
      if (!queryString) return;

      try {
        const results = await searchMedia(queryString);
        // Print JSON response with 2-space indentation (easier to read)
        console.log("✅ TMDb SearchMedia Results:");
        console.log(JSON.stringify(results, null, 2));
      } catch (error) {
        console.error("❌ Error using searchMedia:", error);
      }
    };

    runSearch();
  }, [queryString]);

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

// SearchResults screen
// Displays results based on the search query

import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import SearchBar from "@/components/SearchBar";

import { EXPO_TMDB_API_KEY } from "@env";
import api from "@/lib/axios";

const SearchResults = () => {
  // Dynamic parameter from the URL, which comes from the [query].tsx file name
  const { query } = useLocalSearchParams();

  // Ensure query is a string by using the first element if it returns an array
  const queryString = Array.isArray(query) ? query[0] : query;

  // Run test request to TMDb and log the full raw response object
  useEffect(() => {
    const testSearch = async () => {
      if (!queryString) return;

      try {
        // Search for the queryString in all media types (movie, tv, person)
        const response = await api.get(
          "https://api.themoviedb.org/3/search/multi",
          {
            params: {
              api_key: EXPO_TMDB_API_KEY,
              query: queryString,
              page: 1,
            },
          }
        );

        console.log("✅ TMDb RAW RESPONSE:");
        // Print full JSON response with 2-space indentation (easier to read)
        console.log(JSON.stringify(response.data, null, 2));
      } catch (err) {
        console.error("❌ Error in TMDb test search:", err);
      }
    };

    testSearch();
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

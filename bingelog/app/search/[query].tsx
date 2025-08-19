// SearchResults screen
// Displays results based on the search query

import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import SearchBar from "@/components/SearchBar";
import { searchMedia } from "@/features/watchlist/searchMedia";
import { TMDBMediaResult } from "@/features/watchlist/tmdbTypes";
import SearchResultItem from "@/components/SearchResultItem";
import Colors from "@/constants/Colors";
import EmptyState from "@/components/EmptyState";

const SearchResults = () => {
  // Dynamic parameter from the URL, which comes from the [query].tsx file name
  const { query } = useLocalSearchParams();

  // Ensure query is a string by using the first element if it returns an array
  const queryString = Array.isArray(query) ? query[0] : query;

  // State for TMDb search handling
  const [mediaResults, setMediaResults] = useState<TMDBMediaResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchErrorMessage, setFetchErrorMessage] = useState<string | null>(
    null
  );

  // Fetch movie and TV show results when the query changes
  useEffect(() => {
    const runSearch = async () => {
      if (!queryString) return;

      setIsLoading(true);
      setFetchErrorMessage(null);

      try {
        const results = await searchMedia(queryString);
        setMediaResults(results);

        // Kept in case detailed search results need to be inspected again
        /*
        // Print JSON response with 2-space indentation (easier to read)
        console.log("✅ TMDb SearchMedia Results:");
        console.log(JSON.stringify(results, null, 2));
        */
      } catch (error) {
        setFetchErrorMessage("Failed to load search results.");
        console.error("Error using searchMedia:", error);
      } finally {
        setIsLoading(false);
      }
    };

    runSearch();
  }, [queryString]);

  return (
    <ScreenWrapper>
      {/* 
        Search input
        - Placed above FlatList (not in ListHeaderComponent) to keep it always visible (not scrollable)
        - Using `flex-1` here would cause FlatList content to overlap the search bar
      */}
      <View className="w-full items-center justify-center">
        <SearchBar initialQuery={queryString} />
      </View>

      {/* Loading indicator */}
      {isLoading && (
        <View className="layout-flex-center">
          <ActivityIndicator size="large" color={Colors.accent} />
          <Text className="text-foreground mt-2">Loading...</Text>
        </View>
      )}

      {/* Error state */}
      {fetchErrorMessage && (
        <View className="layout-flex-center">
          <Text className="text-danger font-nunitoRegular">
            {fetchErrorMessage}
          </Text>
        </View>
      )}

      {/* Empty state */}
      {!isLoading && !fetchErrorMessage && mediaResults.length === 0 && (
        <EmptyState
          title="No results found"
          subtitle="Try searching for another movie or show title"
          showIllustration
        />
      )}

      {/* Results list */}
      {!isLoading && !fetchErrorMessage && mediaResults.length > 0 && (
        <FlatList
          data={mediaResults}
          // Generate a unique key using media type and ID (e.g. "Movie-1234")
          keyExtractor={(item) => `${item.media_type}-${item.id}`}
          renderItem={({ item }) => <SearchResultItem item={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
          className="w-full"
        />
      )}
    </ScreenWrapper>
  );
};

export default SearchResults;

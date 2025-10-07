// SearchResults screen
// Displays results based on the search query

import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, FlatList } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import UsernameHeader from "@/components/UsernameHeader";
import SearchBar from "@/components/SearchBar";
import StatusSelectionBar from "@/components/StatusSelectionBar";
import { StatusType } from "@/constants/statusOptions";
import { searchMedia } from "@/features/watchlist/searchMedia";
import { TMDBMediaResult } from "@/features/watchlist/tmdbTypes";
import SearchResultItem from "@/components/SearchResultItem";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import LoadingIndicator from "@/components/LoadingIndicator";

const SearchResults = () => {
  // Dynamic parameter from the URL, which comes from the [query].tsx file name
  const { query } = useLocalSearchParams();

  // Ensure query is a string by using the first element if it returns an array
  const queryString = Array.isArray(query) ? query[0] : query;

  // State for TMDb search handling
  const [mediaResults, setMediaResults] = useState<TMDBMediaResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchError, setIsFetchError] = useState(false);

  // State for storing the currently selected status
  const [activeStatus, setActiveStatus] = useState<StatusType | null>(null);

  // Function to fetch movie and TV show results using the current query
  const runSearch = async () => {
    if (!queryString) return;

    setIsLoading(true);
    setIsFetchError(false);

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
      setIsFetchError(true);
      console.error("Error using searchMedia:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Run search when screen loads or when a new search query is submitted
  useEffect(() => {
    runSearch();
  }, [queryString]);

  return (
    <ScreenWrapper>
      {/* 
        Header and controls container
        - Placed above FlatList (not in ListHeaderComponent) to keep it always visible (not scrollable)
        - Using `flex-1` here would cause FlatList content to overlap the search bar
      */}
      <View className="w-full items-center justify-center">
        {/* Current username */}
        <UsernameHeader />

        {/* Search input */}
        <SearchBar initialQuery={queryString} />

        {/* Row of status icons to choose from (UI only for now) */}
        <StatusSelectionBar
          activeStatus={activeStatus}
          onChange={setActiveStatus}
        />
      </View>

      {/* Loading indicator */}
      {isLoading && <LoadingIndicator />}

      {/* Error state */}
      {isFetchError && (
        <ErrorState
          title="Failed to load results"
          subtitle="Check your internet connection and try again"
          buttonTitle="Try Again"
          onPress={runSearch} // Retry with previous query
        />
      )}

      {/* Empty state */}
      {!isLoading && !isFetchError && mediaResults.length === 0 && (
        <EmptyState
          title="No results found"
          subtitle="Try searching for another movie or show title"
          showIllustration
        />
      )}

      {/* Results list */}
      {!isLoading && !isFetchError && mediaResults.length > 0 && (
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

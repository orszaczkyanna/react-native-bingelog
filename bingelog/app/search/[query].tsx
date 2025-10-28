// SearchResults screen
// Displays results based on the search query

import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, FlatList } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import UsernameHeader from "@/components/UsernameHeader";
import SearchBar from "@/components/SearchBar";
import StatusFilterBar from "@/components/StatusFilterBar";
import { StatusType } from "@/constants/statusOptions";
import { searchMedia } from "@/features/watchlist/searchMedia";
import { TMDBMediaResult } from "@/features/watchlist/tmdbTypes";
import SearchResultItem from "@/components/SearchResultItem";
import StatusSelectorBottomSheet from "@/components/StatusSelectorBottomSheet";
import { useWatchlistOperations } from "@/hooks/useWatchlistOperations";
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

  // State for the bottom sheet - used to add or update items in the watchlist (database)
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedMediaItem, setSelectedMediaItem] =
    useState<TMDBMediaResult | null>(null);

  // State for filtering search results by status
  const [activeStatusFilter, setActiveStatusFilter] =
    useState<StatusType | null>(null);

  // User's watchlist state and related operations
  const {
    userWatchlist,
    addMediaItemToWatchlist,
    removeMediaItemFromWatchlist,
  } = useWatchlistOperations();

  // Helper function to check if a given media item is already in the user's watchlist
  const isMediaItemInUserWatchlist = (item: TMDBMediaResult | null) => {
    if (!item) return false;
    return userWatchlist.some(
      (watchlistItem) => watchlistItem.tmdb_id === item.id
    );
    // Note: .some() returns true if at least one element matches (unlike .find() which returns the element itself)
  };

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

  // Derived array variable: filtered list of results after applying the status filter
  const filteredMediaResults = mediaResults.filter((mediaItem) => {
    // If no filter selected, include everything
    if (!activeStatusFilter) return true;

    // Find the media item in the user's watchlist (match by tmdb_id)
    const watchlistEntry = userWatchlist.find(
      (watchlistItem) => watchlistItem.tmdb_id === mediaItem.id
    );

    // Keep only if the item's status matches the selected filter
    return watchlistEntry?.status === activeStatusFilter;
  });

  // Handle status icon press (e.g. plus or status icon) in a search result row
  const handleStatusIconPress = (mediaItem: TMDBMediaResult) => {
    // Open modal with the selected media item
    setSelectedMediaItem(mediaItem);
    setBottomSheetVisible(true);
  };

  // Handle selecting a status inside the bottom sheet
  const handleSelectStatus = async (status: StatusType) => {
    if (!selectedMediaItem) {
      handleCloseBottomSheet();
      return;
    }

    try {
      await addMediaItemToWatchlist(selectedMediaItem.id, status);
    } catch (error) {
      // Note: error is already logged inside the hook
    } finally {
      // Close the bottom sheet after selecting a status
      handleCloseBottomSheet();
    }
  };

  // Handle removing an item from the user's watchlist
  const handleRemoveFromList = async () => {
    if (!selectedMediaItem) {
      handleCloseBottomSheet();
      return;
    }

    try {
      await removeMediaItemFromWatchlist(selectedMediaItem.id);
    } catch (error) {
      // Note: error is already logged inside the hook
    } finally {
      handleCloseBottomSheet();
    }
  };

  // Handle closing the bottom sheet
  const handleCloseBottomSheet = () => {
    setBottomSheetVisible(false);
    setSelectedMediaItem(null);
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
        <SearchBar initialQuery={queryString ?? ""} />

        {/* Row of status icons to choose from (UI only for now) */}
        <StatusFilterBar
          activeStatus={activeStatusFilter}
          onChange={setActiveStatusFilter}
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
          data={filteredMediaResults}
          // Generate a unique key using media type and ID (e.g. "Movie-1234")
          keyExtractor={(item) => `${item.media_type}-${item.id}`}
          renderItem={({ item }) => (
            <SearchResultItem
              item={item}
              onStatusIconPress={handleStatusIconPress}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          className="w-full"
        />
      )}

      {/* Bottom sheet for choosing status,
      showing when adding or editing an item */}
      <StatusSelectorBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={handleCloseBottomSheet}
        onSelectStatus={handleSelectStatus}
        // Show Remove option only if item is already in watchlist
        onRemove={
          isMediaItemInUserWatchlist(selectedMediaItem)
            ? handleRemoveFromList
            : undefined
        }
      />
    </ScreenWrapper>
  );
};

export default SearchResults;

// Media Details screen
// Shows detailed information for a selected movie or TV show

import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { getThemedHeaderOptions } from "@/constants/themedHeaderOptions";
import { useTmdbMediaDetailsBundle } from "@/hooks/useTmdbMediaDetailsBundle";
import LoadingIndicator from "@/components/LoadingIndicator";
import ErrorState from "@/components/ErrorState";
import MediaHeaderSection from "@/components/MediaHeaderSection";
import MediaWatchlistSection from "@/components/MediaWatchlistSection";
import MediaOverviewSection from "@/components/MediaOverviewSection";
import MediaVideoSection from "@/components/MediaVideoSection";

const MediaDetails = () => {
  // Get route params (tmdbId is required, mediaTitle and mediaType are optional)
  const { tmdbId, mediaTitle, mediaType } = useLocalSearchParams<{
    tmdbId: string;
    mediaTitle?: string;
    mediaType?: "movie" | "tv";
  }>();

  // Use a fallback if no title was passed
  const headerTitle =
    typeof mediaTitle === "string" && mediaTitle.length > 0
      ? mediaTitle
      : "Media Details";

  // Decide media type (fallback to 'movie' if not provided)
  const resolvedMediaType: "movie" | "tv" =
    mediaType === "movie" || mediaType === "tv" ? mediaType : "movie";

  // Load TMDb details, videos, and cast data for the selected media item
  const {
    data: tmdbBundle,
    videoKey,
    selectedVideoType,
    isLoading,
    isError,
  } = useTmdbMediaDetailsBundle({
    mediaType: resolvedMediaType,
    tmdbId: Number(tmdbId),
  });

  return (
    <ScreenWrapper className="pt-3">
      {/* Set a dynamic header title based on the incoming param */}
      <Stack.Screen options={getThemedHeaderOptions(headerTitle)} />

      <ScrollView
        className="w-full"
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {/* Loading indicator */}
        {isLoading && <LoadingIndicator />}

        {/* Error state */}
        {isError && (
          <ErrorState
            title="Failed to load details"
            subtitle="Check your internet connection and try again"
          />
        )}

        {/* Preview from TMDb data */}
        {!isLoading && !isError && tmdbBundle && (
          <View>
            {/* Header (poster, title, meta) */}
            <MediaHeaderSection
              mediaType={tmdbBundle.mediaType}
              details={tmdbBundle.details}
            />

            {/* Watchlist add/edit section */}
            <MediaWatchlistSection tmdbId={Number(tmdbId)} />

            {/* Overview section */}
            <MediaOverviewSection overviewText={tmdbBundle.details.overview} />

            {/* Video section (renders only when a videoKey exists) */}
            <MediaVideoSection
              videoKey={videoKey}
              videoTypeLabel={selectedVideoType}
            />

            {/* Render a short top-cast preview (temporary) */}
            {tmdbBundle.credits?.cast?.length > 0 && (
              <View className="px-4 pt-4">
                <Text className="text-foreground font-nunitoSemiBold text-base mb-1">
                  Top cast
                </Text>

                {tmdbBundle.credits.cast.slice(0, 5).map((castMember) => (
                  <Text
                    key={castMember.id}
                    className="text-foreground-secondary font-nunitoRegular text-sm"
                  >
                    {castMember.name}
                    {castMember.character ? ` as ${castMember.character}` : ""}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Show TMDb ID during development */}
        <View className="px-4 pt-4 mt-6">
          <Text className="text-foreground-secondary font-nunitoRegular text-xs text-center">
            TMDb ID: {tmdbId}
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default MediaDetails;

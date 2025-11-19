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
    <ScreenWrapper>
      {/* Set a dynamic header title based on the incoming param */}
      <Stack.Screen options={getThemedHeaderOptions(headerTitle)} />

      <ScrollView
        className="w-full"
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {/* Temporary header section */}
        <View className="p-4">
          <Text className="text-foreground font-nunitoBold text-xl">
            Media Details
          </Text>
          <Text className="text-foreground-secondary font-nunitoRegular text-sm mt-1">
            TMDb ID: {tmdbId}
          </Text>
        </View>

        {/* Loading indicator */}
        {isLoading && <LoadingIndicator />}

        {/* Error state */}
        {isError && (
          <ErrorState
            title="Failed to load details"
            subtitle="Check your internet connection and try again"
          />
        )}

        {/* Preview from TMDb data (temporary) */}
        {!isLoading && !isError && tmdbBundle && (
          <View className="p-4 gap-y-2">
            <Text className="text-foreground font-nunitoSemiBold text-base">
              {tmdbBundle.mediaType === "movie"
                ? (tmdbBundle.details as any).title
                : (tmdbBundle.details as any).name}
            </Text>
            <Text className="text-foreground-secondary font-nunitoRegular text-sm">
              {tmdbBundle.details.overview || "No overview available."}
            </Text>

            {videoKey && (
              <Text className="text-foreground-secondary font-nunitoRegular text-sm">
                {(selectedVideoType ?? "Video") +
                  " available on YouTube (key): "}
                {videoKey}
              </Text>
            )}

            {/* Open trailer via YouTube URL (temporary) */}
            {videoKey && (
              <Pressable
                onPress={() =>
                  Linking.openURL(`https://www.youtube.com/watch?v=${videoKey}`)
                }
                className="mt-2"
              >
                <Text className="text-accent font-nunitoSemiBold text-sm">
                  Open {selectedVideoType ?? "Video"} on YouTube
                </Text>
              </Pressable>
            )}

            {/* Render a short top-cast preview (temporary) */}
            {tmdbBundle.credits?.cast?.length > 0 && (
              <View className="mt-4">
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
      </ScrollView>
    </ScreenWrapper>
  );
};

export default MediaDetails;

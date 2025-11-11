// Media Details screen
// Shows detailed information for a selected movie or TV show

import React from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";

const MediaDetails = () => {
  const { tmdbId } = useLocalSearchParams<{ tmdbId: string }>();

  return (
    <ScreenWrapper>
      <ScrollView
        className="w-full"
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        <View className="p-4">
          <Text className="text-foreground font-nunitoBold text-xl">
            Media Details
          </Text>
          <Text className="text-foreground-secondary font-nunitoRegular text-sm mt-1">
            TMDb ID: {tmdbId}
          </Text>
        </View>

        <View className="p-4">
          <Text className="text-foreground-secondary">
            TMDb details will be added later.
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default MediaDetails;

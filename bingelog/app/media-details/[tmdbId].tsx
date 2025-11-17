// Media Details screen
// Shows detailed information for a selected movie or TV show

import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import Colors from "@/constants/Colors";

const MediaDetails = () => {
  // Get route params (tmdbId is required, mediaTitle is optional)
  const { tmdbId, mediaTitle } = useLocalSearchParams<{
    tmdbId: string;
    mediaTitle?: string;
  }>();

  // Use a fallback if no title was passed
  const headerTitle =
    typeof mediaTitle === "string" && mediaTitle.length > 0
      ? mediaTitle
      : "Media Details";

  return (
    <ScreenWrapper>
      {/* Set a dynamic header title based on the incoming param */}
      <Stack.Screen
        options={{
          headerShown: true,
          title: headerTitle,
          headerStyle: { backgroundColor: Colors.background.input },
          headerTintColor: Colors.foreground.primary,
          headerTitleStyle: { fontFamily: "Nunito-Sans-Regular" },
        }}
      />

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

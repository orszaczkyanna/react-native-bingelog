// Render the Overview section with title and full description

import React from "react";
import { View, Text } from "react-native";

interface Props {
  overviewText?: string | null;
}

const MediaOverviewSection = ({ overviewText }: Props) => {
  // Use a fallback if no overview is available
  const displayText =
    overviewText && overviewText.trim().length > 0
      ? overviewText.trim()
      : "No overview available.";

  return (
    <View className="px-4 pt-4">
      {/* Section title */}
      <Text className="text-section-title mb-2">Overview</Text>

      {/* Full overview text */}
      <Text className="text-foreground-secondary font-nunitoRegular text-base leading-relaxed text-justify">
        {displayText}
      </Text>
    </View>
  );
};

export default MediaOverviewSection;

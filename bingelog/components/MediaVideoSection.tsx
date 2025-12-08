// Render a clickable video thumbnail with a dynamic section title; hide when no video is available

import React from "react";
import { View, Text, Image, Pressable, Linking } from "react-native";

interface Props {
  videoKey: string | null; // YouTube video key (e.g., "k10ETZ41q5o")
  videoTypeLabel?: string | null; // TMDb label: "Trailer" | "Teaser" | "Clip" | ...
}

// Build the YouTube video URL from the key
const buildYouTubeUrl = (key: string) =>
  `https://www.youtube.com/watch?v=${key}`;

// Build the YouTube thumbnail URL; mqdefault has a 16:9 ratio
const buildYouTubeThumbnail = (key: string) =>
  `https://img.youtube.com/vi/${key}/mqdefault.jpg`;

const MediaVideoSection = ({ videoKey, videoTypeLabel }: Props) => {
  // Do not render the section when there is no selected video
  if (!videoKey) return null;

  // Use the TMDb-provided type as title; fall back to "Video" when missing
  const sectionTitle =
    videoTypeLabel && videoTypeLabel.trim().length > 0
      ? videoTypeLabel
      : "Video";

  // Open the YouTube URL in the default app/browser
  const openVideo = () => {
    const url = buildYouTubeUrl(videoKey);
    Linking.openURL(url);
  };

  return (
    <View className="px-4 pt-4">
      {/* Section title */}
      <Text className="text-section-title mb-4">{sectionTitle} on YouTube</Text>

      {/* Clickable thumbnail */}
      <Pressable
        onPress={openVideo}
        className="rounded-md overflow-hidden active:opacity-70"
      >
        {/* Note: Maintain consistent aspect ratio across devices and orientations */}
        <View style={{ aspectRatio: 16 / 9 }}>
          <Image
            source={{ uri: buildYouTubeThumbnail(videoKey) }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
      </Pressable>
    </View>
  );
};

export default MediaVideoSection;

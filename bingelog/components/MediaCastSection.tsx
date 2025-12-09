// Render a horizontally scrollable "Top cast" section with actor photo, name, and character

import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import images from "@/constants/images";

/** TMDb cast item shape used here */
type CastItem = {
  id: number;
  name: string;
  character?: string | null;
  profile_path?: string | null;
};

interface Props {
  castList: CastItem[]; // Full cast list from TMDb: tmdbBundle.credits.cast
  maxItems?: number; // Limit how many cards to render (default 15)
  sectionTitle?: string; // Title text (default: "Top cast")
}

// TMDb profile image base
const PROFILE_IMG_BASE = "https://image.tmdb.org/t/p/w185";

// Return a valid image source; use local fallback when no profile image
const getProfileImageSource = (profilePath: string | null | undefined) => {
  if (!profilePath) return images.tmdbPosterFallbackSmall;
  return { uri: `${PROFILE_IMG_BASE}${profilePath}` };
};

const MediaCastSection = ({
  castList,
  maxItems = 15,
  sectionTitle = "Top cast",
}: Props) => {
  // Do not render the section if there is no cast
  if (!Array.isArray(castList) || castList.length === 0) return null;

  // Select the first N items (keep TMDb order as-is)
  const visibleCast = castList.slice(0, maxItems);

  return (
    <View className="pt-4">
      {/* Section title */}
      <Text className="text-section-title px-4 mb-4">{sectionTitle}</Text>

      {/* Horizontal list of non-clickable cast cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 14 }}
      >
        {visibleCast.map((person) => {
          const imgSource = getProfileImageSource(person.profile_path);

          return (
            <View
              key={person.id}
              className="w-32 mr-3 rounded-md overflow-hidden bg-background-input"
            >
              {/* Photo area: keep a consistent 2:3 ratio */}
              <View style={{ aspectRatio: 2 / 3 }}>
                <Image
                  source={imgSource}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Text area */}
              <View className="p-3">
                {/* Actor name */}
                <Text
                  className="text-foreground font-nunitoRegular text-base"
                  numberOfLines={1}
                >
                  {person.name}
                </Text>

                {/* Role/character name */}
                <Text
                  className="text-foreground-secondary font-nunitoRegular text-sm mt-0.5"
                  numberOfLines={1}
                >
                  {person.character && person.character.trim().length > 0
                    ? person.character
                    : "Role unknown"}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MediaCastSection;

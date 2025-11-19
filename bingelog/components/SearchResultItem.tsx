// Displays one TMDb search result with image, title, year, type, and an icon

import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { TMDBMediaResult } from "@/features/watchlist/tmdbSearchTypes";
import Feather from "@expo/vector-icons/Feather";
import images from "@/constants/images";
import Colors from "@/constants/Colors";
import { STATUS_OPTIONS, StatusType } from "@/constants/statusOptions";

interface Props {
  item: TMDBMediaResult;
  onItemPress: () => void; // Open Media Details when tapping the poster or the text block
  onStatusIconPress: (item: TMDBMediaResult) => void; // Called when the user taps the action icon (add/edit)
  savedStatus: StatusType | null; // Status of this media item in the user's watchlist (null if not added)
}

const IMAGE_BASE_URL_SMALL = "https://image.tmdb.org/t/p/w185";

// Get the Feather icon name that matches a given status
const getFeatherIconNameForStatus = (
  status: StatusType
): React.ComponentProps<typeof Feather>["name"] => {
  const matchingStatusOption = STATUS_OPTIONS.find(
    (statusOption) => statusOption.statusValue === status
  );
  return matchingStatusOption
    ? matchingStatusOption.featherIcon
    : "plus-circle";
};

const SearchResultItem = ({
  item,
  onItemPress,
  onStatusIconPress,
  savedStatus,
}: Props) => {
  // Get correct title and release year depending on media type (movie or TV show)
  const isMovie = item.media_type === "movie";
  const title = isMovie ? item.title : item.name;
  const year = isMovie
    ? item.release_date?.slice(0, 4)
    : item.first_air_date?.slice(0, 4);

  // Use online poster image if available, else local fallback image
  const posterSource = item.poster_path
    ? { uri: `${IMAGE_BASE_URL_SMALL}${item.poster_path}` }
    : images.tmdbPosterFallbackSmall;

  // Decide which icon to show based on the media's saved status in the user's watchlist
  const iconName: React.ComponentProps<typeof Feather>["name"] = savedStatus
    ? getFeatherIconNameForStatus(savedStatus)
    : "plus-circle";

  return (
    <View className="flex-row items-center gap-4 p-4 border-b border-foreground-divider">
      {/* Wrap poster and text into a single tappable area */}
      <Pressable
        className="flex-1 flex-row items-center gap-4"
        onPress={onItemPress}
      >
        {/* Poster image */}
        <Image
          source={posterSource}
          className="w-16 h-24 rounded-md"
          resizeMode="cover"
        />

        {/* Textual info */}
        <View className="flex-1">
          {/* Title */}
          {/* max 2 lines, shows "..." ellipsis if too long */}
          <Text
            className="text-foreground font-nunitoSemiBold text-base"
            numberOfLines={2}
            ellipsizeMode="tail" // truncate end
          >
            {title}
          </Text>
          {/* Details */}
          <Text className="text-foreground-secondary font-nunitoRegular text-sm">
            {year || "Unknown release date"}
            {"\n"}
            {isMovie ? "Movie" : "TV Show"}
          </Text>
        </View>
      </Pressable>

      {/* Action icon */}
      <Pressable
        onPress={() => onStatusIconPress(item)} // Trigger callback in parent
        className="ml-2"
        hitSlop={10}
      >
        <Feather
          name={iconName}
          size={20}
          color={Colors.foreground.secondary}
        />
      </Pressable>
    </View>
  );
};

export default SearchResultItem;

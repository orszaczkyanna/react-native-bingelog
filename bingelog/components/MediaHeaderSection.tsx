// Renders poster, title, and primary metadata (year, type, genres, runtime, user score)

import React from "react";
import { View, Text, Image } from "react-native";
import Colors from "@/constants/Colors";
import images from "@/constants/images";
import {
  TMDBMovieDetails,
  TMDBTVDetails,
} from "@/features/watchlist/tmdbDetailsTypes";

interface Props {
  mediaType: "movie" | "tv";
  details: TMDBMovieDetails | TMDBTVDetails;
}

const IMAGE_BASE_URL_LARGE = "https://image.tmdb.org/t/p/w342";

// Build a safe image source for the poster
const getPosterSource = (posterPath: string | null) => {
  if (!posterPath) {
    // Use local fallback image when TMDb poster is missing
    return images.tmdbPosterFallbackLarge;
  }
  return { uri: `${IMAGE_BASE_URL_LARGE}${posterPath}` };
};

// Extract the display title by media type
const getDisplayTitle = (
  mediaType: "movie" | "tv",
  details: TMDBMovieDetails | TMDBTVDetails
) => {
  return mediaType === "movie"
    ? (details as TMDBMovieDetails).title
    : (details as TMDBTVDetails).name;
};

// Extract year (movie: release_date, tv: first_air_date)
const getYearText = (
  mediaType: "movie" | "tv",
  details: TMDBMovieDetails | TMDBTVDetails
) => {
  const raw =
    mediaType === "movie"
      ? (details as TMDBMovieDetails).release_date
      : (details as TMDBTVDetails).first_air_date;
  if (!raw || raw.length < 4) return "Unknown year";
  return raw.slice(0, 4);
};

// Get comma separated genres
const getGenresText = (details: TMDBMovieDetails | TMDBTVDetails) => {
  if (!Array.isArray(details.genres) || details.genres.length === 0) {
    return "Unknown genres";
  }
  return details.genres.map((g) => g.name).join(", ");
};

// Format runtime (movie: minutes, tv: first/avg episode length)
const getRuntimeText = (
  mediaType: "movie" | "tv",
  details: TMDBMovieDetails | TMDBTVDetails
) => {
  if (mediaType === "movie") {
    const minutes = (details as TMDBMovieDetails).runtime;
    if (!minutes || minutes <= 0) return "Unknown runtime";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  // TV: TMDb returns an array of episode_run_time
  const runs = (details as TMDBTVDetails).episode_run_time;
  if (!Array.isArray(runs) || runs.length === 0) return "Unknown runtime";
  const minutes = runs[0]; // Use first value; usually representative
  if (!minutes || minutes <= 0) return "Unknown runtime";
  return `${minutes}m / episode`;
};

// Convert vote_average (0..10) to percentage string
const getUserScoreText = (voteAverage: number) => {
  if (typeof voteAverage !== "number") return "User Score: N/A";
  const pct = Math.round(voteAverage * 10);
  return `User Score: ${pct}%`;
};

const MediaHeaderSection = ({ mediaType, details }: Props) => {
  const posterSource = getPosterSource(details.poster_path);
  const title = getDisplayTitle(mediaType, details);
  const yearText = getYearText(mediaType, details);
  const typeText = mediaType === "movie" ? "Movie" : "TV Show";
  const genresText = getGenresText(details);
  const runtimeText = getRuntimeText(mediaType, details);
  const userScoreText = getUserScoreText(details.vote_average);

  return (
    <View className="px-4 pt-0 pb-6">
      <View className="flex-row gap-4">
        {/* Poster */}
        <Image
          source={posterSource}
          className="w-36 h-52 rounded-md"
          resizeMode="cover"
        />

        {/* Title and metadata */}
        <View className="flex-1 h-52">
          {/* Title fixed at the top (max 3 lines) */}
          <Text
            className="text-foreground font-nunitoBold text-2xl"
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {title}
          </Text>

          {/* Metadata fills remaining height: evenly spaced, last line near the bottom */}
          <View className="flex-1 justify-between mt-3 pb-1">
            <Text className="text-meta">{yearText}</Text>
            <Text className="text-meta">{typeText}</Text>
            <Text className="text-meta">{genresText}</Text>
            <Text className="text-meta">{runtimeText}</Text>
            <Text className="text-meta">{userScoreText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MediaHeaderSection;

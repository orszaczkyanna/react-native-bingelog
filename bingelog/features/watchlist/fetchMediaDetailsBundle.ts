// Fetches TMDb details for a movie or TV show, including videos and credits in a single request

import { tmdbApi } from "@/lib/axios";
import { EXPO_TMDB_API_KEY } from "@env";
import {
  TMDBMediaDetailsBundle,
  TMDBMovieDetails,
  TMDBTVDetails,
  TMDBVideosAppend,
  TMDBCreditsAppend,
} from "./tmdbDetailsTypes";

interface FetchParams {
  mediaType: "movie" | "tv";
  tmdbId: number;
  apiKey?: string; // optional override for tests
  language?: string; // keep English app-wide; default "en-US"
}

export const fetchMediaDetailsBundle = async ({
  mediaType,
  tmdbId,
  apiKey = EXPO_TMDB_API_KEY,
  language = "en-US",
}: FetchParams): Promise<TMDBMediaDetailsBundle> => {
  // Validate API key
  if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
    throw new Error("TMDb details fetch failed: missing API key.");
  }

  const path = mediaType === "movie" ? `/movie/${tmdbId}` : `/tv/${tmdbId}`;

  // Send TMDb API request for details, including appended 'videos' and 'credits' in one call
  try {
    const response = await tmdbApi.get<
      (TMDBMovieDetails | TMDBTVDetails) & {
        videos: TMDBVideosAppend;
        credits: TMDBCreditsAppend;
      }
    >(path, {
      params: {
        api_key: apiKey,
        append_to_response: "videos,credits",
        language,
      },
    });

    // Basic shape validation
    if (!response?.data) {
      throw new Error("TMDb details fetch failed: empty response");
    }
    if (!response.data.videos || !response.data.credits) {
      throw new Error("TMDb details fetch failed: missing appended data");
    }

    // Construct the unified bundle
    return {
      mediaType,
      details: response.data as TMDBMovieDetails | TMDBTVDetails,
      videos: response.data.videos,
      credits: response.data.credits,
    } as TMDBMediaDetailsBundle;
  } catch (error) {
    console.error("TMDb details fetch failed:", error);
    throw error;
  }
};

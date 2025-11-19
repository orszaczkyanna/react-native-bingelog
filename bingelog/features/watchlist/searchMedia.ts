// Fetches movie and TV show results from TMDb using a search query

import { tmdbApi } from "@/lib/axios";
import { TMDBMediaResult, TMDBMultiSearchResponse } from "./tmdbSearchTypes";
import { EXPO_TMDB_API_KEY } from "@env";

// Perform a TMDb multi-search and return an array of movie and TV show results
export const searchMedia = async (
  query: string, // search keyword (e.g. "conjuring")
  page: number = 1, // which page to request (default is 1)
  apiKey: string = EXPO_TMDB_API_KEY // optional override for testability
): Promise<TMDBMediaResult[]> => {
  if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
    throw new Error("TMDb search failed: missing API key.");
  }

  try {
    // Send GET request to TMDb multi-search endpoint, which allows searching movies, TV shows, and persons in one request
    const response = await tmdbApi.get<TMDBMultiSearchResponse>(
      "/search/multi",
      {
        params: {
          api_key: apiKey, // TMDb v3 API key from .env
          // Sufficient for public TMDb data (search, details, etc.)
          // Bearer token only needed for TMDb user account actions (e.g. rating)
          query, // search term
          page, // selected page to retrieve
          include_adult: false, // exclude 18+ adult content
        },
      }
    );

    // Ensure TMDb response contains a valid results array
    if (!Array.isArray(response?.data?.results)) {
      throw new Error("TMDb search failed: invalid or missing results");
    }

    // Keep only movies and TV shows, exclude persons
    const filteredMediResults = response.data.results.filter(
      // Narrow the type: tell TypeScript item is TMDBMediaResult if the condition below is true
      (item): item is TMDBMediaResult =>
        item.media_type === "movie" || item.media_type === "tv"
    );

    // Return filtered movie and TV show results
    return filteredMediResults;
  } catch (error) {
    // Log and rethrow any API errors
    console.error("TMDb search failed:", error);
    throw error;
  }
};

/*
  // Example query to test if the API request works; logs the full response object for inspection
  // Searches for "conjuring" in all media types (movie, tv, person)

  const response = await api.get("https://api.themoviedb.org/3/search/multi", {
    params: {
      api_key: TMDB_API_KEY,
      query: "conjuring",
      page: 1,
    },
  });
*/

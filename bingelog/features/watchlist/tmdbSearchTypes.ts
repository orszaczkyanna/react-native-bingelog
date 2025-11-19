// Type definitions for TMDb search results

// Base structure shared by all TMDb multi-search result types
export interface TMDBBaseResult {
  id: number;
  media_type: "movie" | "tv" | "person";
  poster_path: string | null; // vertical image
  overview: string; // short description of the movie or show
  popularity: number;
}

// Note:
// - `poster_path`: vertical poster image (used in cards and lists)
// - `backdrop_path`: horizontal banner image (recommended for headers; no plans to use it — only noted to avoid confusion)

// Specific structure for MOVIE search results
export interface TMDBMovieResult extends TMDBBaseResult {
  media_type: "movie";
  title: string;
  release_date: string;
}

// Specific structure for TV SHOW search results
export interface TMDBTVResult extends TMDBBaseResult {
  media_type: "tv";
  name: string; // show title
  first_air_date: string; // show start year
}

// Union type of movie and TV show results only (persons are excluded)
export type TMDBMediaResult = TMDBMovieResult | TMDBTVResult;

// Response structure returned from the TMDb `/search/multi` endpoint
// Note: TMDb returns search results in pages of 20 items each. Use the `page` param to navigate.
export interface TMDBMultiSearchResponse {
  page: number; // the requested page (`1` by default)
  results: (TMDBMediaResult | any)[]; // up to 20 matching items on this page
  total_pages: number; // number of pages based on total matching items
  total_results: number; // total number of matching items
}

// Note on type vs interface:
// - Use `interface` for extendable object shapes
// - Use `type` for unions and type combinations

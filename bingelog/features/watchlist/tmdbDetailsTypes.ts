// Type definitions for TMDb media details with appended videos and credits (bundle)

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBImagePaths {
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface TMDBDescriptive {
  overview: string | null;
  vote_average: number;
}

/** Movie details */
export interface TMDBMovieDetails extends TMDBImagePaths, TMDBDescriptive {
  id: number;
  title: string;
  release_date: string | null;
  runtime: number | null; // length of the movie in minutes
  genres: TMDBGenre[];
}

/** TV details */
export interface TMDBTVDetails extends TMDBImagePaths, TMDBDescriptive {
  id: number;
  name: string;
  first_air_date: string | null;
  episode_run_time: number[]; // TMDb array of episode lengths
  genres: TMDBGenre[];
}

/** Videos */
export interface TMDBVideoItem {
  key: string; // e.g. YouTube key
  site: "YouTube" | string;
  type: "Trailer" | "Teaser" | string;
  official?: boolean;
  name: string; // video title
}
export interface TMDBVideosAppend {
  results: TMDBVideoItem[];
}

/** Credits (cast only) */
export interface TMDBCastMember {
  id: number;
  name: string; // actor's full name
  character: string; // character played by the actor
  profile_path: string | null; // actor's profile image path
  order?: number; // position in cast order (TMDb uses this to list main actors first)
}
export interface TMDBCreditsAppend {
  cast: TMDBCastMember[];
}

/** Common appended data shared by movie and TV details */
interface TMDBCommonAppends {
  videos: TMDBVideosAppend;
  credits: TMDBCreditsAppend;
}

/** Unified bundle structure returned by the TMDb details fetcher */
export type TMDBMediaDetailsBundle =
  | ({
      mediaType: "movie";
      details: TMDBMovieDetails;
    } & TMDBCommonAppends)
  | ({
      mediaType: "tv";
      details: TMDBTVDetails;
    } & TMDBCommonAppends);

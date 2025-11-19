// Exposes TMDb media details along with videos and credits, providing loading, error, and data states

import { useEffect, useMemo, useState } from "react";
import { fetchMediaDetailsBundle } from "@/features/watchlist/fetchMediaDetailsBundle";
import {
  TMDBMediaDetailsBundle,
  TMDBVideoItem,
} from "@/features/watchlist/tmdbDetailsTypes";

interface Params {
  mediaType: "movie" | "tv";
  tmdbId: number;
}

export const useTmdbMediaDetailsBundle = ({ mediaType, tmdbId }: Params) => {
  const [data, setData] = useState<TMDBMediaDetailsBundle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Choose one YouTube video using TMDb's original order
  // 1) Prefer Trailer, then Teaser
  // 2) If neither exists, use the first YouTube item
  // 3) If no YouTube item exists, return null
  const pickBestYouTubeVideo = (
    videos: TMDBVideoItem[]
  ): TMDBVideoItem | null => {
    if (!Array.isArray(videos) || videos.length === 0) return null;

    // Keep only YouTube videos
    const youTubeVideos = videos.filter((v) => v.site === "YouTube");
    if (youTubeVideos.length === 0) return null;

    // Prefer Trailer or Teaser
    const preferred = youTubeVideos.find(
      (v) => v.type === "Trailer" || v.type === "Teaser"
    );
    if (preferred) return preferred;

    // Fallback: first available YouTube item (TMDb-provided order)
    return youTubeVideos[0] ?? null;
  };

  // After data loads, choose one YouTube video, then expose key and type
  // useMemo ensures this logic only runs again when new TMDb data arrives
  const selectedVideo = useMemo(() => {
    if (!data) return null;
    return pickBestYouTubeVideo(data.videos.results);
  }, [data]);

  const videoKey = selectedVideo?.key ?? null; // YouTube identifier for the chosen video
  const selectedVideoType = selectedVideo?.type ?? null; // e.g. "Trailer" | "Teaser" | "Clip" | ...

  // Load TMDb data when the screen opens, or when mediaType or tmdbId changes
  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const bundle = await fetchMediaDetailsBundle({ mediaType, tmdbId });
        if (!isMounted) return;
        setData(bundle);
      } catch (err) {
        console.error("useTmdbMediaDetailsBundle error:", err);
        if (!isMounted) return;
        setIsError(true);
      } finally {
        if (!isMounted) return;
        setIsLoading(false);
      }
    };

    run();
    return () => {
      isMounted = false;
    };
  }, [mediaType, tmdbId]);

  return {
    data, // { mediaType, details, videos, credits } | null
    videoKey, // string | null (selected video's YouTube key)
    selectedVideoType, // string | null (e.g., "Trailer", "Teaser", "Clip")
    isLoading,
    isError,
  };
};

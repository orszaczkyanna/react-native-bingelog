// Custom hook for fetching and managing the user's watchlist
// Wraps watchlistOperations.ts API calls and provides React state

import { useEffect, useState } from "react";
import {
  getWatchlistItems,
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlistItem,
} from "@/features/watchlist/watchlistOperations";
import { StatusType } from "@/constants/statusOptions";

// Shape of a single watchlist item from backend
export interface UserWatchlistItem {
  tmdb_id: number;
  status: StatusType;
  progress: number | null;
}

export const useWatchlistOperations = () => {
  const [userWatchlist, setUserWatchlist] = useState<UserWatchlistItem[]>([]);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState(false);
  const [isWatchlistError, setIsWatchlistError] = useState(false);

  // Fetch all watchlist items from backend
  const fetchUserWatchlistFromApi = async () => {
    setIsWatchlistLoading(true);
    setIsWatchlistError(false);
    try {
      const watchlistItemsFromApi = await getWatchlistItems();
      setUserWatchlist(watchlistItemsFromApi);
    } catch (error) {
      console.error("Failed to fetch watchlist:", error);
      setIsWatchlistError(true);
    } finally {
      setIsWatchlistLoading(false);
    }
  };

  // Add new item
  const addMediaItemToWatchlist = async (
    tmdb_id: number,
    status: StatusType
  ) => {
    try {
      await addToWatchlist(tmdb_id, status);
      // Update local state
      setUserWatchlist((prevWatchlist) => [
        ...prevWatchlist,
        { tmdb_id, status, progress: null },
      ]);
      console.log(
        `✅ Watchlist: added item ${tmdb_id} with status "${status}"`
      );
    } catch (error) {
      console.error("Failed to add item to watchlist:", error);
      setIsWatchlistError(true);
    }
  };

  // Update item (status or progress)
  const updateMediaItemInWatchlist = async (
    tmdb_id: number,
    updates: { status?: StatusType; progress?: number | null }
  ) => {
    try {
      await updateWatchlistItem(tmdb_id, updates);
      // Update local state
      setUserWatchlist((prevWatchlist) =>
        prevWatchlist.map((watchlistItem) =>
          watchlistItem.tmdb_id === tmdb_id
            ? { ...watchlistItem, ...updates }
            : watchlistItem
        )
      );
      console.log(
        `✅ Watchlist: updated item ${tmdb_id} with changes: ${JSON.stringify(
          updates
        )}`
      );
    } catch (error) {
      console.error("Failed to update item in watchlist:", error);
      setIsWatchlistError(true);
    }
  };

  // Remove item
  const removeMediaItemFromWatchlist = async (tmdb_id: number) => {
    try {
      await removeFromWatchlist(tmdb_id);
      // Update local state
      setUserWatchlist((prevWatchlist) =>
        prevWatchlist.filter(
          (watchlistItem) => watchlistItem.tmdb_id !== tmdb_id
        )
      );
      console.log(`✅ Watchlist: removed item ${tmdb_id}`);
    } catch (error) {
      console.error("Failed to remove item from watchlist:", error);
      setIsWatchlistError(true);
    }
  };

  useEffect(() => {
    fetchUserWatchlistFromApi();
  }, []);

  return {
    userWatchlist,
    isWatchlistLoading,
    isWatchlistError,
    addMediaItemToWatchlist,
    removeMediaItemFromWatchlist,
    updateMediaItemInWatchlist,
    refetchUserWatchlist: fetchUserWatchlistFromApi, // Manual refresh option
  };
};

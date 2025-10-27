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

  // Helper function used by addMediaItemToWatchlist() for updating local state
  // If item exists → update status; If not exists → add it
  const upsertWatchlistItemLocally = (tmdb_id: number, status: StatusType) => {
    setUserWatchlist((previousWatchlist) => {
      const existsLocally = previousWatchlist.some(
        (watchlistItem) => watchlistItem.tmdb_id === tmdb_id
      );

      if (existsLocally) {
        return previousWatchlist.map((watchlistItem) =>
          watchlistItem.tmdb_id === tmdb_id
            ? { ...watchlistItem, status }
            : watchlistItem
        );
      }

      return [...previousWatchlist, { tmdb_id, status, progress: null }];
    });
  };

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

  // Add new item, or update if it already exists
  const addMediaItemToWatchlist = async (
    tmdb_id: number,
    status: StatusType
  ) => {
    try {
      const itemAlreadyInUserWatchlist = userWatchlist.some(
        (watchlistItem) => watchlistItem.tmdb_id === tmdb_id
      );

      if (itemAlreadyInUserWatchlist) {
        await updateWatchlistItem(tmdb_id, { status });
        upsertWatchlistItemLocally(tmdb_id, status);
        console.log(
          `✅ Watchlist: updated item ${tmdb_id} status → "${status}"`
        );
        return;
      }

      await addToWatchlist(tmdb_id, status);
      upsertWatchlistItemLocally(tmdb_id, status);
      console.log(
        `✅ Watchlist: added item ${tmdb_id} with status "${status}"`
      );
    } catch (error: any) {
      if (error?.response?.status === 409) {
        try {
          await updateWatchlistItem(tmdb_id, { status });
          upsertWatchlistItemLocally(tmdb_id, status);
          console.log(
            `✅ Watchlist: updated existing item ${tmdb_id} status → "${status}" (handled 409)`
          );
          return;
        } catch (updateError) {
          console.error(
            "Failed to update item in watchlist after 409 conflict:",
            updateError
          );
          setIsWatchlistError(true);
          return;
        }
      }

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

  // Fetch watchlist items when hook is first used
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

// Centralized API operations for managing the user's watchlist

import { axiosPrivate } from "@/lib/axios";
import { StatusType } from "@/constants/statusOptions";

// Used by updateWatchlistItem() to send only the modified fields (status or progress)
interface UpdateParams {
  status?: StatusType;
  progress?: number | null;
}

// --- GET all media items for the current user ---
export const getWatchlistItems = async (): Promise<
  { tmdb_id: number; status: StatusType; progress: number | null }[]
> => {
  try {
    const response = await axiosPrivate.get("/media/list");
    return response.data.items;
  } catch (error) {
    throw error;
  }
};

// --- ADD media item ---
export const addToWatchlist = async (
  tmdb_id: number,
  status: StatusType
): Promise<void> => {
  try {
    await axiosPrivate.post("/media/add", { tmdb_id, status });
  } catch (error: any) {
    throw error;
    // Note: Do not handle 409 here; let the hook decide how to proceed
  }
};

// --- UPDATE a media item ---
export const updateWatchlistItem = async (
  tmdb_id: number,
  updates: UpdateParams
): Promise<void> => {
  try {
    await axiosPrivate.patch(`/media/update/${tmdb_id}`, updates);
  } catch (error) {
    throw error;
  }
};

// --- DELETE a media item ---
export const removeFromWatchlist = async (tmdb_id: number): Promise<void> => {
  try {
    await axiosPrivate.delete(`/media/delete/${tmdb_id}`);
  } catch (error) {
    throw error;
  }
};

// Render the watchlist action area on Media Details: add to list, or edit status/progress with bottom sheets

import React, { useMemo, useState } from "react";
import { View, Text, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";
import { useWatchlistOperations } from "@/hooks/useWatchlistOperations";
import { StatusType, STATUS_OPTIONS } from "@/constants/statusOptions";
import SecondaryButton from "@/components/SecondaryButton";
import StatusSelectorBottomSheet from "@/components/StatusSelectorBottomSheet";
import ProgressEditorBottomSheet from "@/components/ProgressEditorBottomSheet";

interface Props {
  tmdbId: number;
}

// Find status metadata (label + icon) by a given status value
// Do a lookup in STATUS_OPTIONS so we can show the right text and icon
const getStatusMeta = (
  value: StatusType
): {
  label: string;
  iconName: React.ComponentProps<typeof Feather>["name"];
} => {
  const item = STATUS_OPTIONS.find((o) => o.statusValue === value);
  return {
    label: item?.label ?? "Unknown status",
    iconName: item?.featherIcon ?? "help-circle",
  };
};

// Basic sanitize for free-text progress: remove angle brackets and enforce max length
// Note: The "g" flag makes the regex global, replacing all matches instead of just the first one
const sanitizeProgressInput = (input: string): string =>
  input.replace(/[<>]/g, "").slice(0, 30);

const MediaWatchlistSection = ({ tmdbId }: Props) => {
  // Access user's watchlist state and server operations
  const {
    userWatchlist,
    isWatchlistLoading,
    addMediaItemToWatchlist,
    updateMediaItemInWatchlist,
    removeMediaItemFromWatchlist,
  } = useWatchlistOperations();

  // Check if this TMDb item already exists in user's list
  // Use useMemo so we don't re-find on every render unless inputs change
  const existingWatchlistItem = useMemo(
    () => userWatchlist.find((item) => item.tmdb_id === tmdbId) ?? null,
    [userWatchlist, tmdbId]
  );

  // Local flags to show/hide the two bottom sheets
  const [isStatusSheetVisible, setStatusSheetVisible] = useState(false);
  const [isProgressSheetVisible, setProgressSheetVisible] = useState(false);

  // Build status label and icon for the left side of the card
  const statusLabel = existingWatchlistItem?.status
    ? getStatusMeta(existingWatchlistItem.status).label
    : null;
  const statusIconName = existingWatchlistItem?.status
    ? getStatusMeta(existingWatchlistItem.status).iconName
    : "help-circle";

  // Decide what to show as progress on the right side
  // If no value yet: show a short, clear hint
  const progressPreviewText =
    existingWatchlistItem?.progress &&
    existingWatchlistItem.progress.trim() !== ""
      ? existingWatchlistItem.progress
      : "Add progress";

  // Open sheets from the different tap targets
  const handleOpenStatusSelector = () => setStatusSheetVisible(true);
  const handleEditStatus = () => setStatusSheetVisible(true);
  const handleEditProgress = () => setProgressSheetVisible(true);

  // When a status is chosen in the status sheet:
  // - add or update the item (the hook handles upsert)
  // - close the sheet afterwards
  const handleSelectStatus = async (status: StatusType) => {
    try {
      await addMediaItemToWatchlist(tmdbId, status);
    } finally {
      setStatusSheetVisible(false);
    }
  };

  // When "remove" is tapped in the status sheet, delete the item from the list
  const handleRemoveFromList = async () => {
    try {
      await removeMediaItemFromWatchlist(tmdbId);
    } finally {
      setStatusSheetVisible(false);
    }
  };

  // Save progress text coming from the progress editor sheet
  // - empty or only spaces → store null (clears progress)
  // - otherwise sanitize and send to backend
  const handleSaveProgress = async (rawValue: string | null) => {
    const safeValue =
      rawValue && rawValue.trim().length > 0
        ? sanitizeProgressInput(rawValue.trim())
        : null;

    try {
      await updateMediaItemInWatchlist(tmdbId, { progress: safeValue });
    } finally {
      setProgressSheetVisible(false);
    }
  };

  return (
    <View className="px-4 pb-4">
      {/* While watchlist is loading, show a neutral placeholder with the same height as the card/button */}
      {isWatchlistLoading && (
        <View className="bg-background-input rounded-md px-4 py-4 min-h-16 opacity-60" />
      )}

      {/* Case 1: Item is NOT in the user's list → show a single CTA button to add it */}
      {!isWatchlistLoading && !existingWatchlistItem && (
        <SecondaryButton
          title="Add to My List"
          variant="confirm"
          onPress={handleOpenStatusSelector}
          // Keep height/padding consistent with the in-list card for a stable layout
          pressableClassName="w-full min-h-16 py-4"
        />
      )}

      {/* Case 2: Item IS in the user's list → show a two-sided card (left: status, right: progress) */}
      {!isWatchlistLoading && existingWatchlistItem && (
        <View className="bg-background-input rounded-md px-4 py-4 min-h-16 flex-row items-center justify-between">
          {/* Left half: tap to change status (opens StatusSelectorBottomSheet) */}
          <Pressable
            onPress={handleEditStatus}
            className="flex-1 flex-row items-center gap-3 pr-3 active:opacity-70"
          >
            <Feather
              name={statusIconName}
              size={20}
              color={Colors.foreground.primary}
            />
            <Text className="text-foreground font-nunitoRegular text-base">
              {statusLabel ?? "Status"}
            </Text>
          </Pressable>

          {/* Right half: tap to edit free-text progress (opens ProgressEditorBottomSheet) */}
          <Pressable
            onPress={handleEditProgress}
            className="flex-1 items-end pl-3 active:opacity-70"
          >
            <Text className="text-foreground font-nunitoRegular text-base">
              {progressPreviewText}
            </Text>
          </Pressable>
        </View>
      )}

      {/* Bottom sheet for picking a status; also exposes "Remove from My List" when item exists */}
      <StatusSelectorBottomSheet
        isVisible={isStatusSheetVisible}
        onClose={() => setStatusSheetVisible(false)}
        onSelectStatus={handleSelectStatus}
        onRemove={existingWatchlistItem ? handleRemoveFromList : undefined}
      />

      {/* Bottom sheet for editing progress as plain text (max 30 chars) */}
      <ProgressEditorBottomSheet
        isVisible={isProgressSheetVisible}
        onClose={() => setProgressSheetVisible(false)}
        initialValue={existingWatchlistItem?.progress ?? ""}
        onSave={handleSaveProgress}
      />
    </View>
  );
};

export default MediaWatchlistSection;

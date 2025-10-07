// Status options for movies/shows
// Used to render clickable status icons (e.g. in the Search Results header)

// Allowed status values (must match the database enum exactly)
export type StatusType =
  | "watching"
  | "watched"
  | "to_watch"
  | "on_hold"
  | "abandoned";

// Array of all available status options
// Each option combines the stored value, shown label, and icon
export const STATUS_OPTIONS: Array<{
  statusValue: StatusType; // Internal value, same as stored in the database
  label: string; // Text label shown to the user in the UI
  // Feather icon name associated with the status
  // Type definition ensures only valid Feather icon names can be used
  featherIcon: React.ComponentProps<
    typeof import("@expo/vector-icons/Feather").default
  >["name"];
}> = [
  { statusValue: "watching", label: "Watching", featherIcon: "eye" },
  { statusValue: "watched", label: "Watched", featherIcon: "check-square" },
  { statusValue: "to_watch", label: "To watch", featherIcon: "bookmark" },
  { statusValue: "on_hold", label: "On hold", featherIcon: "pause-circle" },
  { statusValue: "abandoned", label: "Abandoned", featherIcon: "trash-2" },
];

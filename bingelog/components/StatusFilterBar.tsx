// Renders a horizontal row of status icons; supports single-select with toggle off
// Used for filtering search results by status

import React from "react";
import { View, Pressable } from "react-native";
import { STATUS_OPTIONS, StatusType } from "@/constants/statusOptions";
import Feather from "@expo/vector-icons/Feather";
import Colors from "@/constants/Colors";

// Props define the current active status and a callback to update it
interface Props {
  activeStatus: StatusType | null;
  onChange: (nextSelectedStatus: StatusType | null) => void;
}

const StatusFilterBar = ({ activeStatus, onChange }: Props) => {
  // Handle when a status icon is tapped
  const handlePress = (pressedStatus: StatusType) => {
    // If the pressed status equals the active one, clear it;
    // otherwise set pressed as new active
    const nextSelectedStatus =
      activeStatus === pressedStatus ? null : pressedStatus;
    console.log("Selected status:", nextSelectedStatus ?? "none");
    // Send the new updated status back to the parent component
    onChange(nextSelectedStatus);
  };

  return (
    <View className="w-[90vw] flex-row items-center justify-between pt-1 pb-5 border-b border-foreground-divider">
      {/* Render all available status icons */}
      {STATUS_OPTIONS.map(({ statusValue, featherIcon }) => {
        // Helper variable for styling the icon differently if its statusValue matches the activeStatus
        const isSelected = activeStatus === statusValue;
        return (
          <Pressable
            key={statusValue}
            // Update active status when this icon is tapped
            onPress={() => handlePress(statusValue)}
            className={`rounded-full p-3 ${
              isSelected ? "bg-accent" : "bg-background-input"
            }`}
          >
            <Feather
              name={featherIcon}
              size={20}
              color={
                isSelected
                  ? Colors.background.primary
                  : Colors.foreground.primary
              }
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default StatusFilterBar;

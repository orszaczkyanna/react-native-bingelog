// Displays a bottom sheet when the user adds a new item to the watchlist or updates an existing one
// Used for saving the chosen status to the database

import React from "react";
import { View, Text, Pressable } from "react-native";
import Modal from "react-native-modal";
import Feather from "@expo/vector-icons/Feather";
import { StatusType, STATUS_OPTIONS } from "@/constants/statusOptions";
import Colors from "@/constants/Colors";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSelectStatus: (status: StatusType) => void;
  onRemove?: () => void;
}

const StatusSelectorBottomSheet = ({
  isVisible,
  onClose,
  onSelectStatus,
  onRemove,
}: Props) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropColor="black"
      backdropOpacity={0.7}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{ justifyContent: "flex-end", margin: 0 }} // Place modal at the bottom
    >
      <View className="bg-background-input p-12 rounded-t-2xl">
        {/* Close icon */}
        <Pressable
          onPress={onClose}
          className="absolute top-4 right-4 p-2"
          hitSlop={10} // Increase the clickable area by 10px on all sides
        >
          <Feather name="x" size={22} color={Colors.foreground.primary} />
        </Pressable>

        {/* Status options */}
        <View className="gap-8">
          {STATUS_OPTIONS.map(({ label, statusValue, featherIcon }) => (
            <Pressable
              key={statusValue}
              onPress={() => onSelectStatus(statusValue)}
              className="flex-row items-center gap-4"
            >
              <Feather
                name={featherIcon}
                size={24}
                color={Colors.foreground.primary}
              />
              <Text className="text-foreground font-nunitoRegular text-lg">
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Remove option — show only if the item already exists in the user's list */}
        {onRemove && (
          <Pressable
            onPress={onRemove}
            className="flex-row items-center gap-4 mt-10"
          >
            <Feather name="x-circle" size={24} color={Colors.danger} />
            <Text className="text-danger font-nunitoRegular text-lg">
              Remove from My List
            </Text>
          </Pressable>
        )}
      </View>
    </Modal>
  );
};

export default StatusSelectorBottomSheet;

// Edit a free-text progress value in a bottom sheet; allow clearing or saving

import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import Modal from "react-native-modal";
import Colors from "@/constants/Colors";
import SecondaryButton from "@/components/SecondaryButton";
import Feather from "@expo/vector-icons/Feather";

interface Props {
  isVisible: boolean; // Control the sheet visibility from parent
  initialValue?: string; // Pre-fill the input with the current progress (if any)
  onClose: () => void; // Close the sheet without saving
  onSave: (value: string | null) => void; // Return the new value; null means "clear progress"
}

const MAX_LENGTH = 30;

// Keep progress safe and short: remove angle brackets and cap the length
const sanitizeProgressInput = (v: string) =>
  v.replace(/[<>]/g, "").slice(0, MAX_LENGTH);

const ProgressEditorBottomSheet = ({
  isVisible,
  initialValue = "",
  onClose,
  onSave,
}: Props) => {
  // Hold the editable input value
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    // Reset the input when the sheet opens or the initial value changes
    if (isVisible) setValue(initialValue);
  }, [isVisible, initialValue]);

  // Save current input (or clear if empty)
  const handleAdd = () => {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      onSave(null); // Clear progress when nothing is entered
      return;
    }
    onSave(sanitizeProgressInput(trimmed));
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose} // Close when tapping outside
      backdropColor="black"
      backdropOpacity={0.7}
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{ justifyContent: "flex-end", margin: 0 }} // Place modal at the bottom
    >
      {/* Keep bottom sheet visuals consistent across the app */}
      <View className="bg-background-input p-12 rounded-t-2xl">
        {/* Top-right close button */}
        <Pressable
          onPress={onClose}
          className="absolute top-4 right-4 p-2"
          hitSlop={10}
        >
          <Feather name="x" size={22} color={Colors.foreground.primary} />
        </Pressable>

        {/* Title */}
        <Text className="text-foreground font-nunitoSemiBold text-lg mb-4">
          Where did you leave off?
        </Text>

        {/* Free-text input for progress (e.g., "S2E5, 1h 15m") */}
        <TextInput
          value={value}
          onChangeText={(t) => setValue(sanitizeProgressInput(t))} // Sanitize as the user types
          placeholder="S2E5, 1h 15m, or leave blank"
          placeholderTextColor={Colors.foreground.muted}
          className="bg-background-button rounded-md px-4 py-3 mb-6 text-foreground font-nunitoRegular text-base"
          maxLength={MAX_LENGTH} // Enforce DB limit on the client too
          autoCapitalize="none" // Avoid accidental capitalization
          autoCorrect={false} // Do not auto-correct user notation
          returnKeyType="done" // Show "Done" on the keyboard
          onSubmitEditing={handleAdd} // Save when pressing the keyboard's Done key
        />

        {/* Actions: cancel without saving, or add/save current value */}
        <View className="flex-row justify-between">
          <SecondaryButton title="Cancel" variant="neutral" onPress={onClose} />
          <SecondaryButton title="Add" variant="confirm" onPress={handleAdd} />
        </View>
      </View>
    </Modal>
  );
};

export default ProgressEditorBottomSheet;

// Popup modal for showing alert messages that visually fit the app (replaces Alert.alert)

import React from "react";
import { Text, View, Pressable } from "react-native";
import Modal from "react-native-modal";

interface Props {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

const AlertModal = ({ visible, title, message, onClose }: Props) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose} // Close the modal when user taps outside its content
      backdropColor="black"
      backdropOpacity={0.7}
      useNativeDriver // Use the native animation driver for better performance
      useNativeDriverForBackdrop // Enable native animation for the backdrop to prevent flickering on android
      hideModalContentWhileAnimating // Hide content while animating to avoid visual glitches
    >
      <View className="bg-background-input p-6 rounded-lg">
        <Text className="text-title mb-8">{title}</Text>
        <Text className="text-body whitespace-pre-line mb-4">{message}</Text>

        <Pressable onPress={onClose} className="self-end px-6 py-4 rounded-md">
          <Text className="text-accent font-nunitoBold text-base">OK</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default AlertModal;

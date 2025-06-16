// Custom hook to manage alert state with showAlert() and hideAlert()
// Avoids repeating useState logic in every screen

import { useState } from "react";

export const useAlertModal = () => {
  // State for modal visibility and content
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // Show modal with given title and message
  const showAlert = (titleText: string, messageText: string) => {
    setTitle(titleText);
    setMessage(messageText);
    setVisible(true);
  };

  // Hide modal
  const hideAlert = () => {
    setVisible(false);
  };

  // Return modal state and handler functions
  return {
    alertVisible: visible,
    alertTitle: title,
    alertMessage: message,
    showAlert,
    hideAlert,
  };
};

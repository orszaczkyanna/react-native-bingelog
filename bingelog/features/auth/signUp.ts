// Handles user registration logic

import { Alert } from "react-native";
import api from "@/lib/axios";

interface Props {
  username: string;
  email: string;
  password: string;
  onStart: () => void;
  onFinish: () => void;
}

export const handleSignUp = async ({
  username,
  email,
  password,
  onStart,
  onFinish,
}: Props) => {
  const newUser = { username, email, password };

  if (!username || !email || !password) {
    Alert.alert("Warning", "Please fill in all fields");
    return;
  }

  onStart(); // setIsSubmitting(true)

  try {
    // Send POST request to backend registration endpoint
    const response = await api.post("/auth/register", newUser);
    Alert.alert("Success", response.data.message);
  } catch (err: any) {
    // Non-2xx responses are automatically thrown as errors by Axios
    if (err.response) {
      const message = err.response.data?.message || "Invalid input";
      Alert.alert("Warning", message);
    } else {
      // Network error or server unreachable
      console.error("Network or server error:", err.message);
      Alert.alert("Error", "Unable to reach the server");
    }
  } finally {
    onFinish(); // setIsSubmitting(false)
  }
};

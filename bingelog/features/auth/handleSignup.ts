// Handles user registration logic

import { signupSchema } from "./validationSchemas";
import api from "@/lib/axios";

interface Props {
  username: string;
  email: string;
  password: string;
  onStart: () => void;
  onFinish: () => void;
  onAlert: (title: string, message: string) => void;
}

export const handleSignup = async ({
  username,
  email,
  password,
  onStart,
  onFinish,
  onAlert,
}: Props) => {
  const newUser = { username, email, password };

  // Client-side validation using Zod schema
  const validation = signupSchema.safeParse(newUser); // .safeParse() returns success: true/false instead of throwing
  // If validation fails, show all error messages in a popup
  if (!validation.success) {
    const errorMessages = validation.error.errors
      .map((err) => err.message)
      .join("\n\n");
    onAlert("Warning", errorMessages); // ← Alert.alert("Warning", errorMessages);
    return;
  }

  onStart(); // setIsSubmitting(true)

  try {
    // Send POST request to backend registration endpoint
    const response = await api.post("/auth/register", newUser);
    onAlert("Success", response.data.message);
  } catch (err: any) {
    // Non-2xx responses are automatically thrown as errors by Axios
    if (err.response) {
      const message = err.response.data?.message || "Invalid input";
      onAlert("Warning", message);
    } else {
      // Network error or server unreachable
      console.error("Network or server error:", err.message);
      onAlert("Error", "Unable to reach the server");
    }
  } finally {
    onFinish(); // setIsSubmitting(false)
  }
};

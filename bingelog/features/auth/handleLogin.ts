// Handles user login logic

import { loginSchema } from "./validationSchemas";
import api from "@/lib/axios";

interface Props {
  email: string;
  password: string;
  onStart: () => void;
  onFinish: () => void;
  onAlert: (title: string, message: string) => void;
}

export const handleLogin = async ({
  email,
  password,
  onStart,
  onFinish,
  onAlert,
}: Props) => {
  const credentials = { email, password };

  // Client-side validation
  const validation = loginSchema.safeParse(credentials);

  // If validation fails, show only the first error message per field
  if (!validation.success) {
    const firstErrorsByField: Record<string, string> = {}; // e.g., "email": "Email is required"

    // Loop through all validation issues returned by Zod
    // Note: each issue is an object representing a single validation failure, containing details like the field path and error message
    for (const issue of validation.error.errors) {
      const field = issue.path[0]; // e.g., "path": ["email"]

      // Only save the first error per field
      if (!firstErrorsByField[field]) {
        firstErrorsByField[field] = issue.message;
      }
    }

    const combinedMessage = Object.values(firstErrorsByField).join("\n\n");
    onAlert("Warning", combinedMessage);
    return;
  }

  onStart();

  try {
    const response = await api.post("/auth/login", credentials);
    onAlert("Success", response.data.message);
  } catch (err: any) {
    if (err.response) {
      const message = err.response.data?.message || "Something went wrong";
      onAlert("Warning", message);
    } else {
      console.error("Network or server error:", err.message);
      onAlert("Error", "Unable to reach the server");
    }
  } finally {
    onFinish();
  }
};

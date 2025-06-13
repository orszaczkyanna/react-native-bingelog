import { z } from "zod";

// Reusable field-level validation schemas
const usernameSchema = z
  .string()
  .trim()
  .min(1, { message: "Username is required" })
  .max(30, { message: "Username must be at most 30 characters long" });

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Email is required" })
  .email({ message: "Email must be in a valid format" });

const passwordSchema = z
  .string()
  .trim()
  .min(1, { message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
  .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
  .regex(/[0-9]/, { message: "Password must include a number" })
  .regex(
    /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]/, // Standard ASCII symbols (avoids emoji and whitespace)
    { message: "Password must include a special character" }
  );

// Combined form-level validation schemas
export const signupSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Add other schemas as needed:
// export const loginSchema = z.object({ ... });

export type SignupInputType = z.infer<typeof signupSchema>; // Extracts a static TypeScript type from the Zod schema

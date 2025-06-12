import { z } from "zod";

// Sign up form validation schema (client-side only)
export const signUpSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: "Username is required" })
    .max(30, { message: "Username must be at most 30 characters long" }),

  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Email must be in a valid format" }),

  password: z
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
    ),
});

export type SignUpInputType = z.infer<typeof signUpSchema>; // Extracts a static TypeScript type from the Zod schema

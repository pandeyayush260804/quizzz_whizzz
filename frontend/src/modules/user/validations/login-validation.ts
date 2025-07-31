import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export type LoginSchema = z.infer<typeof loginSchema>;

// src/module/user/validations/login-validation.ts
// import { z } from "zod";

// export const loginSchema = z.object({
//   email: z.string().email("Invalid email"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });

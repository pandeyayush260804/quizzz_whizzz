import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().min(1, "Email is required").email("Please enter valid email"),
    password: z.string().min(8, "Password must be minimum 8 characters").max(20, "Password must not be more than 20"),
    name: z.string().min(3, "Min length of name is 3").max(20, "Max length of name is 20")
});


export type RegisterSchema = z.infer<typeof registerSchema>;

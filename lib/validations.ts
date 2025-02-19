import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["COMMON", "ADMIN", "USER", "DPRO", "DALG"]),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

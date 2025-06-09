import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Full name required!" })
    .max(75, { message: "Your name is too long." }),
  email: z
    .string()
    .min(1, { message: "Email required!" })
    .email({ message: "This email is invalid!" }),
  password: z
    .string()
    .min(1, { message: "Password required!" })
    .min(8, { message: "Password must be 8 characters or longer!" })
    .regex(/[a-z]/, {
      message: "Please use at least one lowercase letter!",
    })
    .regex(/[A-Z]/, {
      message: "Please use at least one capital letter!",
    })
    .regex(/[0-9]/, { message: "Please use at least one number!" })
    .regex(/[\W_]/, {
      message: "Please use at least one special character!",
    }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email required!" })
    .email({ message: "This email is invalid!" }),
  password: z.string().min(1, { message: "Password required!" }),
});

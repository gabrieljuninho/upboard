"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn } from "@/auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { loginSchema } from "@/schemas/auth";

import { getUserByEmail } from "@/features/auth/helpers/user";

export const login = async (
  value: z.infer<typeof loginSchema>,
  callBackUrl?: string | null
) => {
  const validatedFields = loginSchema.safeParse(value);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return {
      error: "Invalid credentials",
    };
  }

  if (existingUser.password) {
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return {
        error: "Invalid credentials",
      };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callBackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          };
        default:
          return {
            error: "Something went wrong",
          };
      }
    }

    throw error;
  }
};

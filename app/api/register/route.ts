import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { hashPassword } from "@/lib/hash";

import { signUpSchema } from "@/schemas/auth";

import { getUserByEmail } from "@/features/auth/helpers/user";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const validatedFields = signUpSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { message: "Validation failed. Please check the input fields." },
        {
          status: 400,
        }
      );
    }

    const { name, email, password } = validatedFields.data;

    const existingUserByEmail = await getUserByEmail(email);

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          message:
            "An account with this email already exists. Please use a different email.",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "Account created successfully", data: userWithoutPassword },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
      }
    );
  }
};

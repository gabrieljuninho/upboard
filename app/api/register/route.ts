import { NextRequest, NextResponse } from "next/server";

import { User } from "@/generated/prisma";

import { db } from "@/lib/db";
import { hash } from "@/lib/hash";

import { signUpSchema } from "@/schemas/auth";

import { getUserByEmail } from "@/features/auth/helpers/user";

import { IResponse } from "@/types/api";

type TUserData = Omit<User, "password">;

export const POST = async (
  req: NextRequest
): Promise<NextResponse<IResponse<TUserData>>> => {
  try {
    const body = await req.json();

    const validatedFields = signUpSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({
        status: 400,
        message: "Validation failed",
        error: validatedFields.error.flatten().fieldErrors,
      });
    }

    const { name, email, password } = validatedFields.data;

    const existingUserByEmail = await getUserByEmail(email);

    if (existingUserByEmail) {
      return NextResponse.json({
        status: 409,
        message: "Email is already in use",
      });
    }

    const hashedPassword = await hash(password);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      status: 201,
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({
        status: 500,
        message: error.message,
      });
    }

    return NextResponse.json({
      status: 500,
      message: "Internal server error",
    });
  }
};

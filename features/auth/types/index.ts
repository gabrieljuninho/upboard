import { User } from "@prisma/client";

export interface IUserData {
  name: string;
  email: string;
  password: string;
}

export type TCreateUserResponse = Omit<User, "password">;

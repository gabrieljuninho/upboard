import { api } from "@/lib/api";

import { IUserData, TCreateUserResponse } from "@/features/auth/types";

export const createUser = async (
  userData: IUserData
): Promise<TCreateUserResponse> => {
  const response = await api.post("/api/register", userData);

  return response.data;
};

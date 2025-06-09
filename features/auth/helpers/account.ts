import { Account } from "@prisma/client";

import { db } from "@/lib/db";

export const getAccountByUserId = async (
  userId: string
): Promise<Account | null> => {
  try {
    const account = await db.account.findFirst({
      where: {
        userId,
      },
    });

    return account;
  } catch {
    return null;
  }
};

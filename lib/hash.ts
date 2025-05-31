import bcrypt from "bcryptjs";

export const hash = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  const hashed = await bcrypt.hash(password, salt);

  return hashed;
};

import prisma from "../config/prisma";

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = (data: { email: string; name: string; password: string }) => {
  return prisma.user.create({
    data: {
      ...data,
      createdAt: new Date(),
    },
  });
};

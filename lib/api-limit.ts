import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

import { MAX_FREE_COUNTS } from "@/constants";

export const increaseApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }
  const userApiLimit = await prismadb.userAPiLimit.findUnique({
    where: {
      userId,
    },
  });

  if (userApiLimit) {
    await prismadb.userAPiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismadb.userAPiLimit.create({
      data: { userId: userId, count: 1 },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userAPiLimit = await prismadb.userAPiLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!userAPiLimit || userAPiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();
  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb.userAPiLimit.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};

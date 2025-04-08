import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import type { PrismaClient } from '@prisma/client';

type User = PrismaClient['user']['payload']['default'];
type Profile = PrismaClient['profile']['payload']['default'];
type WaitingList = PrismaClient['waitingList']['payload']['default'];

type CreateUserInput = {
  email: string;
  password?: string;
  name?: string;
  role?: 'USER' | 'ADMIN';
};

type UpdateUserInput = Partial<CreateUserInput>;

type ProfileInput = {
  bio?: string;
  location?: string;
  website?: string;
};

export async function createUser(data: CreateUserInput) {
  if (data.password) {
    data.password = await hash(data.password, 12);
  }
  
  const user = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
  
  return user;
}

export async function updateUser(id: string, data: UpdateUserInput) {
  if (data.password) {
    data.password = await hash(data.password, 12);
  }
  
  const user = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      updatedAt: true,
    },
  });
  
  return user;
}

export async function getUserProfile(userId: string): Promise<(User & { profile: Profile | null }) | null> {
  const profile = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: true,
    },
  });
  
  return profile;
}

export async function updateUserProfile(userId: string, data: ProfileInput): Promise<Profile> {
  const profile = await prisma.profile.upsert({
    where: { userId },
    create: {
      ...data,
      userId,
    },
    update: data,
  });
  
  return profile;
}

export async function addToWaitingList(email: string): Promise<WaitingList> {
  const entry = await prisma.waitingList.create({
    data: {
      email,
    },
  });
  
  return entry;
} 
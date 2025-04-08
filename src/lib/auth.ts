import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { UserRole } from '@prisma/client';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/auth/signin');
  }
  
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  
  if (user.role !== UserRole.ADMIN) {
    redirect('/');
  }
  
  return user;
}

export async function requirePremium() {
  const user = await requireAuth();
  
  if (user.role !== UserRole.PREMIUM && user.role !== UserRole.ADMIN) {
    redirect('/premium');
  }
  
  return user;
} 
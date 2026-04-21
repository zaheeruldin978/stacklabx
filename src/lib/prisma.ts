import { PrismaClient } from '@prisma/client';

// 1. Initialize Prisma Client with optimized logging for debugging
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

// 2. Define a global type to prevent multiple instances during Next.js Hot Reloading
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// 3. Create the singleton instance
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// 4. Ensure the connection is preserved in development
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// Safely type the global object for Next.js Hot Module Replacement
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Initialize the PostgreSQL connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// Export the strictly-typed database client
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter });

// Prevent multiple connections during local development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
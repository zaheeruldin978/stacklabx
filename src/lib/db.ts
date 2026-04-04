import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// 1. Initialize the native Postgres connection pool
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. Attach the Prisma Edge Adapter
const adapter = new PrismaPg(pool);

// 3. Inject the adapter into the Prisma Client
const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prisma ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
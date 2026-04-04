import db from './db';

// This ensures that any old code using 'prisma' now uses the 'db' engine automatically
export const prisma = db;
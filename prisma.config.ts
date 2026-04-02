import { defineConfig } from '@prisma/config';
// We add this to ensure the CLI can see your .env file
import 'dotenv/config'; 

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
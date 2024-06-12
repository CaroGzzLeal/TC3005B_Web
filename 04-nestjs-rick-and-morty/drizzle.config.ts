import { Config } from 'drizzle-kit'

export default {
  schema: './src/database/schema.ts',
  out: './src/drizzle',
  dialect: 'postgresql',
} as Config

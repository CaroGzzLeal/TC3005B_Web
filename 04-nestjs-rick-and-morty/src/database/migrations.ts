import { migrate } from 'drizzle-orm/vercel-postgres/migrator'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import { config } from 'dotenv'
config({ path: '.env' })

const db = drizzle(sql)

export async function main() {
  await migrate(db, {
    migrationsFolder: 'src/drizzle',
  })
}

main()

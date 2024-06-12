'use server'

import { db, favorites } from '@/database/schema'
import { eq } from 'drizzle-orm'

export async function updateFavorites(userId: string, characterId: string) {
  await db
    .update(favorites)
    .set({ characterId })
    .where(eq(favorites.userId, userId))
}

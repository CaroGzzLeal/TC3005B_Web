'use server'

import { db, favorites } from '@/database/schema'
import { eq } from 'drizzle-orm'

export async function updateFavorites(userId: string, characterId: string) {
  const currentFavorites = await db
    .select({ characterId: favorites.characterId })
    .from(favorites)
    .where(eq(favorites.userId, userId))

  let newFavorites: number[] = []
  if (currentFavorites.length > 0 && currentFavorites[0].characterId !== '') {
    newFavorites = currentFavorites[0].characterId
      .split(',')
      .map(Number)
      .filter((id) => !isNaN(id))
  }

  const characterIdNumber = Number(characterId)

  if (newFavorites.includes(characterIdNumber)) {
    newFavorites = newFavorites.filter((id) => id !== characterIdNumber)
  } else {
    newFavorites.push(characterIdNumber)
  }

  const newFavoritesString = newFavorites.join(',')

  try {
    await db
      .update(favorites)
      .set({ characterId: newFavoritesString })
      .where(eq(favorites.userId, userId))

    console.log('Database updated successfully.')
  } catch (error) {
    console.error('Error updating database:', error)
  }
}

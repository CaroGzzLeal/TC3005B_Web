'use server'

import { redirect } from 'next/navigation'
import { Character, CharacterResponse } from '@/app/api/character'
import { db, users, favorites } from '@/database/schema'
import { eq } from 'drizzle-orm'

export async function getUserId(email: string) {
  const checkUser = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))

  return checkUser[0].id
}

export async function loadFavorites(userId: string) {
  const favorite = await db
    .select({ characterId: favorites.characterId })
    .from(favorites)
    .where(eq(favorites.userId, userId))

  if (favorite.length === 0) {
    return []
  }

  if (favorite[0].characterId === '') {
    return []
  }

  return favorite[0].characterId.split(',').map(Number)
}

export async function getCharacters(
  page: number = 1,
): Promise<CharacterResponse> {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`,
  )
  return res.json()
}

export async function getCharacterById(id: number): Promise<Character> {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    if (!res.ok) {
      throw new Error('Failed to fetch character')
    }
    return res.json()
  } catch (error) {
    console.error('Failed to fetch character by ID:', error)
    throw error
  }
}

export async function getCharactersByIds(
  ids: number[],
): Promise<Character[] | Character> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${ids.join(',')}`,
  )
  return response.json()
}

export async function goToCharacters() {
  redirect('/characters')
}

export async function goToFavorites() {
  redirect('/favorites')
}

export async function goToCharacter(id: number) {
  redirect(`/character/${id}`)
}

export async function goToSignIn() {
  redirect(`/`)
}

'use server'

import { redirect } from 'next/navigation'
import { Character, CharacterResponse } from '@/app/api/character'

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
  redirect('/')
}

export async function goToFavorites() {
  redirect('/favorites')
}

export async function goToCharacter(id: number) {
  redirect(`/character/${id}`)
}

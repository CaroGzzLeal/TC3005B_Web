'use client'

import { Character } from '../api/character'
import Image from 'next/image'
import { goToCharacter, getUserId } from '@/actions/actions'
import { updateFavorites } from '@/utils/dbCalls'
import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

export default function CharacterCard({
  character,
  favorites,
}: {
  character: Character
  favorites: number[]
}) {
  const [favorite, setFavorite] = useState<number[]>([])

  useEffect(() => {
    setFavorite(favorites)
  }, [favorites])

  const handleFavorite = async (
    e: React.MouseEvent<HTMLButtonElement>,
    characterId: number,
  ) => {
    e.preventDefault()

    const session = await getSession()
    const userId = await getUserId(session?.user?.email ?? '')

    let newFavorite: number[]

    if (favorite.includes(characterId)) {
      newFavorite = favorite.filter((id) => id !== characterId)
    } else {
      newFavorite = [...favorite, characterId]
    }

    setFavorite(newFavorite)
    await updateFavorites(userId, characterId.toString())
  }

  return (
    <div className='bg-white'>
      <div className='space-x-28'>
        <button
          key={character.id}
          onClick={() => goToCharacter(character.id)}
          className='cursor-pointer overflow-hidden rounded-lg bg-white shadow'
        >
          <Image
            src={character.image}
            alt={character.name}
            className='h-48 w-full object-cover object-center'
            width={300}
            height={300}
          />
        </button>

        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            handleFavorite(e, character.id)
          }}
        >
          <Image
            alt='Favorite'
            src={
              favorite.includes(character.id) ? '/filled_star.png' : '/star.png'
            }
            width={30}
            height={30}
          />
        </button>
      </div>

      <div className='p-4'>
        <h2 className='text-xl font-bold'>{character.name}</h2>
        <p className='text-gray-800'>
          Status: <span className='text-gray-600'>{character.status}</span>
        </p>
        <p className='text-gray-800'>
          Species: <span className='text-gray-600'>{character.species}</span>
        </p>
        <p className='text-gray-800'>
          Gender: <span className='text-gray-600'>{character.gender}</span>
        </p>
        <div className='mt-4 flex'>
          <span className='mr-2 rounded bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-300'>
            {character.origin.name}
          </span>
          <span className='rounded bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-300'>
            {character.location.name}
          </span>
        </div>
      </div>
    </div>
  )
}

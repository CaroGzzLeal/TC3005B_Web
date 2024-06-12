'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getCharacterById } from '@/actions/actions'
import { Character } from './../api/character'

export default function SingleCharacter({
  params,
}: {
  params: { characterId: number }
}) {
  const [character, setCharacter] = useState<Character>()

  useEffect(() => {
    getCharacterById(params.characterId ?? -1)
      .then((data) => setCharacter(data))
      .catch((error) => console.error(error))
  }, [params.characterId])

  if (!character) {
    return <div>Loading character...</div>
  }

  return (
    <>
      <div className='flex flex-col p-5 md:flex-row'>
        <div className='md:flex-1'>
          <Image
            src={character.image}
            alt={character.name}
            className='rounded-lg object-cover object-center'
            width={400}
            height={400}
          />
        </div>
        <div className='md:flex-1 md:pl-4'>
          <h2 className='my-2 text-2xl font-bold'>{character.name}</h2>
          <p className='text-lg'>
            {character.status} - {character.gender}
          </p>
          <p className='mt-1'>Origin: {character.origin.name}</p>
          <p className='mt-1'>Location: {character.location.name}</p>
          <div className='mt-4'>
            <h3 className='mb-2 text-xl font-bold'>Episodes</h3>
            <div className='h-64 overflow-auto'>
              <ul className='list-disc pl-5'>
                {character.episode.map((episode, index) => (
                  <li key={index}>
                    <a
                      href={episode}
                      className='text-blue-600 visited:text-purple-600 hover:text-blue-800'
                    >
                      {episode}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

'use client'

import { getCharactersByIds } from '@/actions/actions'
import { Character } from '../api/character'
import { useState, useEffect } from 'react'
import CharacterCard from '../components/CharacterCard'
import Header from '../components/Header'

export default function Page() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [characters, setCharacters] = useState<Character[] | Character>()
  const [select, setselect] = useState<boolean>(false)

  useEffect(() => {
    const favoritesTemp = localStorage.getItem('favorites')

    if (favoritesTemp != null) {
      setFavorites(JSON.parse(favoritesTemp))
    }
  }, [])

  useEffect(() => {
    if (!select) {
      if (favorites?.length > 0) {
        getCharactersByIds(favorites).then((characters) => {
          if (!Array.isArray(characters)) {
            characters = [characters]
          }

          setCharacters(characters)
          setselect(true)
        })
      }
    } else {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites])

  return (
    <>
      <Header />

      <div className='bg-gray-100'>
        {favorites.length == 0 && (
          <h1 className='ml-5 text-4xl text-black'>
            You have no favorite characters selected
          </h1>
        )}

        {!Array.isArray(characters) && characters != null ? (
          <CharacterCard
            character={characters}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ) : (
          <div className='grid grid-cols-1 gap-4 bg-gray-100 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {characters?.map(
              (character) =>
                favorites.find((id) => id === character.id) && (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    favorites={favorites}
                    setFavorites={setFavorites}
                  />
                ),
            )}
          </div>
        )}
      </div>
    </>
  )
}

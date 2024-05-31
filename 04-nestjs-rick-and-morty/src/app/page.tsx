'use client'

import React, { useEffect, useState } from 'react'
import { getCharacters } from '@/actions/actions'
import { CharacterResponse } from './api/character'
import CharacterCard from './components/CharacterCard'
import Header from './components/Header'
import Pagination from './components/Pagination'

export default function Page() {
  const [characters, setCharacters] = useState<CharacterResponse | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [select, setSelect] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCharacters(page)
        setCharacters(data)
      } catch (error) {
        console.error('Error fetching characters:', error)
      }
    }

    fetchData()
  }, [page])

  useEffect(() => {
    const favorites = localStorage.getItem('favorites')
    if (favorites != null) {
      setFavorites(JSON.parse(favorites))
    }

    setSelect(true)
  }, [])

  useEffect(() => {
    if (select) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites])

  return (
    <>
      <Header />

      <div className='min-h-screen bg-gray-100 p-5'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {characters?.results.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))}
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalPages={characters?.info.pages || 1}
        onPageChange={(page) => setPage(page)}
      />
    </>
  )
}

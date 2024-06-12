import React from 'react'
import { getCharacters, loadFavorites } from '@/actions/actions'

import CharacterCard from '../components/CharacterCard'
import Pagination from '../components/Pagination'
import { getServerSession } from 'next-auth'
import { getUserId } from '@/actions/actions'

export default async function Characters() {
  const session = await getServerSession()
  const userId = await getUserId(session?.user?.email ?? '')
  const favorites = await loadFavorites(userId)
  const characters = await getCharacters(1)

  return (
    <>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {characters?.results.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            favorites={favorites}
          />
        ))}
      </div>

      <Pagination
        currentPage={1}
        totalPages={characters?.info.pages || 1}
        // onPageChange={(page) => setPage(page)}
      />
    </>
  )
}

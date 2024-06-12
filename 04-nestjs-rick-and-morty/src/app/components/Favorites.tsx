import { getCharactersByIds, loadFavorites } from '@/actions/actions'
import CharacterCard from '../components/CharacterCard'
import { getServerSession } from 'next-auth'
import { getUserId } from '@/actions/actions'

export default async function Favorites() {
  const session = await getServerSession()
  const userId = await getUserId(session?.user?.email ?? '')
  const favorites = await loadFavorites(userId)
  const characters = await getCharactersByIds(favorites)

  return (
    <>
      <div className='bg-gray-100'>
        {favorites.length == 0 && (
          <h1 className='ml-5 text-4xl text-black'>
            You have no favorite characters selected
          </h1>
        )}

        {!Array.isArray(characters) && characters != null ? (
          <CharacterCard character={characters} favorites={favorites} />
        ) : (
          <div className='grid grid-cols-1 gap-4 bg-gray-100 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {characters?.map(
              (character) =>
                favorites.find((id) => id === character.id) && (
                  <CharacterCard
                    key={character.id}
                    character={character}
                    favorites={favorites}
                  />
                ),
            )}
          </div>
        )}
      </div>
    </>
  )
}

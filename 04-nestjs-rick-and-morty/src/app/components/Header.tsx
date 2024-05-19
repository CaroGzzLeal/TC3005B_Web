import { goToCharacters, goToFavorites } from '@/actions/actions'

export default function Header() {
  return (
    <header>
      <div className='flex justify-between bg-gray-800 p-4 text-white'>
        <button onClick={() => goToCharacters()} className='mr-auto'>
          Characters
        </button>

        <button onClick={() => goToFavorites()} className='ml-auto'>
          Favorites
        </button>
      </div>
    </header>
  )
}

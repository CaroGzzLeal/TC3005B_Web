import { goToCharacters, goToFavorites } from '@/actions/actions'
import { signIn, signOut, useSession } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'

function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        {session?.user?.name} <br />
        <button className='mx-auto' onClick={() => signOut()}>
          Sign out
        </button>
      </>
    )
  }

  return <button onClick={() => signIn()}>Sign in</button>
}

export default function Header() {
  return (
    <header>
      <div className='flex justify-between bg-gray-800 p-4 text-white'>
        <button onClick={() => goToCharacters()} className='mx-auto'>
          Characters
        </button>

        <button onClick={() => goToFavorites()} className='mx-auto'>
          Favorites
        </button>

        <SessionProvider>
          <AuthButton />
        </SessionProvider>
      </div>
    </header>
  )
}

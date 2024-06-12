'use client'
import { goToCharacters, goToFavorites, goToSignIn } from '@/actions/actions'
import { signOut, useSession } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react'

function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button variant='bordered' className='w-64'>
            {session?.user?.name}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='ml-1 inline size-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m19.5 8.25-7.5 7.5-7.5-7.5'
              />
            </svg>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label='Static Actions'>
          <DropdownItem>
            <button
              className='w-40 rounded-lg border-2 border-blue-500 bg-white hover:bg-blue-600 hover:text-white'
              onClick={() => signOut()}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='mr-1 inline size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75'
                />
              </svg>
              Sign out
            </button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }

  return <button onClick={() => goToSignIn()}>Sign in</button>
}

export default function Header() {
  return (
    <header>
      <div className='flex justify-between bg-gray-800 p-4 text-white'>
        <button onClick={() => goToCharacters()} className='mr-auto'>
          Characters
        </button>

        <button onClick={() => goToFavorites()} className='mr-auto'>
          Favorites
        </button>

        <SessionProvider>
          <AuthButton />
        </SessionProvider>
      </div>
    </header>
  )
}

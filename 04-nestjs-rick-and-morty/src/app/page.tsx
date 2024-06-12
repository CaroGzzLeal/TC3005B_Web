'use client'
import React from 'react'
import { signIn, useSession, SessionProvider } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

function MainPageContent() {
  const { data: session } = useSession()

  if (session) {
    redirect('/characters')
  }

  // Function to handle signing in with GitHub using a popup
  const handleSignInGithub = async (providerId: string) => {
    const result = await signIn(providerId, {
      callbackUrl: '/characters',
      redirect: false,
      windowFeatures: 'width=800,height=600',
    })

    if (result?.url) {
      window.open(result.url, 'GitHubLogin', 'width=800,height=600')
    }

    if (result?.error) {
      console.error('Authentication failed:', result.error)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 p-5'>
      <Image
        src='/rick_morty.webp'
        alt='Rick and Morty'
        className='mx-auto mb-5 mt-10 w-72'
        width={288}
        height={288}
      />
      <h1 className='text-center text-4xl font-bold'>
        Act 04 Next Js Rick & Morty
      </h1>

      <h3 className='text-center'>Carolina González Leal A01284948</h3>

      <div className='mt-5 flex justify-center'>
        <button
          className='flex h-12 w-64 items-center justify-center rounded-lg border-2 border-[#0000001a] bg-[#24292f] px-4 py-3 text-lg text-white transition ease-in-out hover:bg-[#24292fcc]'
          onClick={() => handleSignInGithub('github')}
        >
          <Image
            loading='lazy'
            height='24'
            width='24'
            src='https://authjs.dev/img/providers/github.svg'
            alt='Github Logo'
          />
          <span className='grow'>Sign in with GitHub</span>
        </button>
      </div>
    </div>
  )
}

export default function MainPage() {
  return (
    <SessionProvider>
      <MainPageContent />
    </SessionProvider>
  )
}

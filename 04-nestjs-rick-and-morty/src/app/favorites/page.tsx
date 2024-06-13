import Favorites from '../components/Favorites'
import Header from '../components/Header'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerSession()

  if (!session) {
    redirect('/')
  }
  return (
    <>
      <Header />

      <div className='min-h-screen bg-gray-100 p-5'>
        <Favorites />
      </div>
    </>
  )
}

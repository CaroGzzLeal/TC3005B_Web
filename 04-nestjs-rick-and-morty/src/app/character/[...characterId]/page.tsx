import Header from '../../components/Header'
import SingleCharacter from '@/app/components/SingleCharacter'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function CharacterPage({
  params,
}: {
  params: { characterId: number }
}) {
  const session = await getServerSession()

  if (!session) {
    redirect('/')
  }

  return (
    <>
      <Header />
      <div className='min-h-screen bg-gray-100 p-5'>
        <SingleCharacter params={params} />
      </div>
    </>
  )
}

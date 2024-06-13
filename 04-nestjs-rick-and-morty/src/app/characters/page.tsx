import Header from '../components/Header'
import Characters from '../components/Characters'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { db, favorites } from '@/database/schema'
import { eq } from 'drizzle-orm'
import { getUserId } from '@/actions/actions'

export default async function Page() {
  const session = await getServerSession()

  if (!session) {
    redirect('/')
  }

  if (session) {
    // Check if userId exists in favorites table
    const userId = await getUserId(session?.user?.email ?? '')

    const checkFavorite = await db
      .select({ userId: favorites.userId })
      .from(favorites)
      .where(eq(favorites.userId, userId))

    // If userId does not exist in favorites table, insert userId
    if (checkFavorite.length === 0) {
      await db.insert(favorites).values({
        userId: userId,
        characterId: '',
        created: new Date(),
      })
    }
  }

  return (
    <>
      <Header />

      <div className='min-h-screen bg-gray-100 p-5'>
        <Characters />
      </div>
    </>
  )
}

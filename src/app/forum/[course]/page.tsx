import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React from 'react'
import PostPreview from './PostPreview'
import { getForumPosts } from '@/lib/supabase/forumActions'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { getUserByEmail } from '@/lib/supabase/userActions'

type Props = {
  params: Params
}
export const revalidate = 0;

export default async function page({ params }: Props) {
  const courseName = decodeURI(params.course)
  const posts = await getForumPosts(courseName)
  const session = await getServerSession()
  const user = await getUserByEmail(session?.user?.email)
  console.log(posts)
  return (
    <div className='flex flex-col items-center gap-5'>
      <h1 className='text-3xl'>{courseName}</h1>
      <Link href={`/forum/${courseName}/create`} className='border border-black bg-yellow-500 rounded-sm p-2 text-2xl'>Create post</Link>
      <div className='p-10 w-3/5 flex flex-col items-center gap-5'>
        {posts.map((post) => (
          <PostPreview 
            key={post.id}
            post={post}
            params={params}
            userId={user.id}
          />
        ))}
      </div>
    </div>
  )
}

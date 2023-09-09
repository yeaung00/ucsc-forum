
import { getPost } from '@/lib/supabase/forumActions'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React from 'react'
import PostPreview from '../../PostPreview'
import { getAllComments, insertComment } from '@/lib/supabase/commentActions'
import CommentPreview from './CommentPreview'
import { getUserByEmail } from '@/lib/supabase/userActions'
import { getServerSession } from 'next-auth'
import CommentForm from './CommentForm'

type Props = {
  params: Params
}

export const revalidate = 0;

export default async function page({ params }: Props) {
  const postId = params.postId
  const post = await getPost(postId)
  const comments = await getAllComments(postId)
  const session = await getServerSession()
  const user = await getUserByEmail(session?.user?.email)
  return (
    <div className='flex flex-col items-center p-10'>
      <div className='w-3/5 flex flex-col items-center gap-5'>
        <PostPreview 
          post={post} 
          params={params}
          userId={user.id}
        />
        <CommentForm 
          session={session} 
          postId={postId} 
          params={params}
        />
        <div className='w-full flex flex-col gap-5'>
          {comments.map((comment) => (
            <CommentPreview 
              key={comment.id} 
              comment={comment}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

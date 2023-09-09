'use client'

import { insertComment } from '@/lib/supabase/commentActions'
import { getUserByEmail } from '@/lib/supabase/userActions'
import { Session } from 'next-auth'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

type Props = {
  session: Session | null
  postId: number
  params: Params
}
export default function CommentForm({ session, postId, params }: Props) {
  const [comment, setComment] = useState('')
  const router = useRouter()

  async function submitComment(e: FormEvent) {
    e.preventDefault()
    const user = await getUserByEmail(session?.user?.email)
    const commentData = {
      'body': comment,
      'post_id': postId,
      'author_id': user.id,
      'author_name': user.name,
    }
    console.log(commentData)
    await insertComment(commentData)
    setComment('')
    // router.push(`/forum/${params.course}/${params.postId}/comments`)
  }
  return (
    <div className='w-full'>
      <form onSubmit={submitComment} className='flex flex-col gap-5'>
        <textarea 
          onChange={(e) => setComment(e.target.value)}
          className='w-full border border-black rounded-sm ' 
          name="body" 
          value={comment} 
          placeholder='What are your thoughts?'>  
        </textarea>
        <button className='bg-yellow-500 border border-black p-1 text-lg self-end w-1/4 rounded-sm'>Reply</button>
      </form>
    </div>
  )
}

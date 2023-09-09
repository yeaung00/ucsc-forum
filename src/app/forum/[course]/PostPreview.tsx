import HeartButton from '@/components/HeartButton'
import { Post } from '@/interface/types'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Link from 'next/link'
import React, { useEffect } from 'react'

type Props = {
  post: Post
  params: Params
  userId: number
}

export default function PostPreview({ post, params, userId }: Props) {
  const forumId = params.course
  const bodyText = post.body.length > 100 ? post.body.slice(0, 100) + '...' : post.body
  return (
    <div className='flex flex-col justify-between bg-white border border-black rounded-sm w-full h-80 p-5'>
      <Link href={`/forum/${forumId}/${post.id}/comments`} className='flex flex-col'>
        <div>
          <p className='font-bold text-2xl'>{post.title}</p>
          <p className='mb-5'>Posted by: {post.author_name}</p>
          <p>{bodyText}</p>
        </div>
      </Link>
      <HeartButton 
        postId={post.id} 
        initialLikeCount={post.likes} 
        userId={userId} 
      />
    </div>
    
  )
}

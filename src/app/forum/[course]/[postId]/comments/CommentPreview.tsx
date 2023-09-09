import { CommentData } from '@/interface/types'
import React from 'react'

type Props = {
  comment: CommentData
}
export default function CommentPreview({ comment }: Props) {
  const { author_name, body, likes, created_at } = comment
  const commentDate = new Date(created_at!).toLocaleDateString()

  return (
    <div className='bg-white border border-black p-5'>
      <div className='flex justify-between'>
        <span>{author_name}</span>
        <span>{commentDate.toString()}</span>
      </div>
      <p>{body}</p>
      <p>{likes}</p>
    </div>
  )
}
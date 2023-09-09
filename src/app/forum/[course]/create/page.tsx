import { insertPost } from '@/lib/supabase/forumActions'
import { getUserByEmail } from '@/lib/supabase/userActions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React from 'react'

type Props = {
  params: Params
}
export default async function page({ params }: Props) {
  const courseId = decodeURI(params.course)
  const session = await getServerSession()
  const user = await getUserByEmail(session?.user?.email)

  async function createPost(formData: FormData) {
    'use server'
    const title = formData.get('title') as string
    const body = formData.get('body') as string
    console.log('title and body:', title, body)
    const postFormData = { title, body }
    await insertPost(postFormData, user, courseId)
    redirect(`/forum/${courseId}`)
  }
  return (
    <form className='flex flex-col w-4/5 sm:w-3/5 gap-5 mx-auto' action={createPost}>
      <div className='flex flex-col'>
        <label htmlFor="">Title</label>
        <input className='border border-black rounded-sm p-1 text-lg' name='title' type="text" />
      </div>
      <div className='flex flex-col'>
        <label htmlFor="">Body</label>
        <textarea className='border border-black rounded-sm p-1 text-lg' name='body' />
      </div>
      <div className='flex flex-col'>
        <button className='bg-yellow-500 border border-black rounded-sm p-1 text-lg'>Submit</button>
      </div>
    </form>
  )
}

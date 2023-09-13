'use client'

import { UserCourses } from '@/interface/types';
import {  getUserCourses } from '@/lib/supabase/userActions'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

type Props = {
  user: any
};

export default function CoursesContainer({ user }: Props) {
  const [userCourses, setUserCourses] = useState<UserCourses>()
  useEffect(() => {
    async function initUserCourses() {
      const userCoursesData = await getUserCourses(user.id)
      setUserCourses(userCoursesData)
    }
    initUserCourses()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='flex h-96 w-full overflow-y-auto sm:w-[40em] flex-col sm:flex-row justify-center gap-5'>
      {userCourses?.map((userCourse) => (
        <Link href={`/forum/${userCourse.course_id}`} key={userCourse.course_name} className='bg-white text-3xl basis-1/3 h-40 flex justify-center items-center border border-black rounded-sm '>
          {userCourse.course_name}
        </Link>
      ))}
    </div>
  )
}
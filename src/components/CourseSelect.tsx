'use client'

import { Courses } from "@/interface/types"
import { Dispatch, SetStateAction } from "react"

type Props = {
  courses?: Courses
  setSelectedCourse: Dispatch<SetStateAction<string>>
}

export default function CourseSelect({ courses, setSelectedCourse }: Props) {
  return (
    <div className='w-full sm:w-[40em] border-2 border-black rounded-sm mx-auto'>
      <select onChange={(e) => setSelectedCourse(e.target.value)} className='p-1 w-full' name="" id="">
        {courses?.map((course) => (
          <option key={course.name} value={course.name}>
            {course.name}
          </option>
        ))}
      </select>
    </div>
  )
}

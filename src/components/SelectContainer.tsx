'use client'

import { Courses, Subjects, User } from "@/interface/types";
import SubjectSelect from "./SubjectSelect";
import { FormEvent, useEffect, useState } from "react";
import CourseSelect from "./CourseSelect";
import { getCourses } from "@/lib/catalog";
import { useSession } from "next-auth/react";
import { insertCourse } from "@/lib/supabase/userActions";

type Props = {
  user: User
  subjects: Subjects
}
export default function SelectContainer({ user, subjects }: Props) {
  const session = useSession()
  const [courses, setCourses] = useState<Courses>()
  const [selectedCourse, setSelectedCourse] = useState('ACEN 110A Advanced Academic English 1')

  useEffect(() => {
    async function initCourseData() {
      let courseData = await getCourses('ACEN - Academic English')
      setCourses(courseData)
    }
    initCourseData()
  }, [])
  async function changeSubject(e: FormEvent<EventTarget>) {
    const subject = (e.target as HTMLInputElement).value
    let coursesData = await getCourses(subject)
    setCourses(coursesData)
  }
  async function addCourse() {
    const courseName = selectedCourse
      .split(' ')
      .slice(0, 2)
      .join(' ')
    const courseId = selectedCourse
    await insertCourse(user.id, courseId, courseName)
  }
  return (
    <div className="flex flex-col border mb-10 gap-5">
      <SubjectSelect subjects={subjects} changeSubject={changeSubject}/>
      <CourseSelect courses={courses} setSelectedCourse={setSelectedCourse} />
      <button onClick={addCourse} className="w-full bg-yellow-500 rounded-sm text-black border border-black p-1">Add course</button>
    </div>
  )
}

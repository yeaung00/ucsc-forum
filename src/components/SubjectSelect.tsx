'use client'
import { Subjects } from '@/interface/types'
import React, { FormEvent } from 'react'

type Props = {
  subjects: Subjects
  changeSubject: (e: FormEvent<EventTarget>) => void
}
export default function SubjectSelect({ subjects, changeSubject }: Props) {
  return (
    <div className='w-full sm:w-[40em] border-2 border-black rounded-sm mx-auto'>
      <select onChange={changeSubject} name="" id="" className='p-1 w-full'>
        {subjects.map((subject) => (
          <option 
            key={subject.name} 
            value={subject.name}
          >
            {subject.name}
          </option>
        ))}
      </select>
    </div>
  )
}

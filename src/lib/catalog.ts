import { Courses, Subjects } from "@/interface/types"

export async function getSubjects(): Promise<Subjects> {
  const res = await fetch('https://ucsc-catalog.vercel.app/api/subjects', {
    next: {
      revalidate: 60 * 60 * 24 // revalidate after 24 hours
    }
  })
  
  return res.json()
}

export async function getCourses(subject: string): Promise<Courses> {
  const res = await fetch(`https://ucsc-catalog.vercel.app/api/subjects/${subject}/courses`, {
    next: {
      revalidate: 60 * 60 * 24 // revalidate after 24 hours
    }
  })
  
  return res.json()
}
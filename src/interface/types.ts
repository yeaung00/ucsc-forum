export type Subjects = {
  name: string,
  link: string
}[]

export type Courses = {
  name: string,
  link: string
}[]

export type User = {
  id: number,
  email: string,
  name: string,
  created_at: Date
}

export type UserCourses = {
  user_id: number,
  created_at: Date,
  course_id: string,
  course_name: string
}[]

export type Post = {
  id: number,
  course_forum_id: string,
  author_id: number,
  created_at: Date,
  likes: number,
  title: string,
  body: string,
  author_name: string
}

export type PostFormData = {
  title: string,
  body: string,
}

export type CommentData = {
  id?: number,
  post_id: number,
  created_at?: Date,
  author_id: number,
  author_name: string
  body: string,
  likes?: number,
}
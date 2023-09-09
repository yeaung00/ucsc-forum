import { User, UserCourses } from "@/interface/types";
import { supabase } from "./initSupabase";

type Text = string | null | undefined

export async function insertUser(name: Text, email: Text) {
  const { error } = await supabase
    .from("users")
    .insert({ name, email });

  if (error) {
    throw error;
  }
  console.log(`Added ${email} to database`)
}

export async function getUserByEmail(userEmail: Text): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('email', userEmail)

  if (error) {
    throw(error)
  }
  
  return data.length ? data[0] : null
}

export async function insertCourse(userId: number, courseId: string, courseName: string) {
  const { error } = await supabase
    .from('user_courses')
    .insert({user_id: userId, course_id: courseId,course_name: courseName })

  if (error) {
    throw(error)
  }

  console.log(`Added ${courseName} to userId: ${userId} schedule`)
}

export async function getUserCourses(userId: number): Promise<UserCourses> {
  const { data, error } = await supabase
    .from('user_courses')
    .select()
    .eq('user_id', userId)

  if (error) {
    throw(error)
  }

  return data
}

export async function insertLikedPost(postId: number, userId: number) {
  const { error } = await supabase
    .from('user_post_likes')
    .insert({ 'id': userId, 'post_id': postId })
}
export async function deleteLikedPost(postId: number, userId: number) {
  const { error } = await supabase
    .from('user_post_likes')
    .delete()
    .eq('post_id', postId)
    .eq('id', userId)
}
export async function getUserLikeStatus(postId: number, userId: number) {
  const { data, error } = await supabase
    .from('user_post_likes')
    .select()
    .eq('id', userId)
    .eq('post_id', postId)

  if (error) {
    throw(error)
  }

  return data[0]
}
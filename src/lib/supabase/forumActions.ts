import { Post, PostFormData, User } from "@/interface/types";
import { supabase } from "./initSupabase";
import { getCourses, getSubjects } from "../catalog";

export async function getForumPosts(forumId: string): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select()
    .eq('course_forum_id', forumId)
    .order('created_at', {ascending: true})
  
  if (error) {
    throw(error)
  }

  return data
}
export async function getPost(postId: number) {
  const { data, error } = await supabase
    .from('posts')
    .select()
    .eq('id', postId)
  
  if (error) {
    throw(error)
  }

  return data[0]
}
export async function insertPost(formData: PostFormData, user: User, forumId: string) {
  const { title, body } = formData
  if (!title || !body) {
    throw('Title and body must be filled')
  }
  const { error } = await supabase
    .from('posts')
    .insert({'course_forum_id': forumId, 'author_id': user.id, title, body, 'author_name': user.name})

  if (error) {
    throw(error)
  }

  console.log(`${title} by ${user.name} added to ${forumId}`)
}
export async function addLikes(postId: number, prevLikes: number) {
  const { error } = await supabase
    .from('posts')
    .update({ likes: prevLikes + 1 })
    .eq('id', postId)
  
  if (error) {
    throw(error)
  }
}

export async function subtractLikes(postId: number, prevLikes: number) {
  const { error } = await supabase
  .from('posts')
  .update({ likes: prevLikes - 1 })
  .eq('id', postId)

  if (error) {
    throw(error)
  }
}

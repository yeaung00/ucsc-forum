import { CommentData } from "@/interface/types";
import { supabase } from "./initSupabase";

export async function getAllComments(postId: number): Promise<CommentData[]> {
  const { data, error } = await supabase
    .from('comments')
    .select()
    .eq('post_id', postId)
  
  if (error) {
    throw(error)
  }

  return data
}

export async function insertComment(commentData: CommentData) {
  const { author_name, post_id, body, author_id } = commentData
  const { error } = await supabase
    .from('comments')
    .insert({ 
      post_id,
      author_name,
      body,
      author_id
    })
  
  if (error) {
    throw(error)
  }

  console.log(`${author_name} posted a comment on ${post_id}`)
}
import { supabase } from "@/lib/supabase/initSupabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { forumId, userId, title, body, userName  } = await request.json()
  if (!title || !userId || !body) {
    return NextResponse.json({ message: "Required form input not filled" }, { status: 400 })
  }
  const { error } = await supabase
    .from('posts')
    .insert({
      'course_forum_id': forumId, 
      'author_id': userId, 
      title, 
      body, 
      "author_name": userName 
    })
  
  if (error) {
    throw(error)
  }

  return NextResponse.json({ message: `${title} created by ${userId}` }, { status: 200 })
}
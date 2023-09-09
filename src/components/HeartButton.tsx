'use client'
import { useEffect, useState } from "react"
import AiFillHeart from "../../public/icons/heart"
import { addLikes, getPost, subtractLikes } from "@/lib/supabase/forumActions"
import { deleteLikedPost, getUserByEmail, getUserLikeStatus, insertLikedPost } from "@/lib/supabase/userActions"
import { useSession } from "next-auth/react"
import { AiOutlineHeart } from "react-icons/ai"

type Props = {
  postId: number
  initialLikeCount: number
  userId: number
}

export default function HeartButton({ postId, initialLikeCount, userId }: Props) {
  const [likes, setLikes] = useState(initialLikeCount);
  const [hasUserLiked, setHasUserLiked] = useState<boolean>()

  useEffect(() => {
    async function initUserLikeStatus() {
      const userLikeStatus = Boolean(await getUserLikeStatus(postId, userId))
      setHasUserLiked(userLikeStatus)
    }
    initUserLikeStatus()
  }, [] ) //eslint-disable-line
  useEffect(() => {
    async function updateLikeCount() {
      const post = await getPost(postId)
      const likeCount = post.likes
      setLikes(likeCount)
    }
    updateLikeCount()
  }, [postId])
  async function toggleLikes() {
    setHasUserLiked(!hasUserLiked)
    if (!hasUserLiked) {
      setLikes(likes + 1)
      await addLikes(postId, likes)
      await insertLikedPost(postId, userId)
    }
    else {
      setLikes(likes - 1)
      await subtractLikes(postId, likes)
      await deleteLikedPost(postId, userId)
    }
  }
  return (
    <div className='flex text-2xl'>
      <button onClick={toggleLikes}>
        <div className="flex items-center">
          {hasUserLiked 
            ? <AiFillHeart color='red' />
            : <AiOutlineHeart />}
          <p>{likes}</p>
        </div>
      </button>
    </div>
  )
}

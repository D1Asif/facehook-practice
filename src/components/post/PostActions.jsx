import LikeIcon from "../../assets/icons/like.svg";
import FilledLikeIcon from "../../assets/icons/like-filled.svg";
import CommentIcon from "../../assets/icons/comment.svg";
import ShareIcon from "../../assets/icons/share.svg";
import { useUser } from "../../hooks/useUser";
import { useState } from "react";
import { useAxios } from "../../hooks/useAxios";

export default function PostActions({ commentCount, post }) {
    const { user } = useUser();
    const [isLiked, setIsLiked] = useState(post?.likes.includes(user.id));
    const { api } = useAxios();

    const handleLike = async () => {
        try {
            const response = await api.patch(`${import.meta.env.VITE_SERVER_URL}/posts/${post?.id}/like`);
            if (response.status === 200) {
                setIsLiked(!isLiked);
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
            {/* <!-- Like Button --> */}
            <button
                className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
                onClick={handleLike}
            >
                <img src={isLiked ? FilledLikeIcon : LikeIcon} className="w-6" alt="Like" />
                <span>{isLiked ? "Liked" : "Like"}</span>
            </button>

            {/* <!-- Comment Button --> */}
            <button
                className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm"
            >
                <img src={CommentIcon} alt="Comment" />
                <span>Comment({commentCount})</span>
            </button>
            {/* <!-- Share Button --> */}

            {/* <!-- Like Button --> */}
            <button
                className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm"
            >
                <img src={ShareIcon} alt="Share" />
                <span>Share</span>
            </button>
        </div>
    )
}

import { useState } from "react";
import PostCommentList from "./PostCommentList";
import { useUser } from "../../hooks/useUser";
import { useAxios } from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { actions } from "../../actions";
import AvatarPlaceholder from "../common/AvatarPlaceholder";


export default function PostCommentSection({comments, post}) {
    const [showAllComments, setShowAllComments] = useState(true);
    const {user} = useUser();
    const [commentText, setCommentText] = useState("");
    const {api} = useAxios();
    const {dispatch} = usePost();

    const handleComment = async (event) => {
        const keyCode = event.key;
        if (keyCode === "Enter") {
            setCommentText("");
            dispatch({type: actions.post.DATA_FETCHING});
            try {
                const response = await api.patch(`${import.meta.env.VITE_SERVER_URL}/posts/${post.id}/comment`, {comment: commentText});
                if (response.status === 200) {
                    dispatch({
                        type: actions.post.POST_COMMENT,
                        data: response.data.comments,
                        postId: post.id
                    })
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: actions.post.DATA_FETCH_ERROR,
                    error: err.message
                })
            }
        }
    }

    return (
        <div>
            {/* <!-- comment input box --> */}
            <div className="flex-center mb-3 gap-2 lg:gap-4">
                {user.avatar ? <img
                    className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
                    src={`${import.meta.env.VITE_SERVER_URL}/${user.avatar}`}
                    alt="avatar"
                />: <AvatarPlaceholder />}

                <div className="flex-1">
                    <input
                        type="text"
                        className="h-8 w-full rounded-full bg-lighterDark px-4 focus:outline-none sm:h-[38px]"
                        name="post"
                        id="post"
                        placeholder="What's on your mind?"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onKeyDown={handleComment}
                    />
                </div>
            </div>
            {/* <!-- comment filter button --> */}
            <div className="mt-4">
                <button className="text-gray-300 max-md:text-sm" onClick={() => setShowAllComments(!showAllComments)}>
                    All Comment ▾
                </button>
            </div>
            {showAllComments && <PostCommentList comments={comments} />}
        </div>
    )
}

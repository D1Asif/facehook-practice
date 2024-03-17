import { useState } from "react";
import { useUser } from "../../hooks/useUser"
import ThreeDotsIcon from "../../assets/icons/3dots.svg"
import TimeIcon from "../../assets/icons/time.svg"
import EditIcon from "../../assets/icons/edit.svg"
import DeleteIcon from "../../assets/icons/delete.svg"
import { createPortal } from "react-dom";
import PostEntry from "./PostEntry";
import { usePost } from "../../hooks/usePost";
import { useAxios } from "../../hooks/useAxios";
import { actions } from "../../actions";
import { getFormattedTime } from "../../utils";
import AvatarPlaceholder from "../common/AvatarPlaceholder";


export default function PostHeader({ post }) {
    const { user } = useUser();
    const [isShowActionMenu, setIsShowActionMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { dispatch } = usePost();
    const { api } = useAxios();

    const isMe = post?.author?.id === user?.id;
    const postUser = isMe ? user : post.author;

    const handlePostDelete = async () => {
        setIsShowActionMenu(false);
        dispatch({type: actions.post.DATA_FETCHING});
        try {
            const response = await api.delete(`${import.meta.env.VITE_SERVER_URL}/posts/${post.id}`);
            if (response.status === 200) {
                dispatch({
                    type: actions.post.DATA_DELETE,
                    data: post.id
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

    return (
        <header className="flex items-center justify-between gap-4">
            {/* Author Info */}
            <div className="flex items-center gap-3">
                {postUser?.avatar ? <img
                    className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                    src={`${import.meta.env.VITE_SERVER_URL}/${postUser.avatar}`}
                    alt={post?.author.name}
                /> : <AvatarPlaceholder letter={isMe ? user.firstName[0] : post?.author?.name[0]} />}
                <div>
                    <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
                    <div className="flex items-center gap-1.5">
                        <img src={TimeIcon} alt="time" />
                        <span className="text-sm text-gray-400 lg:text-base"
                        >{getFormattedTime(post?.createAt)}</span>
                    </div>
                </div>
            </div>


            {/* Action dot */}
            {!showModal ? (isMe && <div className="relative">
                <button onClick={() => setIsShowActionMenu(!isShowActionMenu)}>
                    <img src={ThreeDotsIcon} alt="3dots of Action" />
                </button>


                {isShowActionMenu && <div className="action-modal-container">
                    <button className="action-menu-item hover:text-lwsGreen"
                        onClick={() => {
                            setShowModal(true);
                            setIsShowActionMenu(false);
                        }}
                    >
                        <img src={EditIcon} alt="Edit" />
                        Edit
                    </button>
                    <button className="action-menu-item hover:text-red-500"
                        onClick={handlePostDelete}
                    >
                        <img src={DeleteIcon} alt="Delete" />
                        Delete
                    </button>
                </div>}
            </div>) : (
                createPortal(
                    <div className="flex items-center justify-center top-0 bg-black/70 w-full h-full fixed">
                        <PostEntry post={post} onClose={() => setShowModal(false)} />
                    </div>
                    ,
                    document.body
                )
            )}

        </header>
    )
}

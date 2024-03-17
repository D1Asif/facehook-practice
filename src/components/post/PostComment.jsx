import { useUser } from "../../hooks/useUser"
import AvatarPlaceholder from "../common/AvatarPlaceholder";


export default function PostComment({comment}) {
    const {user} = useUser();
    const isMe = comment.author.id === user.id;
    const commentUser = isMe ? user : comment.author;
    return (
        <div  className="flex items-center gap-3 pt-4">
            {commentUser?.avatar ? <img
                className="max-w-6 max-h-6 rounded-full"
                src={`${import.meta.env.VITE_SERVER_URL}/${commentUser?.avatar}`}
                alt="avatar"
            />: <AvatarPlaceholder letter={isMe ? user.firstName[0] : comment?.author?.name[0]} isExtraSmall={true} />}
            <div>
                <div className="flex gap-1 text-xs lg:text-sm">
                    <span className="font-bold">{comment.author.name}</span>
                    <span>{comment.comment}</span>
                </div>
            </div>
        </div>
    )
}

import PostComment from "./PostComment";


export default function PostCommentList({ comments }) {
    return (
        <div className="space-y-4 divide-y divide-lighterDark pl-2 lg:pl-3">
            {
                comments && comments.map((comment) => (
                    <PostComment key={comment.id} comment={comment} />
                ))
            }
        </div>
    )
}

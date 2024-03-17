import PostActions from "./PostActions";
import PostBody from "./PostBody";
import PostCommentSection from "./PostCommentSection";
import PostHeader from "./PostHeader";


export default function Post({post}) {
    return (
        <article className="card mt-6 lg:mt-8">
            <PostHeader post={post} />

            <PostBody post={post} />

            <PostActions commentCount={post?.comments.length} post={post} />

            <PostCommentSection comments={post?.comments} post={post} />
        </article>
    )
}

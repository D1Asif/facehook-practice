import Post from "./Post"


export default function PostList({posts}) {
    if (posts.length === 0) {
        return <h1>No post exists.</h1>
    }
  return (
    posts.map((post) => (
        <Post key={post.id} post={post}/>
    ))
  )
}

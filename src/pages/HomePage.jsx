import { useEffect } from "react";
import { usePost } from "../hooks/usePost";
import { actions } from "../actions";
import { useAxios } from "../hooks/useAxios";
import PostList from "../components/post/PostList";
import NewPost from "../components/post/NewPost";


export default function HomePage() {
  const { state, dispatch } = usePost();
  const { api } = useAxios();

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch({ type: actions.post.DATA_FETCHING });
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/posts`);
        if (response.status === 200) {
          dispatch({
            type: actions.post.DATA_FETCHED,
            data: response.data
          })
        }
      } catch(err) {
        console.error(err);
        dispatch({
          type: actions.post.DATA_FETCH_ERROR,
          error: err.message
        })
      }
    }
    fetchPosts();
  }, [api, dispatch]);

  const posts = state.posts;
  posts.sort((a, b) => (new Date(b.createAt).getTime() - new Date(a.createAt).getTime()));

  return (
    <>
      <NewPost />
      <PostList posts={posts} />
    </>
  )
}

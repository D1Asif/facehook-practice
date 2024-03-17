import { useEffect } from "react";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useProfile } from "../hooks/useProfile";
import { actions } from "../actions";
import { useAxios } from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";
import PostList from "../components/post/PostList";

export default function ProfilePage() {
  const {state, dispatch} = useProfile();
  const {api} = useAxios();
  const {auth} = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch({type: actions.profile.DATA_FETCHING});
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/profile/${auth?.user?.id}`);
        if (response.status === 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data
          })
        }
      } catch(err) {
        console.error(err);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: err.message
        })
      }
    }
    fetchProfile();
  }, []);

  if (state?.loading) {
    return <h1>Fetching data...</h1>
  }

  if (state?.error) {
    return <h1>{state?.error}</h1>
  }

  const posts = state.posts;
  posts.sort((a, b) => (new Date(b.createAt).getTime() - new Date(a.createAt).getTime()));
  return (
    <>
      <ProfileInfo />
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Posts</h4>
      <PostList posts={posts} />
    </>
  )
}

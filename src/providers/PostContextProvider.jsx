import { useReducer } from "react";
import { PostContext } from "../contexts";
import { initialState, postReducer } from "../reducers/postReducer";


export default function PostContextProvider({children}) {
    const [state, dispatch] = useReducer(postReducer, initialState);
  return (
    <PostContext.Provider value={{state, dispatch}}>
        {children}
    </PostContext.Provider>
  )
}

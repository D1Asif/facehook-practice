import { actions } from "../actions"

export const initialState = {
    posts: [],
    loading: false,
    error: null
}

export const postReducer = (state, action) => {
    switch(action.type) {
        case actions.post.DATA_FETCHING:
            return {
                ...state,
                loading: true
            }
        case actions.post.DATA_FETCHED:
            return {
                ...state,
                posts: action.data,
                loading: false,
                error: null
            }
        case actions.post.DATA_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actions.post.DATA_CREATE:
            return {
                ...state,
                loading: false,
                posts: [...state.posts, action.data]
            }
        case actions.post.DATA_UPDATE:
            return {
                ...state,
                loading: false,
                posts: state.posts.map((item) => {
                    if (item.id === action.data.id) {
                        return action.data;
                    }
                    return item
                })
            }
        case actions.post.DATA_DELETE:
            return {
                ...state,
                loading: false,
                posts: state.posts.filter(item => item.id !== action.data)
            }
        case actions.post.POST_COMMENT:
            {
                return {
                    ...state,
                    loading: false,
                    posts: state.posts.map((item)=> {
                        if (item.id === action.postId) {
                            return {
                                ...item,
                                comments: action.data
                            }
                        }
                        return item;
                    })
                }
            }
        default:
            return state;
    }
}

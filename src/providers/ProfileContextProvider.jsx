import { useReducer } from "react";
import { ProfileContext } from "../contexts";
import { initialState, profileReducer } from "../reducers/profileReducer";


export default function ProfileContextProvider({ children }) {
    const [state, dispatch] = useReducer(profileReducer, initialState);
    return (
        <ProfileContext.Provider value={{state, dispatch}}>
            {children}
        </ProfileContext.Provider>
    )
}

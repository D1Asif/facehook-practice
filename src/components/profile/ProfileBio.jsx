import { useState } from "react";
import EditIcon from "../../assets/icons/edit.svg"
import CheckIcon from "../../assets/icons/check.svg"
import { useProfile } from "../../hooks/useProfile"
import { useUser } from "../../hooks/useUser";
import { actions } from "../../actions";
import { useAxios } from "../../hooks/useAxios";

export default function ProfileBio() {
    const { user } = useUser();
    const { dispatch } = useProfile();
    const { api } = useAxios();
    const [isEditing, setIsEditing] = useState(false);
    const [inputText, setInputText] = useState(user?.bio);

    const handleEditClick = () => {
        setIsEditing(true);
    }

    const handleCheckClick = async () => {
        setIsEditing(false);
        try {
            const response = await api.patch(`${import.meta.env.VITE_SERVER_URL}/profile/${user?.id}`, {bio: inputText});
            if (response.data) {
                dispatch({
                    type: actions.profile.DATA_EDITED,
                    data: response.data
                })
            }
        } catch (err) {
            console.error(err);
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: err.message
            })
        }
    }

    return (
        <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
                {
                    isEditing ? (
                        <textarea
                            type="text"
                            className="text-gray-400 lg:text-lg bg-slate-800 p-3 rounded-lg"
                            value={inputText}
                            rows={4}
                            cols={100}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                    ) : (
                        <p className="leading-[188%] text-gray-400 lg:text-lg">
                            {user?.bio}
                        </p>
                    )
                }
            </div>
            <button className="flex-center h-7 w-7 rounded-full"
                onClick={isEditing ? handleCheckClick : handleEditClick}
            >
                <img src={isEditing ? CheckIcon : EditIcon} alt="Edit" />
            </button>
        </div>
    )
}

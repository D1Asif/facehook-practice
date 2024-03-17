import { useProfile } from "../../hooks/useProfile"
import EditIcon from "../../assets/icons/edit.svg"
import { useRef } from "react";
import { useAxios } from "../../hooks/useAxios";
import { actions } from "../../actions";
import { useUser } from "../../hooks/useUser";
import AvatarPlaceholder from "../common/AvatarPlaceholder";

export default function ProfileImage() {
    const { dispatch } = useProfile();
    const imageInputRef = useRef();
    const {api} = useAxios();

    const {user} = useUser();

    const handleEditClick = () => {
        imageInputRef.current.click();
    }

    const handleImageInput = async (event) => {
        const fileList = event.target.files;
        const formData = new FormData();
        formData.append("avatar", fileList[0]);
        dispatch({type: actions.profile.DATA_FETCHING});
        try {
            const response = await api.post(`${import.meta.env.VITE_SERVER_URL}/profile/${user?.id}/avatar`, formData);
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.IMAGE_UPDATED,
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

    return (
        <div
            className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]"
        >
            {user.avatar ? <img
                className="h-[180px] w-[180px] object-cover rounded-full"
                src={`${import.meta.env.VITE_SERVER_URL}/${user?.avatar}`}
                alt={user?.firstName}
            /> : <AvatarPlaceholder isLarge={true} />}

            <button
                className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
                onClick={handleEditClick}
            >
                <img src={EditIcon} alt="Edit" />
                <input 
                    type="file" 
                    ref={imageInputRef}
                    hidden 
                    onChange={handleImageInput} 
                />
            </button>
        </div>
    )
}

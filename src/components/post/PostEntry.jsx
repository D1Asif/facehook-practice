import { useUser } from "../../hooks/useUser"
import AddPhotoIcon from "../../assets/icons/addPhoto.svg";
import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useAxios } from "../../hooks/useAxios";
import { usePost } from "../../hooks/usePost";
import { actions } from "../../actions";


export default function PostEntry({ post, onClose }) {
    const { user } = useUser();
    const { api } = useAxios();
    const {dispatch} = usePost();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const isEditing = post ? true : false;

    const submitCreateNewPost = async (formData) => {
        const htmlFormData = new FormData();
        htmlFormData.append("content", formData.content);
        htmlFormData.append("image", formData.image[0]);
        dispatch({type: actions.post.DATA_FETCHING});
        onClose();
        try {
            const response = await api.post(`${import.meta.env.VITE_SERVER_URL}/posts`, htmlFormData);
            if (response.status === 200) {
                dispatch({
                    type: actions.post.DATA_CREATE,
                    data: response.data
                })
            }
        } catch (err) {
            console.error(err);
            dispatch({
                type: actions.post.DATA_FETCH_ERROR,
                error: err.message
            })
        }
    }

    const submitSaveEditPost = async (formData) => {
        console.log(formData);
        const htmlFormData = new FormData();
        htmlFormData.append("content", formData.content);
        dispatch({type: actions.post.DATA_FETCHING});
        onClose();
        try {
            const response = await api.patch(`${import.meta.env.VITE_SERVER_URL}/posts/${post.id}`, htmlFormData);
            if (response.status === 200) {
                dispatch({
                    type: actions.post.DATA_UPDATE,
                    data: response.data
                })
            }
        } catch (err) {
            console.error(err);
            dispatch({
                type: actions.post.DATA_FETCH_ERROR,
                error: err.message
            })
        }
    }

    return (
        <div className="card relative w-3/4">
            <button
                className="absolute top-4 right-5 p-2 bg-gray-800 rounded-lg hover:bg-gray-900"
                onClick={onClose}
            >
                ❌
            </button>
            <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
                Create Post
            </h6>

            <form
                onSubmit={handleSubmit(isEditing ? submitSaveEditPost : submitCreateNewPost)}
            >
                <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
                    <div className="flex items-center gap-3">
                        <img className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                            src={`${import.meta.env.VITE_SERVER_URL}/${user.avatar}`} alt="avatar" />
                        <div>
                            <h6 className="text-lg lg:text-xl">{user.firstName} {" "} {user.lastName}</h6>

                            <span className="text-sm text-gray-400 lg:text-base">Public</span>
                        </div>
                    </div>

                    <label className="btn-primary cursor-pointer !text-gray-100" htmlFor="image">
                        <img src={AddPhotoIcon} alt="Add Photo" />

                        Add Photo
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        hidden
                        {...register("image")}
                    />
                </div>
                {/* <!-- Post Text Input --> */}

                <Field error={errors.content}>
                    <textarea
                        name="content"
                        id="content"
                        placeholder="Share your thoughts..."
                        className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[140px]"
                        defaultValue={isEditing ? post.content : ""}
                        {...register("content", {
                            required: "Adding some text is mandatory"
                        })}
                    />
                </Field>

                <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
                    <button className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                        type="submit">
                        {isEditing ? "Save" : "Post"}
                    </button>
                </div>
            </form>
        </div>
    )
}

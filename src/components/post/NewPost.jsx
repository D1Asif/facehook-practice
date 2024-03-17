import { useState } from "react";
import { useUser } from "../../hooks/useUser"
import { createPortal } from "react-dom";
import PostEntry from "./PostEntry";
import AvatarPlaceholder from "../common/AvatarPlaceholder";

export default function NewPost() {
    const { user } = useUser();
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            {
                !showModal ? (
                    <div className="card">
                        <div className="flex-center mb-3 gap-2 lg:gap-4">
                            {user.avatar ? <img className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
                                src={`${import.meta.env.VITE_SERVER_URL}/${user.avatar}`} alt="avatar" /> : <AvatarPlaceholder />}

                            <div className="flex-1">
                                <textarea
                                    className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                                    name="post"
                                    id="post"
                                    placeholder="What's on your mind?"
                                    onClick={() => setShowModal(true)}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    createPortal(
                        <div className="flex items-center justify-center top-0 bg-black/70 w-full h-full fixed">
                            <PostEntry onClose={() => setShowModal(false)} />
                        </div>
                        ,
                        document.body
                    )
                )
            }
        </>

    )
}

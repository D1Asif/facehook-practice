

export default function PostBody({post}) {
    return (
        <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
            <p className="mb-2">
                {post?.content}
            </p>

            {/* <!-- If Post has Image, Render this block --> */}
           {post?.image && <div className="flex items-center justify-center overflow-hidden">
                <img
                    className="max-w-full"
                    src={`${import.meta.env.VITE_SERVER_URL}/${post?.image}`}
                    alt="poster"
                />
            </div>}
        </div>
    )
}

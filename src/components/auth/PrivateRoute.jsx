import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"
import Header from "../common/Header";
import ProfileContextProvider from "../../providers/ProfileContextProvider";
import PostContextProvider from "../../providers/PostContextProvider";


export default function PrivateRoute() {
    const { auth } = useAuth();
    return (
        <>
            {
                auth?.authToken ? (
                    <>
                        <ProfileContextProvider>
                            <PostContextProvider>
                                <Header />
                                <main className="mx-auto max-w-[1020px] py-8">
                                    <div className="container">
                                        <Outlet />
                                    </div>
                                </main>
                            </PostContextProvider>
                        </ProfileContextProvider>
                    </>
                ) : (
                    <Navigate to="/login" />
                )
            }
        </>
    )
}

import LogoutIcon from "../../assets/icons/logout.svg";
import { useAuth } from "../../hooks/useAuth";

export default function Logout() {
    const {setAuth} = useAuth();
    return (
        <button className="icon-btn" onClick={() => setAuth({})}>
            <img src={LogoutIcon} alt="Logout" />
        </button>
    )
}

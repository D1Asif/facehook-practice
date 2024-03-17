import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";


export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const submitForm = async (formData) => {
        console.log(formData);
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, formData);
            if (response.status === 200) {
                console.log(response.data);
                const {user, token} = response.data;
                const authToken = token.token;
                const refreshToken = token.refreshToken;
                setAuth({user, authToken, refreshToken});
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            console.log("called");
            setError("roots.random", {
                type: "random",
                message: err.message
            })
        }

    }

    return (
        <form className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
            onSubmit={handleSubmit(submitForm)}
        >
            <Field label="Email" error={errors.email}>
                <input
                    className="auth-input"
                    name="email"
                    type="email"
                    id="email"
                    {...register("email", {
                        required: "Email is required"
                    })}
                />
            </Field>
            <Field label="Password" error={errors.password}>
                <input
                    className="auth-input"
                    name="password"
                    type="password"
                    id="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be minimum 8 characters"
                        }
                    })}
                />
            </Field>
            {errors?.roots?.random?.message && <p className="text-red-500 py-1 text-lg">Invalid login. {errors?.roots?.random?.message}</p>}
            <button
                className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
                type="submit"
            >
                Login
            </button>
        </form>
    )
}

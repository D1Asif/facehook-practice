import { useForm } from "react-hook-form";
import Field from "../common/Field";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const navigate = useNavigate();

  const formSubmit = async (formData) => {
    console.log(formData);
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, formData);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("roots.random", {
        type: "random",
        message: err.message
      })
    }
  }

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
      onSubmit={handleSubmit(formSubmit)}
    >
      <Field label="First Name" error={errors.firstName}>
        <input
          className="auth-input"
          name="firstName"
          type="text"
          id="firstName"
          {...register("firstName", {
            required: "First name is required"
          })}
        />
      </Field>
      <Field label="Last Name" error={errors.lastName}>
        <input
          className="auth-input"
          name="lastName"
          type="text"
          id="lastName"
          {...register("lastName")}
        />
      </Field>
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
      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Register
      </button>
    </form>
  )
}

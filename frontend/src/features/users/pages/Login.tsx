import { NavLink, NavigateFunction, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getLogedUser, getToken } from "../api"
import { User } from "../models"

function Login({
  onLogin,
}: {
  onLogin: React.Dispatch<React.SetStateAction<User | null>>
}) {
  const navigate: NavigateFunction = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(
      Array.from(new FormData(e.currentTarget)).map(([name, value]) => [
        name,
        value.toString(),
      ])
    )
    try {
      const response = await getToken(formData.username, formData.password)
      if (response.token) {
        localStorage.setItem("token", response.token)
        const user = await getLogedUser()
        if (user) {
          onLogin(user)
          navigate("/")
        } else {
          toast.error("Invalid username or password")
        }
        toast.success("Logged in successfully")
      } else {
        toast.error("Invalid username or password")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="flex justify-center my-8">
      <form onSubmit={handleSubmit} className="card w-1/2 bg-base-300 p-5">
        <h2 className="text-center font-bold text-2xl mb-4">
          🪵 Login to the website
        </h2>
        <p className="text-center mb-4">
          <strong>Login</strong> to your account to access all the features and
          content.
          <br />
          Don't have an account ? Click{" "}
          <NavLink to="/register" className="link hover:link-primary">
            here
          </NavLink>
        </p>
        <label className="input input-bordered flex items-center gap-2 mb-2">
          <i className="bi bi-envelope-fill"></i>
          <input
            type="text"
            className="grow"
            name="username"
            placeholder="Username"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-12">
          <i className="bi bi-key-fill"></i>
          <input
            type="password"
            className="grow"
            name="password"
            placeholder="Password"
          />
        </label>
        <button className="btn btn-primary btn-block w-full" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login

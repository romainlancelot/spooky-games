import { NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import { registerUser } from "../api"
import { User } from "../models"

function Signup() {
  const confirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = document.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement
    if (e.target.value !== password.value) {
      document.getElementById("password_confirm_error")!.textContent =
        "Passwords do not match."
    } else {
      document.getElementById("password_confirm_error")!.textContent = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget))
    try {
      await registerUser(formData as unknown as User)
      toast.success("Account created successfully. Please login.")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="flex justify-center my-8">
      <form onSubmit={handleSubmit} className="card p-5 w-1/2 bg-base-300">
        <h2 className="text-center font-bold text-2xl mb-4">
          🤘 Create an account
        </h2>
        <p className="text-center mb-4">
          <strong>Signup</strong> to create an account and get started with our
          services. <br />
          Already have an account ? Click{" "}
          <NavLink to="/login" className="link hover:link-primary">
            here
          </NavLink>
        </p>
        <label className="input input-bordered flex items-center gap-2 mb-2">
          <i className="bi bi-person-fill"></i>
          <input type="text" name="username" placeholder="Username" />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
          <label className="input input-bordered flex items-center gap-2">
            <i className="bi bi-person-fill"></i>
            <input type="text" name="first_name" placeholder="Firstname" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <i className="bi bi-person-fill"></i>
            <input type="text" name="last_name" placeholder="Lastname" />
          </label>
        </div>
        <label className="input input-bordered flex items-center gap-2 mb-2">
          <i className="bi bi-envelope-fill"></i>
          <input type="text" name="email" placeholder="Email" />
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
          <label className="input input-bordered flex items-center gap-2">
            <i className="bi bi-key-fill"></i>
            <input type="password" name="password" placeholder="Password" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <i className="bi bi-key-fill"></i>
            <input
              type="password"
              name="password_confirm"
              placeholder="Password confirm"
              onChange={confirmPassword}
            />
          </label>
        </div>
        <div
          id="password_confirm_error"
          className="text-xs text-error mb-12"
        ></div>
        <button className="btn btn-primary btn-block w-full" type="submit">
          Signup
        </button>
        <p className="text-center mt-2 text-sm">
          By signing up, you agree to our Terms, Data Policy and Cookies Policy.
        </p>
      </form>
    </div>
  )
}

export default Signup

import { toast } from "react-toastify"
import { User } from "../models"
import { updateLoggedUser } from "../api"

export function ModifyForm({
  user,
  setUser,
}: {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return
    setUser({ ...user, [e.target.name]: e.target.value })
  }

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
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries())
    if (!formData.password) {
      delete formData.password
    }
    try {
      await updateLoggedUser(formData as unknown as User)
      toast.success("Account updated successfully.")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-center mb-8"></p>
      <label className="input input-bordered flex items-center gap-2 mb-2">
        <i className="bi bi-person-fill"></i>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="grow"
          value={user?.username}
          onChange={handleChange}
        />
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
        <label className="input input-bordered flex items-center gap-2">
          <i className="bi bi-person-fill"></i>
          <input
            type="text"
            name="first_name"
            placeholder="Firstname"
            value={user?.first_name}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <i className="bi bi-person-fill"></i>
          <input
            type="text"
            name="last_name"
            placeholder="Lastname"
            value={user?.last_name}
            onChange={handleChange}
          />
        </label>
      </div>
      <label className="input input-bordered flex items-center gap-2 mb-2">
        <i className="bi bi-envelope-fill"></i>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={user?.email}
          onChange={handleChange}
        />
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
      <div className="flex justify-center">
        <button className="btn btn-primary btn-block w-1/2" type="submit">
          Update
        </button>
      </div>
    </form>
  )
}

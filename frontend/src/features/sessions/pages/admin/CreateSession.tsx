import { NavLink } from "react-router-dom"
import { toast } from "react-toastify"
import { createSession } from "../../api"
import { useNavigate, NavigateFunction } from "react-router-dom"
import { useState } from "react"

export function CreateSession() {
  const [image, setImage] = useState<File | null>(null)
  const navigate: NavigateFunction = useNavigate()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.delete("image")
    if (image) {
      formData.append("image", image)
    }
    try {
      await createSession(formData)
      navigate("/admin/sessions")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="card p-5 w-1/2 bg-base-300"
        encType="multipart/form-data"
      >
        <h2 className="text-center font-bold text-2xl mb-4">
          🤘 Create a session
        </h2>
        <NavLink
          to="/admin/sessions"
          className="btn btn-secondary btn-block mb-4"
        >
          Go back
        </NavLink>
        <label className="input input-bordered flex items-center gap-2 mb-2">
          <i className="bi bi-person-fill"></i>
          <input type="text" name="name" placeholder="Name" />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="file"
            name="image"
            className="file-input w-full"
            onChange={handleImageChange}
          />
          <label className="input input-bordered flex items-center w-full gap-2 mb-2">
            <i className="bi bi-person-fill"></i>
            <input type="number" name="max_players" placeholder="Max Players" />
          </label>
        </div>
        <label className="input input-bordered flex items-center gap-2 mb-2">
          <i className="bi bi-person-fill"></i>
          <input type="text" name="description" placeholder="Description" />
        </label>
        <button className="btn btn-primary btn-block w-full" type="submit">
          Create session
        </button>
      </form>
    </div>
  )
}

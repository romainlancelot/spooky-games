import { NavLink, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { getSession, updateSession } from "../../api"
import { useNavigate, NavigateFunction } from "react-router-dom"
import { useEffect, useState } from "react"
import { SessionsProps } from "../../model"

export function EditSession() {
  const session_id: number = Number(useParams().id)
  const [session, setSession] = useState<SessionsProps | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    getSession(session_id)
      .then((data) => setSession(data))
      .catch(() => {
        setSession(null)
        navigate("/admin/sessions")
        toast.error("Failed to fetch session")
      })
  }, [session_id, navigate])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (session) {
      setSession({ ...session, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.delete("image")
    if (image) {
      formData.append("image", image)
    }
    await updateSession(formData, session_id)
      .then(() => {
        toast.success("Session updated successfully")
        navigate("/admin/sessions")
      })
      .catch(() => toast.error("Failed to update session"))
  }

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="card p-5 w-1/2 bg-base-300"
        encType="multipart/form-data"
      >
        <h2 className="text-center font-bold text-2xl mb-4">
          🤘 Modify the "{session?.name}" session
        </h2>
        <NavLink
          to="/admin/sessions"
          className="btn btn-secondary btn-block mb-4"
        >
          Go back
        </NavLink>
        <img
          src={session?.image}
          alt={session?.name}
          className="mb-4 object-cover w-1/2 w-full rounded-xl"
        />

        <label className="input input-bordered flex items-center gap-2 mb-2">
          <i className="bi bi-person-fill"></i>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={session?.name}
            onChange={handleChange}
          />
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
            <input
              type="number"
              name="max_players"
              placeholder="Max Players"
              value={session?.max_players}
              onChange={handleChange}
            />
          </label>
        </div>
        <textarea
          className="textarea textarea-bordered mb-2 h-48"
          name="description"
          placeholder="Description"
          value={session?.description}
          onChange={handleChange}
        />
        <button className="btn btn-primary btn-block w-full" type="submit">
          Update session
        </button>
      </form>
    </div>
  )
}

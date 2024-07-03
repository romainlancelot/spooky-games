import { useEffect, useState } from "react"
import { User } from "../models"
import React from "react"
import { updateUser } from "../api"
import { toast } from "react-toastify"

export function UserForm({
  user,
  setUsers,
}: {
  user: User
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}) {
  const [copiedUser, setCopiedUser] = useState(user)

  useEffect(() => {
    setCopiedUser(user)
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCopiedUser({ ...copiedUser, [e.target.name]: e.target.value })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCopiedUser({ ...copiedUser, [e.target.name]: e.target.checked })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries())
    try {
      await updateUser(copiedUser.id, {
        ...copiedUser,
        ...formData,
        is_staff: formData.is_staff === "on",
        is_superuser: formData.is_superuser === "on",
      })
      setUsers((users) =>
        users.map((u) => (u.id === copiedUser.id ? copiedUser : u))
      )
      toast.success("Account updated successfully.")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-control mt-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <label className="input input-bordered flex items-center gap-2">
          First name
          <input
            type="text"
            name="first_name"
            className="grow"
            value={copiedUser.first_name}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Last name
          <input
            type="text"
            name="last_name"
            className="grow"
            value={copiedUser.last_name}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input
            type="text"
            name="email"
            className="grow"
            value={copiedUser.email}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Username
          <input
            type="text"
            name="username"
            className="grow"
            value={copiedUser.username}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="flex gap-4">
        <input
          type="checkbox"
          name="is_staff"
          checked={copiedUser.is_staff}
          onChange={handleCheckboxChange}
        />
        <label className="label">Staff</label>
        <br />
        <input
          type="checkbox"
          name="is_superuser"
          checked={copiedUser.is_superuser}
          onChange={handleCheckboxChange}
        />
        <label className="label">Superuser</label>
      </div>
      <button className="btn btn-primary" type="submit">
        Save
      </button>
    </form>
  )
}

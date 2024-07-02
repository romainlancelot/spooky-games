import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import UserForm from "./components/UserForm"

function AdminUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  let limit = 15
  const [nextUrl, setNextUrl] = useState<string | undefined>(undefined)
  const [previousUrl, setPreviousUrl] = useState<string | undefined>(undefined)
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    getData()
  }, [])

  const getData = async (url: string | undefined = undefined) => {
    const finalUrl = url
      ? url
      : "/api/v1/users?" +
        new URLSearchParams({
          limit: limit.toString(),
          ordering: "-created_at",
          username: search,
        })

    try {
      const reponse = await fetch(finalUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const data = await reponse.json()
      if (data.results.length === 0) return
      setUsers(data.results)
      setNextUrl(data.next?.split(".fr")[1])
      setPreviousUrl(data.previous?.split(".fr")[1])
    } catch (error) {
      toast.error("❌ Something went wrong. " + error)
    }
  }

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>, user: User) => {
    if (e.target.checked) {
      setSelectedUsers([...selectedUsers, user])
    } else {
      setSelectedUsers(
        selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
      )
    }
  }

  const deleteUser = () => {
    selectedUsers.forEach((user) => {
      try {
        fetch(`/api/v1/users/${user.id}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then((response) => {
          if (response.ok) {
            toast.success("User deleted successfully!")
            setUsers(users.filter((u) => u.id !== user.id))
          }
        })
      } catch (error) {
        toast.error("❌ Something went wrong. " + error)
      }
    })
  }

  const updateUser = async (updatedUser: User) => {
    try {
      const response = await fetch(`/api/v1/users/${updatedUser.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedUser),
      })
      const data = await response.json()
      if (response.ok) {
        setUsers(
          users.map((user) => {
            if (user.id === updatedUser.id) {
              return updatedUser
            }
            return user
          })
        )
        toast.success("User updated successfully")
      } else {
        toast.error("Something went wrong.")
        Object.keys(data).forEach((key) => {
          toast.error(`${key}: ${data[key]}`)
        })
      }
    } catch (error) {
      toast.error("❌ Something went wrong. " + error)
    }
  }

  const handleNext = () => {
    getData(nextUrl)
  }

  const handleLast = () => {
    getData(previousUrl)
  }

  const handleLimit = (value: number) => {
    limit = value
    getData()
  }

  const displayLimit = () => {
    const limits = [5, 10, 15, 20, 25]
    return limits.map((limit) => {
      return (
        <option key={limit} value={limit} onClick={() => handleLimit(limit)}>
          {limit}
        </option>
      )
    })
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    getData()
  }

  const displayActionsButton = () => {
    return (
      <div className="flex justify-end gap-3">
        <input
          type="text"
          className="input input-bordered w-full mb-2 sm:mb-0"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
        <button
          className="btn btn-error"
          disabled={!selectedUsers.length}
          onClick={deleteUser}
        >
          Delete
        </button>
        <select
          className="select w-full max-w-xs mb-4 select-bordered"
          defaultValue={limit.toString()}
        >
          {displayLimit()}
        </select>
      </div>
    )
  }

  const displayUsers = users.map((user) => {
    return (
      <tr key={user.id}>
        <th>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => handleSelect(e, user)}
            />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src="" alt="Profile picture" />
              </div>
            </div>
            <div>
              <div className="font-bold">
                {user.first_name} {user.last_name}
              </div>
              <div className="text-sm opacity-50">{user.username}</div>
            </div>
          </div>
        </td>
        <td>
          {user.email}
          <br />
          <span className="badge badge-ghost badge-sm mr-1">
            {user.is_superuser ? "Superuser" : user.is_staff ? "Staff" : "User"}
          </span>
          <span className="badge badge-ghost badge-sm">
            {user.is_verified ? "Verified" : "Not verified"}
          </span>
        </td>
        <td>{user.date_joined.split("T")[0]}</td>
        <td>{user.updated_at.split("T")[0]}</td>
        <td className="flex gap-1">
          <button
            className="btn btn-sm"
            onClick={() =>
              (
                document.getElementById(
                  `my_modal_${user.id}`
                ) as HTMLDialogElement
              )?.showModal()
            }
          >
            Edit
          </button>
          <dialog id={`my_modal_${user.id}`} className="modal">
            <div className="modal-box w-11/12 max-w-5xl">
              <h3 className="font-bold text-lg">
                Edit user: {user.first_name} {user.last_name}
              </h3>
              <UserForm user={user} onSubmit={updateUser} />
              <p className="text-sm text-center mt-2">Press "Esc" to close.</p>
            </div>
          </dialog>
          <button className="btn btn-sm">Details</button>
        </td>
      </tr>
    )
  })

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-10">Manage users</h1>
      {displayActionsButton()}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>👤 Name & username</th>
              <th>📬 E-mail</th>
              <th>📅 Date joined</th>
              <th>🕒 Updated at</th>
              <th>✏️ Actions</th>
            </tr>
          </thead>
          <tbody>{displayUsers}</tbody>
        </table>
      </div>
      <div className="join pt-4 flex justify-center mt-8">
        <div className="join grid grid-cols-2">
          <button
            className="join-item btn btn-outline"
            onClick={handleLast}
            disabled={!previousUrl}
          >
            Previous
          </button>
          <button
            className="join-item btn btn-outline"
            onClick={handleNext}
            disabled={!nextUrl}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers

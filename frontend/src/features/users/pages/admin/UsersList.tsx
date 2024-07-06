import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { deleteUser, getAllUsers } from "../../api"
import { User } from "../../models"
import { UserForm } from "../../components/UserForm"
import ReactPaginate from "react-paginate"

export function UsersList() {
  const baseUrl: string = "/api/admin/users/"
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [search, setSearch] = useState<string>("")

  const [data, setData] = useState<User[]>([])
  const [offset, setOffset] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const currentData = data.slice(offset, offset + itemsPerPage)
  const pageCount = Math.ceil(data.length / itemsPerPage)

  useEffect(() => {
    getData(baseUrl)
  }, [])

  const getData = async (url: string) => {
    await getAllUsers(url)
      .then((users) => setData(users))
      .catch(() => toast.error("Failed to fetch users"))
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

  const deleteSelectedUsers = async () => {
    for (const user of selectedUsers) {
      await deleteUser(user.id)
        .then(() => {
          setData(data.filter((u) => u.id !== user.id))
          setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id))
        })
        .catch(() =>
          toast.error(`Failed to delete ${user.first_name} ${user.last_name}`)
        )
    }
    toast.success(`Deleted ${selectedUsers.length} users`)
  }

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    await getData(baseUrl + (e.target.value ? `?search=${e.target.value}` : ""))
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
          onClick={deleteSelectedUsers}
        >
          Delete
        </button>
        <select
          className="select w-full max-w-xs mb-4 select-bordered"
          defaultValue={itemsPerPage.toString()}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
        >
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    )
  }

  const displayUsers = () => {
    return currentData.map((user) => (
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
          <div>
            <div className="font-bold">
              {user.first_name} {user.last_name}
            </div>
            <div className="text-sm opacity-50">{user.username}</div>
          </div>
        </td>
        <td>
          {user.email}
          <br />
          <span className="badge badge-ghost badge-sm mr-1">
            {user.is_superuser ? "Superuser" : user.is_staff ? "Staff" : "User"}
          </span>
        </td>
        <td>{user.date_joined.split("T")[0]}</td>
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
              <UserForm user={user} setUsers={setData} />
              <p className="text-sm text-center mt-2">Press "Esc" to close.</p>
            </div>
          </dialog>
        </td>
      </tr>
    ))
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-10">Manage users</h1>
      {displayActionsButton()}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>👤 Name & username</th>
              <th>📬 E-mail</th>
              <th>📅 Date joined</th>
              <th>✏️ Actions</th>
            </tr>
          </thead>
          <tbody>{displayUsers()}</tbody>
        </table>
      </div>
      <div className="join flex justify-center mt-4">
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={(e) =>
            setOffset((e.selected * itemsPerPage) % data.length)
          }
          pageClassName="join-item btn"
          previousClassName="join-item btn"
          nextClassName="join-item btn"
          activeClassName="btn-primary"
          breakLabel="..."
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  )
}

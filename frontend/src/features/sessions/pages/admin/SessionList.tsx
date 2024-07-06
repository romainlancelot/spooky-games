import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { deleteSession, getSessions } from "../../api"
import ReactPaginate from "react-paginate"
import { SessionsProps } from "../../model"
import { NavLink } from "react-router-dom"

export function SessionsList() {
  const baseUrl: string = "/api/games"
  const [selectedData, setSelectedData] = useState<SessionsProps[]>([])
  const [search, setSearch] = useState<string>("")

  const [data, setData] = useState<SessionsProps[]>([])
  const [offset, setOffset] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const currentData = data.slice(offset, offset + itemsPerPage)
  const pageCount = Math.ceil(data.length / itemsPerPage)

  useEffect(() => {
    getData(baseUrl)
  }, [])

  const getData = async (url: string) => {
    await getSessions(url)
      .then((sessions) => setData(sessions))
      .catch(() => toast.error("Failed to fetch sessions"))
  }

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    session: SessionsProps
  ) => {
    if (e.target.checked) {
      setSelectedData([...selectedData, session])
    } else {
      setSelectedData(
        selectedData.filter((selected) => selected.id !== session.id)
      )
    }
  }

  const deleteSelectedData = async () => {
    for (const session of selectedData) {
      await deleteSession(session.id)
        .then(() => {
          setData(data.filter((s) => s.id !== session.id))
          setSelectedData(selectedData.filter((s) => s.id !== session.id))
          toast.success(`Deleted ${session.name}`)
        })
        .catch(() => toast.error(`Failed to delete ${session.name}`))
    }
  }

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    await getData(baseUrl + (e.target.value ? `?search=${e.target.value}` : ""))
  }

  const displayActionsButton = () => {
    return (
      <div className="flex justify-end gap-3">
        <NavLink to="/admin/sessions/create" className="btn btn-primary">
          Create
        </NavLink>
        <input
          type="text"
          className="input input-bordered w-full mb-2 sm:mb-0"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
        <button
          className="btn btn-error"
          disabled={!selectedData.length}
          onClick={deleteSelectedData}
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

  const displaySessions = () => {
    return currentData.map((session) => (
      <tr key={session.id}>
        <th>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => handleSelect(e, session)}
            />
          </label>
        </th>
        <td>{session.name}</td>
        <td>
          <img
            src={session.image}
            alt={session.name}
            className="w-10 h-10 object-cover rounded-full"
          />
        </td>
        <td>{session.max_players}</td>
        <td>{new Date(session.created_at).toLocaleString()}</td>
        <td>{new Date(session.updated_at).toLocaleString()}</td>
        <td>
          <NavLink
            to={`/admin/sessions/${session.id}/edit`}
            className="btn btn-sm"
          >
            Edit
          </NavLink>
        </td>
      </tr>
    ))
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-10">Manage sessions</h1>
      {displayActionsButton()}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>👤 Name</th>
              <th>🖼️ Image</th>
              <th>🎮 Max players</th>
              <th>📅 Created at</th>
              <th>📅 Updated at</th>
              <th>✏️ Actions</th>
            </tr>
          </thead>
          <tbody>{displaySessions()}</tbody>
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

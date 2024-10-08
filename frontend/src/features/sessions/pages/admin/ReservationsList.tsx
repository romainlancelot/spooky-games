import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { deleteReservation, getReservations } from "../../api"
import ReactPaginate from "react-paginate"
import { Reservation } from "../../model"

export function ReservationsList() {
  const baseUrl: string = "/api/admin/reservations"
  const [selectedData, setSelectedData] = useState<Reservation[]>([])
  const [search, setSearch] = useState<string>("")

  const [data, setData] = useState<Reservation[]>([])
  const [offset, setOffset] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const currentData = data.slice(offset, offset + itemsPerPage)
  const pageCount = Math.ceil(data.length / itemsPerPage)

  useEffect(() => {
    getData(baseUrl)
  }, [])

  const getData = async (url: string) => {
    await getReservations(url)
      .then((reservations) => setData(reservations))
      .catch((error) => {
        console.log(error)
        toast.error("Failed to fetch reservations")
      })
  }

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    reservation: Reservation
  ) => {
    if (e.target.checked) {
      setSelectedData([...selectedData, reservation])
    } else {
      setSelectedData(
        selectedData.filter((selected) => selected.id !== reservation.id)
      )
    }
  }

  const deleteSelectedData = async () => {
    for (const session of selectedData) {
      await deleteReservation(session.id)
        .then(() => {
          setData(data.filter((s) => s.id !== session.id))
          setSelectedData(selectedData.filter((s) => s.id !== session.id))
          toast.success(`Deleted session ${session.id}`)
        })
        .catch(() => toast.error(`Failed to delete session ${session.id}`))
    }
  }

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    await getReservations(
      baseUrl + (e.target.value ? `?search=${e.target.value}` : "")
    ).then((reservations) => setData(reservations))
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
        <td>{session.date}</td>
        <td>{session.reservation_time}</td>
        {session.game !== null ? (
          <>
            <td className="flex items-center gap-2">
              <img
                src={session.game.image}
                alt={session.game.name}
                className="w-10 h-10 rounded-full"
              />
              {session.game.name}
            </td>
          </>
        ) : (
          <>
            <td>This game not exists anymore</td>
          </>
        )}
        <td>{session.owner.username}</td>
        <td>
          {session.participants.length + 1} player
          {session.participants.length + 1 > 1 ? "s" : ""}
        </td>
        <td>{session.price}€</td>
      </tr>
    ))
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-10">
        Manage reservations
      </h1>
      {displayActionsButton()}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>📅 Date</th>
              <th>⏰ Time</th>
              <th>🎮 Game</th>
              <th>👤 Booker</th>
              <th>👥 Participants</th>
              <th>💰 Price</th>
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

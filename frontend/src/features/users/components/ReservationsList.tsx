import { useEffect, useState } from "react"
import { getUserLoggedReservations } from "../api"
import { Reservation } from "../../sessions/model"
import { toast } from "react-toastify"
import ReactPaginate from "react-paginate"
import { deleteReservation } from "../../sessions/api"

export function ReservationList() {
  const [data, setData] = useState<Reservation[]>([])
  const [selectedData, setSelectedData] = useState<Reservation[]>([])

  const baseUrl: string = "/api/users/me/reservations"
  const [search, setSearch] = useState<string>("")
  const [offset, setOffset] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(5)
  const currentData = data.slice(offset, offset + itemsPerPage)
  const pageCount: number = Math.ceil(data.length / itemsPerPage)

  useEffect(() => {
    getData(baseUrl)
  }, [])

  const getData = async (url: string) => {
    setData(await getUserLoggedReservations(url))
    getUserLoggedReservations(url)
      .then((data) => setData(data))
      .catch((error) => toast.error(error.message))
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

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setData(
      await getUserLoggedReservations(
        baseUrl + (e.target.value ? `?search=${e.target.value}` : "")
      )
    )
  }

  const deleteSelectedData = async () => {
    try {
      for (const reservation of selectedData) {
        await deleteReservation(reservation.id)
      }
      toast.success(`Deleted ${selectedData.length} reservations`)
      setData(data.filter((reservation) => !selectedData.includes(reservation)))
      setSelectedData([])
    } catch (error) {
      toast.error("Failed to delete reservations")
    }
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

  const displayData = () => {
    return currentData.map((reservation) => (
      <tr key={reservation.id}>
        <th>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              onChange={(e) => handleSelect(e, reservation)}
            />
          </label>
        </th>
        <td>
          <img
            src={reservation.game.image}
            alt={reservation.game.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        </td>
        <td>{reservation.game.name}</td>
        <td>{reservation.game.description}</td>
        <td>
          {reservation.date} at {reservation.reservation_time}
        </td>
        <td>
          <ul className="list-disc">
            {reservation.participants.length > 0 ? (
              <>
                {reservation.participants.map((participant, index) => (
                  <li key={index}>
                    {participant.first_name} {participant.last_name} (
                    {participant.email})
                  </li>
                ))}
              </>
            ) : (
              <li>No participants</li>
            )}
          </ul>
        </td>
        <td>{reservation.price}</td>
      </tr>
    ))
  }

  return (
    <div>
      <div className="card bg-base-300 w-100">
        <h2 className="text-4xl text-center mb-2">Your reservations</h2>
        <p className="text-center text-sm mb-8 w-1/2 mx-auto">
          Here you can see all your reservations.
        </p>
        {displayActionsButton()}
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>📸 Image</th>
              <th>🎮 Game</th>
              <th>📝 Description</th>
              <th>📅 Date</th>
              <th>👥 Participants</th>
              <th>💲 Price</th>
            </tr>
          </thead>
          <tbody>{displayData()}</tbody>
        </table>
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
    </div>
  )
}

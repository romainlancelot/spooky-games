import { useEffect, useState } from "react"
import { getUserLoggedReservations } from "../api"
import { Reservation } from "../../sessions/model"
import { toast } from "react-toastify"
import { Spinner } from "../../global/components/Spinner"

export function ReservationList() {
  const [reservations, setReservations] = useState<Array<Reservation> | null>(
    null
  )

  useEffect(() => {
    getUserLoggedReservations()
      .then((data) => setReservations(data))
      .catch((error) => toast.error(error.message))
  }, [])

  return (
    <div>
      {reservations && reservations.length > 0 ? (
        <div className="card bg-base-300 w-100">
          <h2 className="text-4xl text-center mb-2">Your reservations</h2>
          <p className="text-center text-sm mb-8 w-1/2 mx-auto">
            Here you can see all your reservations.
          </p>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Game</th>
                <th>Description</th>
                <th>Date</th>
                <th>Participants</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
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
                      {reservation.participants.map((participant, index) => (
                        <li key={index}>
                          {participant.first_name} {participant.last_name} (
                          {participant.email})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{reservation.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

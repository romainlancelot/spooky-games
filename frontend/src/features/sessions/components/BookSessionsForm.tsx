import { useEffect, useState } from "react"
import { calcPrice } from "../../global/components/Pricing"
import { SessionsProps } from "../model"
import { getLogedUser } from "../../users/api"
import { User } from "../../users/models"
import { toast } from "react-toastify"

export function BookSessionsForm({ session }: { session: SessionsProps }) {
  const [rangeValue, setRangeValue] = useState(0)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    getLogedUser()
      .then((data) => setUser(data))
      .catch((error) => console.error(error))
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    window.scrollTo(0, 0)
    if (!data.email || !data.phone || !data.content) {
      toast.error("Please fill in all fields")
      return
    }
    toast.success("Your message has been sent")
    e.currentTarget.reset()
  }

  return (
    <div className="card bg-base-300 w-2/3 p-10">
      <h2 className="text-4xl text-center mb-2">
        Book your {session.name} session now!
      </h2>
      <p className="text-center text-sm mb-8 w-1/2 mx-auto">
        We need the buyer's information to book the session. Please fill the
        info.
      </p>
      <form action="" method="post" onSubmit={handleSubmit}>
        <h3 className="text-xl mb-4">Buyer's information</h3>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <i className="bi bi-person-fill"></i>
          <input
            type="text"
            className="grow"
            name="firstname"
            placeholder="Firstname"
            value={user?.first_name}
            disabled
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <i className="bi bi-person-fill"></i>
          <input
            type="text"
            className="grow"
            name="lastname"
            placeholder="Lastname"
            value={user?.last_name}
            disabled
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <i className="bi bi-envelope-fill"></i>
          <input
            type="text"
            className="grow"
            name="email"
            placeholder="Email"
            value={user?.email}
            disabled
          />
        </label>

        <div className="divider my-10"></div>

        <h3 className="text-xl mb-4">Session information</h3>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <i className="bi bi-calendar2-event"></i>
          <input type="date" className="grow" name="date" placeholder="Date" />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <i className="bi bi-clock"></i>
          <input type="time" className="grow" name="time" placeholder="Time" />
        </label>

        <div className="divider my-10"></div>

        <h3 className="text-xl mb-4">Other participants</h3>
        <p className="mb-2">How many participants?</p>
        <input
          type="range"
          min={0}
          max={5}
          value={rangeValue}
          className="range"
          step={1}
          onChange={(e) => setRangeValue(parseInt(e.target.value))}
          name="participants_count"
        />
        <div className="w-full flex justify-between text-xs px-2 mb-8">
          {[...Array(6)].map((_, index) => (
            <span key={index}>{index}</span>
          ))}
        </div>
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(rangeValue)].map((_, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <input
                    type="text"
                    className="input w-full"
                    name={`participant_${index}_first_name`}
                    placeholder="Firstname"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="input w-full"
                    name={`participant_${index}_last_name`}
                    placeholder="Lastname"
                  />
                </td>
                <td>
                  <input
                    type="email"
                    className="input w-full"
                    name={`participant_${index}_email`}
                    placeholder="Email"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="divider my-10"></div>

        <p className="mb-2">Price per participant: {calcPrice(rangeValue)}€</p>
        <p className="mb-2">
          Total price:{" "}
          {rangeValue > 0
            ? calcPrice(rangeValue) * rangeValue
            : calcPrice(rangeValue)}
          €
        </p>

        <div className="text-center">
          <button className="btn btn-primary mt-10 w-1/2" type="submit">
            Reserve
          </button>
        </div>
      </form>
    </div>
  )
}

import { useState } from "react"
import { Alert, AlertProps } from "./Alerts"
import { renderToString } from "react-dom/server"
import { pricings } from "./Pricing"

function BookSessionsForm({ id }: { id: string | undefined }) {
  const [rangeValue, setRangeValue] = useState(2)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const alerts = document.getElementById("alerts")
    if (!alerts) {
      return
    }
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    window.scrollTo(0, 0)
    if (!data.email || !data.phone || !data.content) {
      const props: AlertProps = {
        type: "error",
        message: "Please fill in all fields",
      }
      alerts.innerHTML = renderToString(<Alert {...props} />)
      return
    }
    const props: AlertProps = {
      type: "success",
      message: "Your message has been sent",
    }
    alerts.innerHTML = renderToString(<Alert {...props} />)
    e.currentTarget.reset()
  }

  return (
    <div className="card bg-base-300 w-2/3 p-10">
      <h2 className="text-4xl text-center mb-2">Book your {id} session now!</h2>
      <p className="text-center text-sm mb-8 w-1/2 mx-auto">
        We need the buyer's information to book the session. Please fill the
        info.
      </p>
      <form action="" method="post" onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <i className="bi bi-person-fill"></i>
          <input
            type="text"
            className="grow"
            name="firstname"
            placeholder="Firstname"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <i className="bi bi-person-fill"></i>
          <input
            type="text"
            className="grow"
            name="lastname"
            placeholder="Lastname"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <i className="bi bi-envelope-fill"></i>
          <input
            type="text"
            className="grow"
            name="email"
            placeholder="Email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <i className="bi bi-telephone-fill"></i>
          <input
            type="text"
            className="grow"
            name="phone"
            placeholder="Phone"
          />
        </label>
        <div className="divider my-10"></div>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <i className="bi bi-calendar2-event"></i>
          <input type="date" className="grow" name="date" placeholder="Date" />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <i className="bi bi-clock"></i>
          <input type="time" className="grow" name="time" placeholder="Time" />
        </label>

        <div className="divider my-10"></div>

        <p className="mb-2">How many participants?</p>
        <input
          type="range"
          min={2}
          max={4}
          value={rangeValue}
          className="range"
          step={1}
          onChange={(e) => setRangeValue(parseInt(e.target.value))}
          name="participants_count"
        />
        <div className="w-full flex justify-between text-xs px-2 mb-8">
          <span>2</span>
          <span>3</span>
          <span>4</span>
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

        <p className="mb-2">
          Price per participant: {pricings[rangeValue - 2].price}€
        </p>
        <p className="mb-2">
          Total price: {pricings[rangeValue - 2].price * rangeValue}€
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

export default BookSessionsForm

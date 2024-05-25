import { Alert, AlertProps } from "./Alerts"
import { renderToString } from "react-dom/server"

function ContactForm() {
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
    <form action="" method="post" onSubmit={handleSubmit}>
      <label className="input input-bordered flex items-center gap-2 mb-4">
        <i className="bi bi-envelope-fill"></i>
        <input type="text" className="grow" name="email" placeholder="Email" />
      </label>
      <label className="input input-bordered flex items-center gap-2 mb-4">
        <i className="bi bi-telephone-fill"></i>
        <input type="text" className="grow" name="phone" placeholder="Phone" />
      </label>
      <textarea
        className="textarea textarea-bordered w-full h-52"
        name="content"
        placeholder="Content"
      ></textarea>
      <div className="text-center">
        <button className="btn btn-primary mt-10 w-1/2" type="submit">
          Submit
        </button>
      </div>
    </form>
  )
}

export default ContactForm

import { NavLink } from "react-router-dom"

export interface SessionsProps {
  id: number
  image: string
  title: string
  description: string
}

function SessionCard({ id, image, title, description }: SessionsProps) {
  return (
    <div className="card w-full bg-base-300 shadow-xl">
      <figure>
        <img src={image} alt={title} className="h-96 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <NavLink to={`/sessions/${id}/book`} className="btn btn-primary mt-4">
          Book the {title} session
        </NavLink>
      </div>
    </div>
  )
}

export default SessionCard

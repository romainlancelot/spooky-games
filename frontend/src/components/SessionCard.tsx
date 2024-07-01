import { NavLink } from "react-router-dom"
import { SessionsProps } from "../models/sessions"

function SessionCard({
  id,
  name,
  image,
  description,
  max_players,
  created_at,
}: SessionsProps) {
  return (
    <div className="card w-full bg-base-300 shadow-xl">
      <figure>
        <img src={image} alt={name} className="h-96 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="flex gap-2">
          <span className="badge badge-primary">
            Max players: {max_players}
          </span>
          <span className="badge badge-primary">
            Created on: {created_at.split("T")[0]}
          </span>
        </div>
        <p>{description}</p>
        <NavLink to={`/sessions/${id}/book`} className="btn btn-primary mt-4">
          Book the {name} session
        </NavLink>
      </div>
    </div>
  )
}

export default SessionCard

import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { SessionsProps } from "../model"
import { getSession } from "../api"
import { toast } from "react-toastify"
import { Spinner } from "../../global/components/Spinner"

export function SessionDetails() {
  const sessionId: string | undefined = useParams().id
  const [session, setSession] = useState<SessionsProps | null>(null)

  useEffect(() => {
    getSession(Number(sessionId))
      .then((data) => setSession(data))
      .catch(() => toast.error("Failed to fetch session"))
  }, [sessionId])

  return (
    <div className="my-8">
      {session ? (
        <div className="flex justify-center items-center">
          <div className="card sm:w-2/3 bg-base-300">
            <figure>
              <img src={session.image} alt={session.name} />
            </figure>
            <div className="card-body">
              <div className="flex justify-between">
                <div>
                  <h2 className="card-title mb-4">{session.name}</h2>
                  <p>
                    📆 Created the {session.created_at.split("T")[0]}
                    <br />
                    🕒 Last updated the {session.updated_at.split("T")[0]}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-sm opacity-50">
                      Max player{session.max_players > 1 ? "s" : ""}:{" "}
                      {session.max_players}
                    </div>
                  </div>
                </div>
              </div>

              <div className="divider"></div>
              <p>{session.description}</p>
              <div className="card-actions justify-center mt-8">
                <NavLink
                  to={`/sessions/${session.id}/book`}
                  className="btn btn-primary w-1/2"
                >
                  Book now
                </NavLink>
                <NavLink to="/sessions" className="btn w-1/2">
                  Back
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

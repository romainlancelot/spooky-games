import { toast } from "react-toastify"
import Pricing from "../../../components/Pricing"
import SessionCard from "../components/SessionCard"
import { useEffect, useState } from "react"
import { SessionsProps } from "../model"
import { getSessions } from "../api"
import Spinner from "../../../components/Spinner"

function Sessions() {
  const [sessions, setSessions] = useState<SessionsProps[]>([])

  useEffect(() => {
    try {
      getSessions()
        .then((data) => setSessions(data))
        .catch(() => setSessions([]))
    } catch (error) {
      toast.error("Failed to fetch sessions")
    }
  }, [])

  return (
    <div className="my-8">
      <div className="flex justify-center mt-4 mb-12">
        <Pricing />
      </div>
      {sessions && sessions.length > 0 ? (
        <>
          <p className="text-center mb-12 text-sm">
            These are the pricing options for our escape rooms that we offer.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 justify-items-center gap-10 mb-12">
            {sessions.map((session) => (
              <SessionCard key={session.id} {...session} />
            ))}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

export default Sessions

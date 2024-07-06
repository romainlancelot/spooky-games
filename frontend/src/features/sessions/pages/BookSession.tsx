import { useEffect, useState } from "react"
import { BookSessionsForm } from "../components/BookSessionsForm"
import { SessionsProps } from "../model"
import { toast } from "react-toastify"
import { getSession } from "../api"
import { Spinner } from "../../global/components/Spinner"
import { useParams } from "react-router-dom"

export function BookSession() {
  const [session, setSession] = useState<SessionsProps | null>(null)
  const session_id: number = Number(useParams().id)

  useEffect(() => {
    getSession(session_id)
      .then((data) => setSession(data))
      .catch(() => toast.error("Failed to fetch session"))
  }, [session_id])

  return (
    <div className="my-8 flex justify-center">
      {session ? <BookSessionsForm session={session} /> : <Spinner />}
    </div>
  )
}

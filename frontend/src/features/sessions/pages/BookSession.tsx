import { useParams } from "react-router-dom"
import BookSessionsForm from "../components/BookSessionsForm"

function BookSession() {
  const { id } = useParams()
  return (
    <div className="my-8 flex justify-center">
      <BookSessionsForm id={id} />
    </div>
  )
}

export default BookSession

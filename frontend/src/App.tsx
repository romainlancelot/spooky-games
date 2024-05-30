import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.tsx"
import Contact from "./pages/Contact.tsx"
import Sessions from "./pages/Sessions.tsx"
import BookSession from "./pages/BookSession.tsx"

function App() {
  return (
    <div>
      <div id="alerts"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/sessions/:id/book" element={<BookSession />} />
        <Route
          path="*"
          element={
            <h1 className="text-4xl text-center my-20">Error 404: Not Found</h1>
          }
        />
      </Routes>
    </div>
  )
}

export default App

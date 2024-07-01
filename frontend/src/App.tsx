import { Routes, Route } from "react-router-dom"
import Home from "./features/home/Home.tsx"
import Contact from "./features/contact/Contact.tsx"
import Sessions from "./features/sessions/pages/Sessions.tsx"
import BookSession from "./features/sessions/pages/BookSession.tsx"
import Navbar from "./components/Navbar.tsx"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import Footer from "./components/Footer.tsx"

function App() {
  return (
    <main className="flex flex-col min-h-screen justify-between">
      <ToastContainer position="top-right" theme="light" />
      <Navbar />
      <div className="mb-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/sessions/:id/book" element={<BookSession />} />
          <Route
            path="*"
            element={
              <h1 className="text-4xl text-center my-20">
                Error 404: Not Found
              </h1>
            }
          />
        </Routes>
      </div>
      <Footer />
    </main>
  )
}

export default App

import { Routes, Route } from "react-router-dom"
import Home from "./features/home/Home.tsx"
import Contact from "./features/contact/Contact.tsx"
import Sessions from "./features/sessions/pages/Sessions.tsx"
import BookSession from "./features/sessions/pages/BookSession.tsx"
import Navbar from "./features/global/components/Navbar.tsx"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import Footer from "./features/global/components/Footer.tsx"
import Login from "./features/users/pages/Login.tsx"
import { useEffect, useState } from "react"
import { User } from "./features/users/models.tsx"
import { getLogedUser } from "./features/users/api.tsx"
import Signup from "./features/users/pages/Signup.tsx"
import Profile from "./features/users/pages/Profile.tsx"
import ProtectedRoute from "./features/global/components/ProtectedRoute.tsx"

function App() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLogedUser()
        .then((data) => setUser(data))
        .catch((error) => console.error(error))
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return (
    <main className="flex flex-col min-h-screen justify-between">
      <ToastContainer position="top-right" theme="light" />
      <Navbar user={user} logout={logout} />
      <div className="mb-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/sessions/:id/book" element={<BookSession />} />

          <Route element={<ProtectedRoute user={user} redirectPath="/login" />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

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

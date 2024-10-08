import { Routes, Route } from "react-router-dom"
import Home from "./features/home/Home.tsx"
import { Contact } from "./features/contact/Contact.tsx"
import { Sessions } from "./features/sessions/pages/Sessions.tsx"
import { BookSession } from "./features/sessions/pages/BookSession.tsx"
import { Navbar } from "./features/global/components/Navbar.tsx"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import { Footer } from "./features/global/components/Footer.tsx"
import { Login } from "./features/users/pages/Login.tsx"
import { useEffect, useState } from "react"
import { User } from "./features/users/models.tsx"
import { getLogedUser } from "./features/users/api.tsx"
import { Signup } from "./features/users/pages/Signup.tsx"
import { Profile } from "./features/users/pages/Profile.tsx"
import { ProtectedRoute } from "./features/global/components/ProtectedRoute.tsx"
import { UsersList } from "./features/users/pages/admin/UsersList.tsx"
import { SessionsList } from "./features/sessions/pages/admin/SessionList.tsx"
import { CreateSession } from "./features/sessions/pages/admin/CreateSession.tsx"
import { ReservationsList } from "./features/sessions/pages/admin/ReservationsList.tsx"
import { EditSession } from "./features/sessions/pages/admin/EditSession.tsx"
import { SessionDetails } from "./features/sessions/pages/SessionDetails.tsx"

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  )
  const [token, setToken] = useState<string | null>(null)

  const toggleTheme = () => {
    if (localStorage.getItem("theme") === "light") {
      setTheme("dark")
      return
    }
    setTheme("light")
  }

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("token", token || "")
    console.log(token)
    if (token) {
      getLogedUser()
        .then((data) => setUser(data))
        .catch((error) => console.error(error))
    }
  }, [])

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <main className="flex flex-col min-h-screen justify-between">
      <ToastContainer position="bottom-right" theme={theme} />
      <Navbar
        user={user}
        logout={logout}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      <div className="mb-auto mt-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login onLogin={setUser} setToken={setToken} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/sessions/:id" element={<SessionDetails />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute user={user} redirectPath="/login" />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/sessions/:id/book" element={<BookSession />} />
          </Route>

          {/* Admin routes */}
          <Route
            element={<ProtectedRoute user={user} redirectPath="/" needAdmin />}
          >
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/sessions" element={<SessionsList />} />
            <Route path="/admin/sessions/create" element={<CreateSession />} />
            <Route path="/admin/sessions/:id/edit" element={<EditSession />} />
            <Route path="/admin/reservations" element={<ReservationsList />} />
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
      <div className="mt-8">
        <Footer />
      </div>
    </main>
  )
}

export default App

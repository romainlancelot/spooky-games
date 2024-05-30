import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import "./tailwind.css"
import Navbar from "./components/Navbar.tsx"
import App from "./App.tsx"
import Footer from "./components/Footer.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="p-5">
    <React.StrictMode>
      <Router>
        <Navbar />
        <App />
        <Footer />
      </Router>
    </React.StrictMode>
  </div>
)

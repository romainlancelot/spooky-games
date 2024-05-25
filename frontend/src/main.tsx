import React from "react"
import ReactDOM from "react-dom/client"
import "./tailwind.css"
import Navbar from "./Navbar.tsx"
import App from "./App.tsx"
import Footer from "./Footer.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="p-5">
    <React.StrictMode>
      <Navbar />
      <App />
      <Footer />
    </React.StrictMode>
  </div>
)

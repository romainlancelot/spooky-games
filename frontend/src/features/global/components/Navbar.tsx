import { NavLink } from "react-router-dom"
import { User } from "../../users/models"

function Navbar({ user, logout }: { user: User | null; logout: () => void }) {
  return (
    <div className="navbar bg-base-300 rounded-box">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-2xl"
          >
            <i className="bi bi-list"></i>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/">🏠 Home</NavLink>
            </li>
            <li>
              <NavLink to="/sessions">🎮 Book an escape game</NavLink>
            </li>
            <li>
              <NavLink to="/contact">🤙 Contact us</NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <NavLink to="/" className="btn btn-ghost text-xl">
          Spooky Games
        </NavLink>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-2xl"
          >
            <i className="bi bi-person"></i>
          </div>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {!user ? (
              <>
                <li>
                  <NavLink to="/login">🔑 Login</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">🤘 Signup</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/profile">👤 Profile</NavLink>
                </li>
                <li>
                  <button onClick={logout} type="button">
                    🚪 Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        <label className="swap swap-rotate btn btn-ghost btn-circle">
          <input type="checkbox" className="theme-controller" value="light" />
          <i className="bi bi-moon-stars-fill swap-off fill-current text-xl"></i>
          <i className="bi bi-sun-fill swap-on fill-current text-xl"></i>
        </label>
      </div>
    </div>
  )
}

export default Navbar

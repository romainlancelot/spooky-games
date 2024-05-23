function Navbar() {
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl" href="/">
          Spooky Games
        </a>
      </div>
      <div className="navbar-end">
        <label className="swap swap-rotate btn btn-ghost btn-circle">
          <input type="checkbox" className="theme-controller" value="light" />
          <i className="bi bi-moon-stars-fill swap-off fill-current text-xl"></i>
          <i className="bi bi-sun-fill swap-on fill-current text-xl"></i>
        </label>
        <button className="btn btn-ghost btn-circle text-xl">
          <i className="bi bi-search"></i>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator bi bi-bell-fill text-xl">
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default Navbar

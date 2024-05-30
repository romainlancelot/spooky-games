import Boo from "../assets/boo.png"

function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-300 rounded-box">
      <aside>
        <img src={Boo} alt="boo-logo" className="w-24" />
        <p className="font-bold">
          Spooky Games Ltd. <br />
          Fait avec amour par nos soins
        </p>
        <p>Copyright © 2024 - All right reserved</p>
      </aside>
      <nav>
        <h2 className="uppercase font-bold">Socials</h2>
        <div className="grid grid-flow-col gap-4">
          <a href="https://x.com" target="blank">
            <i className="bi bi-twitter-x text-2xl"></i>
          </a>
          <a href="https://youtube.com" target="blank">
            <i className="bi bi-youtube text-2xl"></i>
          </a>
          <a href="https://facebook.com" target="blank">
            <i className="bi bi-facebook text-2xl"></i>
          </a>
        </div>
      </nav>
    </footer>
  )
}

export default Footer

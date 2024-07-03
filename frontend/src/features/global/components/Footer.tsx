import Boo from "../../../assets/boo.png"

export function Footer() {
  const legalMention = () => {
    return (
      <>
        <button
          className="btn my-2"
          onClick={() => {
            const modal = document.getElementById("modal_legal_mention")
            modal?.setAttribute("open", "true")
          }}
        >
          Legal mention
        </button>
        <dialog id="modal_legal_mention" className="modal">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg mt-2">Legal Mentions Company</h3>
            <div className="py-4 align-start text-left">
              <h3 className="font-bold text-lg">Company Information:</h3>
              <ul className="list-disc list-inside">
                <li>Company Name: Spooky Games</li>
                <li>
                  Legal Form: [Specify the legal form, e.g., Limited Liability
                  Company (LLC), Corporation]
                </li>
                <li>
                  Registered Office: [Company's registered office address]
                </li>
                <li>
                  Company Registration Number: [Company registration number]
                </li>
                <li>VAT Number: [Company's VAT number]</li>
                <li>Email: [Company email address]</li>
                <li>Phone Number: [Company phone number]</li>
                <li>
                  Website:{" "}
                  <a href="https://www.spookygames.com">www.spookygames.com</a>
                </li>
              </ul>

              <h3 className="font-bold text-lg mt-2">Hosting Provider:</h3>
              <ul className="list-disc list-inside">
                <li>Hosting Company Name: [Hosting provider's name]</li>
                <li>Address: [Hosting provider's address]</li>
                <li>Phone Number: [Hosting provider's phone number]</li>
                <li>Website: [Hosting provider's website]</li>
              </ul>

              <h3 className="font-bold text-lg mt-2">Intellectual Property:</h3>
              <p>
                All content on this website, including but not limited to text,
                graphics, logos, images, and videos, is the property of Spooky
                Games or its content suppliers and is protected by applicable
                copyright and trademark laws. Unauthorized use or reproduction
                of any content is strictly prohibited.
              </p>

              <h3 className="font-bold text-lg mt-2">
                Personal Data Protection:
              </h3>
              <p>
                Spooky Games is committed to protecting your privacy. Any
                personal data collected on this website is processed in
                accordance with applicable data protection laws. For more
                information, please refer to our <a href="#">Privacy Policy</a>.
              </p>

              <h3 className="font-bold text-lg mt-2">Cookies:</h3>
              <p>
                This website uses cookies to enhance user experience. By using
                our website, you consent to our use of cookies in accordance
                with our <a href="#">Cookie Policy</a>.
              </p>

              <h3 className="font-bold text-lg mt-2">
                Limitation of Liability:
              </h3>
              <p>
                Spooky Games makes every effort to ensure the accuracy of the
                information on this website. However, we cannot guarantee that
                all information is current or error-free. Spooky Games shall not
                be liable for any direct or indirect damages resulting from the
                use of this website.
              </p>

              <h3 className="font-bold text-lg mt-2">External Links:</h3>
              <p>
                This website may contain links to external websites. Spooky
                Games is not responsible for the content or practices of these
                external sites. Users are advised to review the privacy policies
                and terms of use of any external websites they visit.
              </p>

              <h3 className="font-bold text-lg mt-2">
                Modification of Legal Mentions:
              </h3>
              <p>
                Spooky Games reserves the right to modify these legal mentions
                at any time. Users are encouraged to review this page
                periodically for any changes.
              </p>

              <h3 className="font-bold text-lg mt-2">Contact:</h3>
              <ul>
                For any questions or concerns regarding these legal mentions,
                please contact us at:
                <li>Email:</li> [Company email address]
                <li>Phone Number:</li> [Company phone number]
                <li>Address:</li> [Company address]
              </ul>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </>
    )
  }

  return (
    <footer className="footer footer-center p-10 bg-base-300 rounded-box">
      <aside>
        <img src={Boo} alt="boo-logo" className="w-24" />
        <p className="font-bold">
          Spooky Games Ltd. <br />
          Fait avec amour par nos soins
        </p>
        <p>Copyright © 2024 - All right reserved</p>
        {legalMention()}
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

import SessionCard, { SessionsProps } from "../components/SessionCard"
import LostAsylum from "../assets/lost_asylum.jpg"
import PassePartout from "../assets/passe_partout.jpg"
import HorrificRedPiece from "../assets/horrific_red_piece.png"
import Pricing from "../components/Pricing"

const sessions: SessionsProps[] = [
  {
    id: 1,
    image: LostAsylum,
    title: "Lost Asylum",
    description:
      "The Lost Asylum is a horror-themed escape room. Be prepared to be scared! This is not for the faint of heart.",
  },
  {
    id: 2,
    image: PassePartout,
    title: "Passe partout",
    description:
      "The Passe Partout is a puzzle-themed escape room. Can you solve the puzzles and escape? This is a great room for families and beginners.",
  },
  {
    id: 3,
    image: HorrificRedPiece,
    title: "Horrific Red Piece",
    description:
      "The Horrific Red Piece is a horror-themed escape room. Be prepared to be scared! This is not for the faint of heart.",
  },
]

function Sessions() {
  return (
    <div className="my-8">
      <div className="flex justify-center mt-4">
        <Pricing />
      </div>
      <p className="text-center mt-2 mb-12 text-sm">
        These are the pricing options for our escape rooms that we offer.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 justify-items-center gap-10 mb-12">
        {sessions.map((session, index) => (
          <SessionCard key={index} {...session} />
        ))}
      </div>
    </div>
  )
}

export default Sessions

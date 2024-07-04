import { Card, CardProps } from "../global/components/Card"
import { Accordion, AccordionProps } from "../global/components/Accordion"
import Environment from "../../assets/environment.png"
import Timer from "../../assets/timer.png"
import Difficulty from "../../assets/difficulty.png"
import TeamBuilding from "../../assets/team_building.png"
import UniqueScenarios from "../../assets/unique_scenarios.png"
import Homepage from "../../assets/homepage.png"
import { ContactForm } from "../contact/components/ContactForm"
import { NavLink } from "react-router-dom"

const spookyAdvantages: CardProps[] = [
  {
    image: Environment,
    title: "🧭 Immersive experience",
    description:
      "Our escape games are designed to provide an immersive experience that will transport you to another world.",
  },
  {
    image: Timer,
    title: "⏱️ Timed Challenges",
    description: "Test your skills and solve puzzles against the clock.",
  },
  {
    image: Difficulty,
    title: "🧐 Gradual difficulty",
    description:
      "Our games are designed to start easy and gradually increase in difficulty to keep you engaged.",
  },
  {
    image: TeamBuilding,
    title: "🚀 Team building",
    description:
      "Our games are perfect for team building exercises and group activities.",
  },
  {
    image: UniqueScenarios,
    title: "🎬 Unique scenarios",
    description:
      "Each of our games has a unique scenario and storyline to keep you entertained.",
  },
]

const spookyFaq: AccordionProps[] = [
  {
    question: "What is Spooky Games?",
    content:
      "Spooky Games is a company specializing in creating and organizing immersive horror-themed escape room sessions. Founded by enthusiasts of fright and suspense, our mission is to transport our clients into worlds where every second counts and every decision is crucial.",
  },
  {
    question: "What makes Spooky Games unique?",
    content:
      "At Spooky Games, we take pride in crafting unique and captivating scenarios with elaborate sets and a carefully curated atmosphere to ensure total immersion. Our team consists of experienced professionals in gaming, theater, and production, working together to deliver a superior quality experience.",
  },
  {
    question: "What can I expect from a Spooky Games escape room session?",
    content:
      "Our escape room sessions are designed to offer an intense and unforgettable experience. You and your team will be locked in realistic and chilling settings inspired by the greatest horror stories. You will need to solve complex puzzles, find hidden clues, and collaborate to escape the traps that await you.",
  },
  {
    question: "Who can participate in Spooky Games escape rooms?",
    content:
      "Our sessions cater to all tastes and age groups (starting from 16 years old). Whether you are facing a haunted house, an abandoned asylum, or a cursed forest, we have different themes and difficulty levels to suit everyone.",
  },
  {
    question: "How long does a session last?",
    content:
      "Each escape game session lasts approximately 60 minutes, but the memory of the adventure will stay with you much longer. The sound effects, lighting, and live actors make each session more thrilling and memorable.",
  },
  {
    question: "Why choose Spooky Games?",
    content:
      "We believe that horror is an art, and we strive to push the boundaries of fear to offer our clients intense and memorable moments of fright. Join us for an unforgettable adventure where your nerves will be tested and the escape is never guaranteed. Are you ready to face your fears? Book your session now at Spooky Games and let yourself be swept away by the best immersive horror ",
  },
  {
    question: "What is an escape game?",
    content:
      "An escape game is a physical adventure game in which players solve a series of puzzles and riddles using clues, hints, and strategy to complete the objectives at hand. Players are given a set time limit to unveil the secret plot which is hidden within the rooms.",
  },
  {
    question: "How many people can play?",
    content:
      "The number of players can vary depending on the scenario. Most games are designed for groups of 2 to 6 players.",
  },
  {
    question: "Is it scary?",
    content:
      "Our games are designed to be thrilling and suspenseful, but not overly scary. We aim to create an immersive experience that will keep you on the edge of your seat.",
  },
]

function Home() {
  return (
    <div className="my-8">
      <div
        className="hero min-h-screen rounded-xl"
        style={{
          backgroundImage: `url(${Homepage})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60 rounded-xl"></div>
        <div className="hero-content text-center text-neutral-content rounded-xl">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">👻</h1>
            <p className="mb-5">Your new favorite horror escape game</p>
            <button
              className="btn btn-primary"
              onClick={() => scrollTo({ top: 1000, behavior: "smooth" })}
            >
              What do we offer?
            </button>
          </div>
        </div>
      </div>

      {/* Advantages */}
      <h2 className="text-4xl text-center mt-10">✨ Our unfair advantages</h2>
      <p className="text-center text-base mt-4 mb-8 w-1/2 mx-auto">
        Here, at Spooky Games, we offer a unique experience that you won't find
        anywhere else. Here are some of the advantages of our escape games:
      </p>
      <div
        className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-4"
        id="advantages"
      >
        {spookyAdvantages.map((advantage, index) => (
          <Card key={index} {...advantage} />
        ))}
      </div>

      <div className="text-center m-10">
        <NavLink to="/sessions" className="btn btn-primary">
          Book a spooky game now!
        </NavLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {/* FAQ */}
        <div className="card bg-base-200 p-10">
          <h2 className="text-4xl text-center my-10">
            🎃 Frequently Asked Questions
          </h2>
          <div className="justify-center flex">
            <div className="join join-vertical w-full mb-10">
              {spookyFaq.map((faq, index) => (
                <Accordion key={index} {...faq} />
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <ContactForm />
      </div>
    </div>
  )
}

export default Home

export interface PricingProps {
  emoji: string
  color: string
  price: number
  people: number
  description: string
}

export const pricings: PricingProps[] = [
  {
    emoji: "💰",
    color: "text-tertiary",
    price: 27,
    people: 2,
    description: "For very small groups",
  },
  {
    emoji: "💸",
    color: "text-primary",
    price: 24,
    people: 3,
    description: "For little groups",
  },
  {
    emoji: "🚀",
    color: "text-secondary",
    price: 19,
    people: 4,
    description: "For big groups",
  },
]

function Pricing() {
  return (
    <div className="stats bg-base-300">
      {pricings.map((pricing) => (
        <div className="stat">
          <div className="stat-figure text-3xl">{pricing.emoji}</div>
          <div className="stat-title">
            {pricing.people}
            {pricing.people === 4 ? " or more" : ""} 🧑‍🤝‍🧑
          </div>
          <div className={`stat-value ${pricing.color}`}>
            {pricing.price}€ / people
          </div>
          <div className="stat-desc">{pricing.description}</div>
        </div>
      ))}
    </div>
  )
}

export default Pricing

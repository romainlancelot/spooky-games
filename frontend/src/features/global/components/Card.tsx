export interface CardProps {
  image: string
  title: string
  description: string
}

export function Card({ image, title, description }: CardProps) {
  return (
    <div className="card image-full">
      <figure>
        <img src={image} alt={title} />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

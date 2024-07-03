import { User } from "../users/models"

export interface SessionsProps {
  id: number
  name: string
  image: string
  description: string
  max_players: number
  created_at: string
  updated_at: string
}

export interface ParticipantProps {
  first_name: string
  last_name: string
  email: string
}

export interface SessionReservation {
  date: string
  participants: ParticipantProps[]
  reservation_time: string
  price: number
}

export interface Reservation {
  id: number
  reservation_time: string
  date: string
  num_players: number
  price: number
  game: SessionsProps
  owner: User
  participants: ParticipantProps[]
}

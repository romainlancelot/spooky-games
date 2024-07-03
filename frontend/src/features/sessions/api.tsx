import { toast } from "react-toastify"
import { ApiResponse } from "../api_response/model"
import { SessionsProps } from "./model"

export async function getSessions(): Promise<SessionsProps[]> {
  try {
    const response = await fetch("/api/games")
    if (!response.ok) {
      throw new Error("Failed to fetch sessions")
    }
    const data: ApiResponse = await response.json()
    return data.results
  } catch (error) {
    throw new Error("An error occurred while fetching sessions")
  }
}

export async function getSession(session_id: number): Promise<SessionsProps> {
  try {
    const response = await fetch(`/api/games/${session_id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch session")
    }
    return await response.json()
  } catch (error) {
    throw new Error("An error occurred while fetching session")
  }
}

export async function bookSession(session_id: number): Promise<void> {
  try {
    const response = await fetch(`/api/sessions/$id/reservations/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session_id: session_id }),
    })
    if (!response.ok) {
      toast.error("Failed to book session")
    }
  } catch (error) {
    toast.error("An error occurred while booking session")
  }
}

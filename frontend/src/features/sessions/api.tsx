import { ApiResponse } from "../../models/response"
import { SessionsProps } from "../../models/sessions"

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

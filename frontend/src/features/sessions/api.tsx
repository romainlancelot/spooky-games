import { toast } from "react-toastify"
import { ApiResponse } from "../api_response/model"
import { SessionReservation, SessionsProps, Reservation } from "./model"

export async function getSessions(url: string): Promise<SessionsProps[]> {
  try {
    const response = await fetch(url)
    const sessions: SessionsProps[] = []
    if (!response.ok) {
      throw new Error("Failed to fetch sessions")
    }
    const data: ApiResponse = await response.json()
    sessions.push(...data.results)
    if (data.next) {
      sessions.push(...(await getSessions(data.next)))
    }
    return sessions
  } catch (error) {
    throw new Error("An error occurred while fetching sessions")
  }
}

export async function createSession(data: FormData): Promise<void> {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("You are not logged in")
    }
    const response = await fetch("/api/games/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
    if (!response.ok) {
      const responseData = await response.json()
      Object.keys(responseData).forEach((key) => {
        toast.error(`${key}: ${responseData[key]}`)
      })
      return
    }
    toast.success("Session created successfully")
  } catch (error) {
    toast.error("An error occurred while creating session")
  }
}

export async function getSession(sessionId: number): Promise<SessionsProps> {
  try {
    const response = await fetch(`/api/games/${sessionId}`)
    if (!response.ok) {
      throw new Error("Failed to fetch session")
    }
    return await response.json()
  } catch (error) {
    throw new Error("An error occurred while fetching session")
  }
}

export async function deleteSession(sessionId: number): Promise<void> {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("You are not logged in")
    }
    const response = await fetch(`/api/games/${sessionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error("Failed to delete session")
    }
  } catch (error) {
    toast.error("An error occurred while deleting session")
  }
}

export async function getOpeningHours(): Promise<Array<string>> {
  try {
    const response = await fetch("/api/games/opening-hours")
    if (!response.ok) {
      throw new Error("Failed to fetch opening hours")
    }
    const data = await response.json()
    return data?.opening_hours || []
  } catch (error) {
    throw new Error("An error occurred while fetching opening hours")
  }
}

export async function bookSession(
  sessionId: number,
  data: SessionReservation
): Promise<void> {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("You are not logged in")
    }
    const response = await fetch(`/api/games/${sessionId}/reservations/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    console.log(response)
    if (!response.ok) {
      const responseData = await response.json()
      Object.keys(responseData).forEach((key) => {
        toast.error(`${key}: ${responseData[key]}`)
      })
      throw new Error("Failed to book session")
    }
    toast.success("Session booked successfully")
  } catch (error) {
    toast.error("An error occurred while booking session")
    throw new Error("An error occurred while booking session")
  }
}

export async function getReservations(url: string): Promise<Reservation[]> {
  try {
    const token: string | null = localStorage.getItem("token")
    const reservations: Reservation[] = []
    if (!token) {
      throw new Error("You are not logged in")
    }
    const response: Response = await fetch("/api" + url.split("/api")[1], {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      console.log(response)
      throw new Error("Failed to get reservations")
    }
    const json: ApiResponse = await response.json()
    reservations.push(...json.results)
    if (json.next) {
      reservations.push(...(await getReservations(json.next)))
    }
    return reservations
  } catch (error) {
    throw new Error("An error occurred while getting reservations")
  }
}

export async function deleteReservation(reservationId: number): Promise<void> {
  try {
    const token: string | null = localStorage.getItem("token")
    if (!token) {
      throw new Error("You are not logged in")
    }
    const response: Response = await fetch(
      `/api/admin/reservations/${reservationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (!response.ok) {
      throw new Error("Failed to delete reservation")
    }
  } catch (error) {
    throw new Error("An error occurred while deleting reservation")
  }
}

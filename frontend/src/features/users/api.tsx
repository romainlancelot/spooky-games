import { ApiResponse } from "../api_response/model"
import { Reservation } from "../sessions/model"
import { LoginResponse, User } from "./models"
import { toast } from "react-toastify"

export async function getToken(
  username: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await fetch("/api/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
    if (!response.ok) {
      throw new Error("Failed to login")
    }
    return await response.json()
  } catch (error) {
    throw new Error("An error occurred while logging in")
  }
}

export async function getLogedUser(): Promise<User> {
  try {
    const token = localStorage.getItem("token")
    if (!token) {
      throw new Error("You are not logged in")
    }
    const response = await fetch("/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error("Failed to get user")
    }
    return await response.json()
  } catch (error) {
    throw new Error("An error occurred while getting user")
  }
}

export async function registerUser(data: User): Promise<User> {
  try {
    const response: Response = await fetch("/api/users/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const json = await response.json()
    if (!response.ok) {
      Object.keys(json).forEach((key) => {
        toast.error(`${key}: ${json[key]}`)
      })
      throw new Error("Failed to register")
    }
    return json
  } catch (error) {
    throw new Error("An error occurred while registering")
  }
}

export async function updateLoggedUser(data: User): Promise<User> {
  console.log(data)
  try {
    const response: Response = await fetch(`/api/users/me/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
    const json = await response.json()
    if (!response.ok) {
      Object.keys(json).forEach((key) => {
        toast.error(`${key}: ${json[key as keyof typeof json]}`)
      })
      throw new Error("Failed to update user")
    }
    return json
  } catch (error) {
    throw new Error("An error occurred while updating user")
  }
}

export async function updateUser(userId: number, data: User): Promise<User> {
  try {
    const response: Response = await fetch(`/api/admin/users/${userId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
    const json: User = await response.json()
    if (!response.ok) {
      Object.keys(json).forEach((key) => {
        toast.error(`${key}: ${json[key as keyof typeof json]}`)
      })
      throw new Error("Failed to update user")
    }
    return json
  } catch (error) {
    throw new Error("An error occurred while updating user")
  }
}

export async function deleteUser(userId: number): Promise<null> {
  try {
    const response: Response = await fetch(`/api/admin/users/${userId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    console.log(response)
    if (!response.ok) {
      throw new Error("Failed to delete user")
    }
    return null
  } catch (error) {
    throw new Error("An error occurred while deleting user")
  }
}

export async function getAllUsers(url: string): Promise<User[]> {
  try {
    const token: string | null = localStorage.getItem("token")
    const users: User[] = []
    const response: Response = await fetch("/api" + url.split("/api")[1], {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error("Failed to get users")
    }
    const json: ApiResponse = await response.json()
    users.push(...json.results)
    if (json.next) {
      users.push(...(await getAllUsers(json.next)))
    }
    return users
  } catch (error) {
    throw new Error("An error occurred while getting users")
  }
}

export async function getUserLoggedReservations(
  url: string
): Promise<Reservation[]> {
  try {
    const token: string | null = localStorage.getItem("token")
    if (!token) {
      throw new Error("You are not logged in")
    }
    const response: Response = await fetch("/api" + url.split("/api")[1], {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error("Failed to get reservations")
    }
    const json: ApiResponse = await response.json()
    return json.results
  } catch (error) {
    throw new Error("An error occurred while getting reservations")
  }
}

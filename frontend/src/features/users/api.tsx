import { ApiResponse } from "../api_response/model"
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

export async function updateUser(data: User): Promise<User> {
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
        toast.error(`${key}: ${json[key]}`)
      })
      throw new Error("Failed to update user")
    }
    return json
  } catch (error) {
    throw new Error("An error occurred while updating user")
  }
}

export async function getAllUsers(url: string): Promise<ApiResponse> {
  try {
    const token = localStorage.getItem("token")
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error("Failed to get users")
    }
    return await response.json()
  } catch (error) {
    throw new Error("An error occurred while getting users")
  }
}

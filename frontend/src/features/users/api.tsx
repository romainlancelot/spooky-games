import { LoginResponse, User } from "./models"

export async function getToken(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
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

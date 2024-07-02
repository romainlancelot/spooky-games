export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  date_joined: string
  is_staff: boolean
  is_superuser: boolean
}

export interface LoginResponse {
  token: string
}

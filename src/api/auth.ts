import http from "@/core/http"

export const authApi = {
  login: (payload: LoginData) => http.post("/auth/login", payload),
  register: (payload: RegisterData) => http.post("/auth/register", payload),
}

export interface LoginData {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  password: string
}

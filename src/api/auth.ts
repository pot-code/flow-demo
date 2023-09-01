import http from "@/core/http"

export const authApi = {
  login: (payload: LoginData) => http.post("/auth/login", payload),
  logout: () => http.put("/auth/logout"),
  register: (payload: RegisterData) => http.post("/auth/register", payload),
  isAuthenticated: () => http.get("/auth/isAuthenticated"),
}

export interface LoginData {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  password: string
}

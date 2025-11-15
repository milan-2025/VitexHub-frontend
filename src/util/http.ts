import type { LoginData } from "@/interfaces/LoginData.interface"
import type { LoginDataSuccessResponse } from "@/interfaces/LoginDataSuccessResponse.interface"
import type { SignupData } from "@/interfaces/SignupData.interface"
import type { SignupDataSuccessResponse } from "@/interfaces/SignupDataSuccessResponse.inerface"
import { QueryClient } from "@tanstack/react-query"
// import type { SignupDataSuucessResponse } from "@/interfaces/SignupDataSuccessResponse.inerface"

// const backendBaseUrl = "http://localhost:3000"
const backendBaseUrl = "https://vitexthub-backend.onrender.com"

export const queryClient = new QueryClient({
  // Optional: Configure default settings here
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

export const signup = async (signUpData: SignupData) => {
  const response = await fetch(backendBaseUrl + "/api/user/sign-up", {
    method: "POST",
    body: JSON.stringify(signUpData),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error during sign up.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: SignupDataSuccessResponse = await response.json()
  return data
}

export const login = async (loginData: LoginData) => {
  const response = await fetch(backendBaseUrl + "/api/user/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    let error: Error | any = new Error("Error during login.")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  let data: LoginDataSuccessResponse = await response.json()
  return data
}

export const handleLocalStorageLogin = (
  token: string | null,
  expirationTime: number | null
) => {
  localStorage.setItem(
    "token",
    JSON.stringify({
      token: token,
    })
  )
  localStorage.setItem(
    "expirationTime",
    JSON.stringify({
      expirationTime: expirationTime,
    })
  )
}

export const getToken = (): string | null => {
  if (localStorage.getItem("token")) {
    console.log("ia am in")
    //@ts-ignore
    const { token } = JSON.parse(localStorage.getItem("token"))
    console.log("token", token)
    return token
  } else {
    return null
  }
}

export const getExpirationTime = (): number | null => {
  if (localStorage.getItem("expirationTime")) {
    const { expirationTime } = JSON.parse(
      //@ts-ignore
      localStorage.getItem("expirationTime")
    )
    return expirationTime
  } else {
    return null
  }
}

export const isTokenExpired = (): Boolean => {
  const expirationTime = getExpirationTime()
  if (expirationTime) {
    const duration = expirationTime - Date.now()
    if (duration > 0) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }
}

export const getRemainingTokenTime = (): number => {
  const expirationTime = getExpirationTime()
  if (expirationTime) {
    const duration = expirationTime - Date.now()
    if (duration > 0) {
      return duration
    } else {
      return -1
    }
  } else {
    return -1
  }
}

export const handleLocalStorageLogout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("expirationTime")
}

export const isLoggedIn = async () => {
  const token = getToken()
  if (!token) {
    // If no token exists, immediately redirect to login
    // throw redirect("/login");
    return false
  }

  if (isTokenExpired()) {
    return false
  }

  try {
    const response = await fetch(
      "https://vitexthub-backend.onrender.com/api/user/validate-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (!response.ok) {
      return false
    }
    return true
  } catch (e) {
    console.log("error while validating token---", e)
    return false
  }
}

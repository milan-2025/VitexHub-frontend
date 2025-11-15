import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import RootLayout from "./pages/RootLayout"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./util/http"
import useAppSelector from "./hooks/useAppSelector"
import { useEffect } from "react"
import {
  getExpirationTime,
  getRemainingTokenTime,
  getToken,
  isLoggedIn,
  isTokenExpired,
} from "./util/authentication"
import useAppDispatch from "./hooks/useAppDispatch"
import { handleLogin, handleLogout } from "./store/userSlice"
import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost"
import AddImageOutlet from "./Components/AddImagesOutlet"
import AddTextOutlet from "./Components/AddTextOutlet"

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Login />,
          loader: async () => {
            if (await isLoggedIn()) {
              return redirect("/home")
            }
          },
        },
        {
          path: "/sign-up",
          element: <Signup />,
          loader: async () => {
            if (await isLoggedIn()) {
              return redirect("/home")
            }
          },
        },
        {
          path: "/home",
          element: <Home />,
          loader: async () => {
            if (!(await isLoggedIn())) {
              return redirect("/")
            }
            return null
          },
        },
        {
          path: "/create-post",
          element: <CreatePost />,
          children: [
            {
              index: true,
              element: <AddImageOutlet />,
            },
            {
              path: "/create-post/add-text",
              element: <AddTextOutlet />,
            },
          ],
          loader: async () => {
            if (!(await isLoggedIn())) {
              return redirect("/")
            }
            return null
          },
        },
      ],
    },
  ])
  const token = useAppSelector((state) => {
    return state.user
  })

  const dispatch = useAppDispatch()
  useEffect(() => {
    //for refresh set token if user is logged in
    if (getToken() && !isTokenExpired() && !token) {
      dispatch(
        handleLogin({
          token: getToken(),
          expirationTime: getExpirationTime(),
        })
      )
    }
  }, [])

  useEffect(() => {
    if (!token) {
      return
    }

    // if(isTokenExpired()){
    // dispatch(handleLogout())
    // return redirect("/")
    // }

    if (isTokenExpired()) {
      dispatch(handleLogout())

      redirect("/")
      return
    }
    const duration = getRemainingTokenTime()
    let timer = setTimeout(() => {
      dispatch(handleLogout())
      // navigate("/")
      return redirect("/")
    }, duration)

    return () => clearTimeout(timer)
  }, [token])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App

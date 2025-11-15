import useAppDispatch from "@/hooks/useAppDispatch"
import useAppSelector from "@/hooks/useAppSelector"
import { handleLogout } from "@/store/userSlice"
import { isLoggedIn } from "@/util/authentication"
import { Menu } from "lucide-react"
import { useEffect, useState } from "react"

const Navbar: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const user = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()
  const logoutClicked = () => {
    dispatch(handleLogout())
  }
  useEffect(() => {
    ;(async () => {
      console.log("isLoggedin---", await isLoggedIn())
      setLoggedIn(await isLoggedIn())
    })()
  }, [user])
  return (
    <>
      <nav className="flex items-center px-5">
        <span className="text-2xl grow font-bold from-neutral-800">
          VitexHub
        </span>
        <ul
          id="laptop-navbar"
          className="md:flex space-x-2.5 text-[1.1rem] hidden"
        >
          <li className="nav-item">Home</li>
          {!loggedIn ? (
            <>
              <li className="nav-item">Login</li>
              <li className="nav-item">Sign Up</li>
            </>
          ) : (
            <li className="nav-item" onClick={logoutClicked}>
              Logout
            </li>
          )}
          <li className="nav-item">Profile</li>
        </ul>
        <Menu className="md:hidden mt-1" />
      </nav>
    </>
  )
}

export default Navbar

import Navbar from "@/Components/Navbar"
import { Outlet } from "react-router-dom"

const RootLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default RootLayout

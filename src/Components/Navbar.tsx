import { Menu } from "lucide-react"

const Navbar: React.FC = () => {
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
          <li className="nav-item">Login</li>
          <li className="nav-item">Sign Up</li>
          <li className="nav-item">Profile</li>
        </ul>
        <Menu className="md:hidden mt-1" />
      </nav>
    </>
  )
}

export default Navbar

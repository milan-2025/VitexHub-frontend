import { Eye } from "lucide-react"
import { Button } from "./ui/button"

const LoginCard: React.FC = () => {
  return (
    <>
      <div className="card">
        <div id="card-header" className="text-center w-full">
          <h5 className="text-2xl font-bold ">Log in to VitexHub</h5>
          <p className="text-sm text-foreground/70 mt-1">
            Welcome back please enter your login details.
          </p>
        </div>

        <div id="card-content" className=" lg:w-[90%] w-full mx-auto mt-6">
          <input
            id="username"
            className="text-input-default"
            placeholder="Username or email"
          />
          <div className="w-full relative">
            <input
              id="password"
              type="password"
              className="text-input-default mt-4 pr-11"
              placeholder="Password"
              autoComplete="new-password"
            />
            <Eye
              className=" absolute right-3 top-[65%] transform -translate-y-1/2 
      h-6 w-6 cursor-pointer "
            />
          </div>
          <div className="w-full text-right mt-5">
            <p className="bold-blue-pointer">Forgot Password ?</p>
          </div>
          <div className="w-full mt-5">
            <Button className="w-full bg-blue-400 rounded-4xl shadow hover:bg-blue-400/70">
              Login
            </Button>
          </div>
          <div className="w-full mt-5 text-center">
            <p className="text-sm text-foreground/70">
              Don't have an account?{" "}
              <span className="bold-blue-pointer">Sign Up</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginCard

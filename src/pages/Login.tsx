import LoginCard from "@/Components/LoginCard"

const Login = () => {
  return (
    <>
      <div className="text-3xl mt-20">
        <div id="login-container" className="w-full flex justify-center">
          <div id="login-card-container" className="lg:w-1/3 md:w-1/2 w-11/12">
            <LoginCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

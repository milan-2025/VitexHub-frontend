import SignupCard from "@/Components/SignupCard"

const Signup: React.FC = () => {
  return (
    <>
      <div className="text-3xl mt-16">
        <div id="signup-container" className="w-full flex justify-center">
          <div id="signup-card-container" className="lg:w-1/3 md:w-1/2 w-11/12">
            <SignupCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup

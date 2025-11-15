import useAppDispatch from "@/hooks/useAppDispatch"
import { resetState } from "@/store/createPostSlice"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom"

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const goToCreatePost = () => {
    dispatch(resetState())
    navigate("/create-post")
  }
  return (
    <>
      <div id="Home-Container" className="flex w-full justify-center">
        <div id="internal-container" className="w-11/12 md:w-2xl pt-6">
          <div className="flex">
            <h2 className="font-medium text-2xl w-full">
              {/* <Link to={"/create-post"}> */}
              <button
                onClick={goToCreatePost}
                className="mt-4 w-full py-1 px-3 md:py-2 md:px-5 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-black/75 transition duration-150 ease-in-out"
              >
                <Plus className="w-5 h-5 inline mr-2 mb-1" /> Create Post
              </button>
              {/* </Link> */}
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

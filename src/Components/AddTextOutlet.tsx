import { ArrowLeft } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { Link } from "react-router-dom"
import { useState } from "react"

const AddTextOutlet: React.FC = () => {
  const [postText, setPostText] = useState("")

  return (
    <>
      <div className="w-full my-4">
        <h3 className="font-medium text-xl w-full">Add text for post</h3>
      </div>
      <div id="textarea-container" className="mb-5">
        <Textarea
          //   rows={11}
          className="text-[1rem] !h-32 bg-white rounded-2xl"
          placeholder="What's on your mind..?"
          //   value={postText}
          onChange={(e) => {
            setPostText(e.target.value)
          }}
        />
      </div>
      <div
        id="action-buttons"
        className="w-full flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0"
      >
        <div className="w-full md:w-1/2">
          <Link to={"/create-post"} className="w-full">
            <button className="w-full py-1 px-3 md:py-2 md:px-5 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-black/75 transition duration-150 ease-in-out">
              <ArrowLeft className="w-5 h-5 inline mr-2 mb-1" /> Back to image
              selection
            </button>
          </Link>
        </div>
        {postText.trim().length > 0 && (
          <div className="w-full  md:w-1/2 ">
            <button className="w-full py-1 px-3 md:py-2 md:px-5 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-150 ease-in-out">
              Preview Post
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default AddTextOutlet

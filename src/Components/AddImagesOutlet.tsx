import type React from "react"
import ImagesCoursel from "@/Components/ImagesCoursel"
import ImageUploader from "@/Components/ImageUploader"
import useAppSelector from "@/hooks/useAppSelector"
import { useNavigate } from "react-router-dom"
// import useAppDispatch from "@/hooks/useAppDispatch"
// import { handleChangeFlow } from "@/store/createPostSlice"

const AddImageOutlet: React.FC = () => {
  const addedImages = useAppSelector((state) => state.createPost.images)
  const navigate = useNavigate()
  //   const dispatch = useAppDispatch()
  const goToAddText = () => {
    // dispatch(
    //   handleChangeFlow({
    //     newFlow: "addTextFlow",
    //   })
    // )
    navigate("/create-post/add-text")
  }
  return (
    <>
      <div className="w-full my-4">
        <ImageUploader />
      </div>
      {addedImages.length > 0 && (
        <>
          <div id="image-preview" className="mt-8">
            <div className="flex mb-4">
              <h2 className="font-medium text-2xl w-full">Saved Images</h2>
            </div>
            <div id="coursel-container">
              <ImagesCoursel />
            </div>
          </div>
          <div id="bottom-section" className="w-full my-8">
            <button
              onClick={goToAddText}
              className="w-full py-3 px-6 bg-black text-white font-semibold rounded-xl shadow-md hover:bg-black/90 transition duration-150 ease-in-out"
            >
              Go to add text section
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default AddImageOutlet

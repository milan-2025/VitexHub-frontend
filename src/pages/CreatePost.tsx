import { Outlet } from "react-router-dom"

const CreatePost: React.FC = () => {
  return (
    <>
      <div id="Home-Container" className="flex w-full justify-center">
        <div id="internal-container" className="w-11/12 md:w-2xl pt-6">
          <div className="flex">
            <h2 className="font-medium text-2xl w-full">Create Post</h2>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  )
}
export default CreatePost

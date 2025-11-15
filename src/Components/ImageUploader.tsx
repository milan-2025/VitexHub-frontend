import React, { useCallback, useState, useMemo } from "react"
import { useDropzone, type DropzoneOptions } from "react-dropzone"
import { Image, X, CloudUpload } from "lucide-react"
import { toast } from "sonner"
import useAppDispatch from "@/hooks/useAppDispatch"
import { handleOnSaveFile } from "@/store/createPostSlice"
import { useNavigate } from "react-router-dom"

// Initialize the global variables (keeping them for consistency)
// In a real TS environment, these would be typed as strings/objects outside the component
// const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;

// --- TypeScript Definitions ---

/**
 * Interface to extend the native File object with the 'preview' URL property.
 */
export interface CustomFile extends File {
  preview: string
}
const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<CustomFile | null>(null)
  const [addAnother, setAddAnother] = useState(false)
  const dispatch = useAppDispatch()

  // Handler to set the new file
  const handleFileUpload = useCallback((newFiles: string | File[]): void => {
    // Since maxFiles is 1, newFiles will only have one item (or zero).
    if (newFiles.length > 0) {
      // We cast the File object to CustomFile here, knowing we will add the 'preview' property later.
      // For strict correctness, we use Object.assign inside useMemo, but for state storage,
      // we store the initial File object.
      setFile(newFiles[0] as CustomFile)
    }
    // NOTE: In a real app, you would initiate the single file upload process here.
  }, [])

  // Use the specific type definition for the onDrop function from DropzoneOptions
  const onDrop: DropzoneOptions["onDrop"] = useCallback(
    (acceptedFiles: string | File[]) => {
      if (acceptedFiles.length) {
        handleFileUpload(acceptedFiles)
      }
    },
    [handleFileUpload]
  )

  const handleRemoveFile = (): void => {
    // Revoke the object URL to avoid memory leaks
    if (file && file.preview) {
      URL.revokeObjectURL(file.preview)
    }
    setFile(null)
  }

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      // CRITICAL: Limit to one file and only image types
      accept: {
        "image/*": [".jpeg", ".png", ".gif", ".svg", ".webp"],
      },
      maxFiles: 1,
      maxSize: 10 * 1024 * 1024, // 10 MB limit
    })

  // Create a preview URL for the image using useMemo for efficiency
  const preview = useMemo((): CustomFile | null => {
    if (file) {
      // Create the URL and assign it to the file object's 'preview' property
      return Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    }
    return null
  }, [file])

  // Dynamic styling for the dropzone
  const dropzoneStyle = `
    flex flex-col items-center justify-center p-8 border-4 border-dashed rounded-xl transition duration-300 ease-in-out
    cursor-pointer text-center space-y-3
    ${
      isDragActive
        ? "border-green-400 bg-green-50 text-green-700 shadow-lg"
        : "border-gray-300 bg-gray-50 text-gray-500 hover:border-green-300 hover:bg-green-50"
    }
  `

  // UI for the single accepted image (must be checked for nullability)
  const imagePreview = preview && (
    <div className="relative w-full   rounded-xl p-4 shadow-lg bg-transparent">
      <div className="flex items-center space-x-4 mb-4">
        <Image className="w-6 h-6 text-green-600 shrink-0" />
        <span className="text-lg font-semibold text-gray-800 truncate">
          {preview.name}
        </span>
        <span className="text-sm text-gray-500 ml-auto">
          ({(preview.size / 1024 / 1024).toFixed(2)} MB)
        </span>
      </div>

      <div className="  rounded-lg overflow-hidden">
        <img
          src={preview.preview}
          className="w-full h-auto object-contain max-h-96"
          alt="Preview"
          // Clean up the URL when the component unmounts or file changes
          onLoad={() => URL.revokeObjectURL(preview.preview)}
        />
      </div>

      <button
        onClick={handleRemoveFile}
        className="mt-4 w-full py-1 px-3 md:py-2 md:px-5 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-150 ease-in-out"
      >
        <X className="w-5 h-5 inline mr-2" /> Remove Image
      </button>
    </div>
  )
  const navigate = useNavigate()

  const handleGoToAddTextSection = () => {
    navigate("/create-post/add-text")
  }

  return (
    // <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-start justify-center font-sans">
    <div className="w-full border border-gray-200  ml-auto mr-auto bg-transparent p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
      {/* <h1 className="text-3xl font-extrabold text-gray-900 border-b pb-2">
          Single Image Uploader (TSX)
        </h1> */}
      <p className="text-gray-700">
        Upload {!addAnother && "a"} {addAnother && `another`} picture. We only
        accept image file (PNG, JPG, GIF, etc.) up to 10MB.
      </p>

      {/* --- Dropzone or Preview --- */}
      {file ? (
        imagePreview
      ) : (
        <div {...getRootProps()} className={dropzoneStyle}>
          <input {...getInputProps()} />
          <CloudUpload className="w-8 h-8" />
          {isDragActive ? (
            <p className="font-semibold text-xl">Drop your image here!</p>
          ) : (
            <p>
              **Drag 'n' drop a single image here**, or **click to select file**
            </p>
          )}
        </div>
      )}

      {/* --- File Rejections / Errors (Only appear when dropping a file that is rejected) --- */}
      {fileRejections.length > 0 && (
        <div className="p-4 bg-red-100 border-l-4 border-red-500 rounded-lg">
          <h3 className="text-sm font-bold text-red-800 mb-2">Upload Failed</h3>
          <ul className="list-disc list-inside space-y-1 text-red-700 text-sm">
            {
              //@ts-ignore
              fileRejections.map(({ file, errors }, index) => (
                <li key={index}>
                  **{file.name}**: {errors.map((e) => e.message).join("; ")}
                </li>
              ))
            }
          </ul>
        </div>
      )}

      {/* --- Upload Button (Visible only when a file is ready) --- */}
      {file && (
        <div className="w-full flex justify-between space-x-2">
          <button
            onClick={() => {
              dispatch(handleOnSaveFile({ file }))
              handleRemoveFile()
              setAddAnother(true)
              console.log(file)
              toast.success("Image saved", {
                classNames: {
                  toast: "!bg-green-600 !text-white",
                },
                position: "top-right",
              })
            }}
            className="w-1/2 py-1 px-3 md:py-2 md:px-5 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition duration-150 ease-in-out"
          >
            Save image and add another image
          </button>

          <button
            onClick={() => {
              dispatch(handleOnSaveFile({ file }))

              handleRemoveFile()
              //   setAddAnother(true)
              handleGoToAddTextSection()
            }}
            className="w-1/2 py-1 px-3 bg-black text-white font-semibold rounded-xl shadow-md hover:bg-black/90 transition duration-150 ease-in-out"
          >
            Save image and go to add text
          </button>
        </div>
      )}
    </div>
    // </div>
  )
}

export default ImageUploader

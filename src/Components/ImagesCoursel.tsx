import React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/Components/ui/carousel"
// import type { CustomFile } from "./ImageUploader"
import useAppSelector from "@/hooks/useAppSelector"
import useAppDispatch from "@/hooks/useAppDispatch"
import { handleDeleteFile } from "@/store/createPostSlice"

const ImagesCoursel: React.FC = () => {
  const addedImages = useAppSelector((state) => state.createPost.images)
  const dispatch = useAppDispatch()
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  //   const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (!api) {
      return
    }
    // setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api, addedImages])

  const handleDeleteImage = (index: number) => {
    dispatch(handleDeleteFile({ index }))
    setCurrent((oldCurrent) => oldCurrent - 1)
  }

  return (
    <>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {addedImages.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <img
                  src={URL.createObjectURL(image)}
                  className="w-full h-auto object-contain max-h-96"
                  alt="Preview"
                  // Clean up the URL when the component unmounts or file changes
                  // onLoad={() => URL.revokeObjectURL(image.preview)}
                />
                <div className="text-right">
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="mt-4 w-1/2 py-1 px-3 md:py-2 md:px-5 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-150 ease-in-out"
                  >
                    Delete this image
                  </button>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex" />
        <CarouselNext className="hidden md:inline-flex" />
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm">
        {current} of {addedImages.length}
      </div>
    </>
  )
}

export default ImagesCoursel

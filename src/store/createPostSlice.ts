import type { CustomFile } from "@/Components/ImageUploader"
import type { CreatePost } from "@/interfaces/CreatePost.interface"
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

const initialState: CreatePost = {
  text: "",
  images: [],
  flows: ["addImageFlow", "addTextFlow", "previewPostFlow"],
  currentFlow: "addImageFlow",
}

const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    handleOnSaveFile: (
      state,
      action: PayloadAction<{
        file: CustomFile
      }>
    ) => {
      state.images.push(action.payload.file)
    },
    handleDeleteFile: (
      state,
      action: PayloadAction<{
        index: number
      }>
    ) => {
      state.images.splice(action.payload.index, 1)
    },
    handleChangeFlow: (
      state,
      action: PayloadAction<{
        newFlow: string
      }>
    ) => {
      state.currentFlow = action.payload.newFlow
    },
    resetState: (state) => {
      state = initialState
      return state
    },
  },
})

export const {
  handleOnSaveFile,
  handleChangeFlow,
  handleDeleteFile,
  resetState,
} = createPostSlice.actions

export default createPostSlice

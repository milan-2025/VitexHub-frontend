import type { CustomFile } from "@/Components/ImageUploader"

export interface CreatePost {
  text: string
  images: CustomFile[]
  flows: string[]
  currentFlow: string
}

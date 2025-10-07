import { useEffect, useState } from "react"

interface IsValid {
  message: string
  chk: boolean
}
const useFormValidation = (initialValue: string, validationFn: any) => {
  const [value, setValue] = useState(initialValue)
  const [didEdit, setDidEdit] = useState(false)
  const [error, setError] = useState<IsValid | null>(null)
  //   let hasError: IsValid | undefined
  const handleBlur = () => {
    setDidEdit(true)
    let result = validationFn()
    setError(result)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDidEdit(true)
    setValue(e.target.value)
    let result = validationFn()
    setError(result)
  }

  useEffect(() => {
    if (value && value.trim().length > 0) {
      setDidEdit(true)
      let result = validationFn()
      setError(result)
    }
  }, [value])

  return {
    value,
    didEdit,
    error,
    setValue,
    setDidEdit,
    handleBlur,
    handleChange,
  }
}

export default useFormValidation

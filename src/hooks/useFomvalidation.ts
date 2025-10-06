import { useEffect, useState } from "react"

interface IsValid {
  message: string
  chk: boolean
}
const useFormValidation = (
  initialValue: string,
  validationFn: (val: string) => IsValid
) => {
  const [value, setValue] = useState(initialValue)
  const [didEdit, setDidEdit] = useState(false)
  let hasError: IsValid
  const handleBlur = () => {
    setDidEdit(true)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDidEdit(true)
    setValue(e.target.value)
  }
  if (didEdit) {
    hasError = validationFn(value)
  }

  useEffect(() => {
    if (value && value.trim().length > 0) {
      setDidEdit(true)
    }
  }, [value])

  return {
    value,
    didEdit,
    setValue,
    setDidEdit,
    handleBlur,
    handleChange,
  }
}

export default useFormValidation

import { Eye, EyeOff } from "lucide-react"
import { Button } from "./ui/button"
import useFormValidation from "@/hooks/useFomvalidation"
import {
  doConfimPasswordMatch,
  isNotEmpty,
  isValidEmail,
  isValidPassword,
  isValidUserName,
} from "@/util/validations"
import { useState } from "react"
import { Link } from "react-router-dom"

const SignupCard = () => {
  const {
    value: emailValue,
    didEdit: emailDidEdit,
    error: emailError,
    handleBlur: emailHandleBlur,
    handleChange: emailHandleChange,
  } = useFormValidation("", () => {
    if (isNotEmpty(emailValue).chk) {
      return isValidEmail(emailValue)
    } else {
      return isNotEmpty(emailValue)
    }
  })

  const {
    value: usernameValue,
    didEdit: usernameDidEdit,
    error: usernameError,
    handleBlur: usernameHandleBlur,
    handleChange: usernameHandleChange,
  } = useFormValidation("", () => {
    if (isNotEmpty(usernameValue).chk) {
      return isValidUserName(usernameValue)
    } else {
      return isNotEmpty(usernameValue)
    }
  })

  const {
    value: passwordValue,
    didEdit: passwordDidEdit,
    error: passwordError,
    handleBlur: passwordBlur,
    handleChange: passwordHandleChange,
  } = useFormValidation("", () => {
    if (isNotEmpty(passwordValue).chk) {
      return isValidPassword(passwordValue)
    } else {
      return isNotEmpty(passwordValue)
    }
  })

  const {
    value: confirmpasswordValue,
    didEdit: confirmpasswordDidEdit,
    error: confirmpasswordError,
    handleBlur: confirmpasswordBlur,
    handleChange: confirmpasswordHandleChange,
  } = useFormValidation("", () => {
    if (isNotEmpty(confirmpasswordValue).chk) {
      return doConfimPasswordMatch(confirmpasswordValue, passwordValue)
    } else {
      return isNotEmpty(confirmpasswordValue)
    }
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState)
  }
  return (
    <>
      <div className="card">
        <div id="card-header" className="text-center w-full">
          <h5 className="text-2xl font-bold ">Create your account</h5>
          <p className="text-sm text-foreground/70 mt-1">
            Join VitexHub and start sharing.
          </p>
        </div>
        <div id="card-content" className=" lg:w-[90%] w-full mx-auto mt-6">
          <input
            id="username"
            className="text-input-default"
            placeholder="Username"
            value={usernameValue}
            onBlur={usernameHandleBlur}
            onChange={usernameHandleChange}
          />
          {usernameDidEdit && usernameError && !usernameError.chk && (
            <p className="error-text ml-2 mt-1">{usernameError.message}</p>
          )}
          <input
            id="email"
            className="text-input-default mt-4"
            placeholder="Email"
            onBlur={emailHandleBlur}
            onChange={emailHandleChange}
            value={emailValue}
          />
          {emailDidEdit && emailError && !emailError.chk && (
            <p className="error-text ml-2 mt-1">{emailError.message}</p>
          )}
          <div className="w-full relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="text-input-default mt-4 pr-11"
              placeholder="Password"
              autoComplete="new-password"
              value={passwordValue}
              onBlur={passwordBlur}
              onChange={passwordHandleChange}
            />
            {!showPassword && (
              <Eye
                className="absolute right-3 top-[65%] transform -translate-y-1/2 
      h-6 w-6 cursor-pointer "
                onClick={toggleShowPassword}
              />
            )}

            {showPassword && (
              <EyeOff
                className="absolute right-3 top-[65%] transform -translate-y-1/2 
      h-6 w-6 cursor-pointer "
                onClick={toggleShowPassword}
              />
            )}
          </div>
          {passwordDidEdit && passwordError && !passwordError.chk && (
            <p className="error-text ml-2 mt-1">{passwordError.message}</p>
          )}
          <div className="w-full relative">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              className="text-input-default mt-4 pr-11"
              placeholder="Confirm password"
              autoComplete="new-confirm-password"
              value={confirmpasswordValue}
              onBlur={confirmpasswordBlur}
              onChange={confirmpasswordHandleChange}
            />
            {!showConfirmPassword && (
              <Eye
                className="absolute right-3 top-[65%] transform -translate-y-1/2 
      h-6 w-6 cursor-pointer "
                onClick={toggleShowConfirmPassword}
              />
            )}

            {showConfirmPassword && (
              <EyeOff
                className="absolute right-3 top-[65%] transform -translate-y-1/2 
      h-6 w-6 cursor-pointer "
                onClick={toggleShowConfirmPassword}
              />
            )}
          </div>
          {confirmpasswordDidEdit &&
            confirmpasswordError &&
            !confirmpasswordError.chk && (
              <p className="error-text ml-2 mt-1">
                {confirmpasswordError.message}
              </p>
            )}

          <div className="w-full mt-5">
            <Button className="w-full bg-blue-400 rounded-4xl shadow hover:bg-blue-400/80">
              Create Account
            </Button>
          </div>
          <div className="w-full mt-5 text-center">
            <p className="text-sm text-foreground/70">
              Already have an account?{" "}
              <Link to={"/"}>
                <span className="bold-blue-pointer">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignupCard

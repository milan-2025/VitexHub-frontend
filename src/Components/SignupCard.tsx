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
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { signup } from "@/util/http"
import useAppDispatch from "@/hooks/useAppDispatch"
// import { hideLoader, showLoader } from "@/store/loaderSlice"
import LoadingScreen from "./LoadingScreen"
import { toast } from "sonner"
import { handleLogin } from "@/store/userSlice"

const SignupCard: React.FC = () => {
  const dispatch = useAppDispatch()
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
  const [serverFieldErrors, setServerFieldErrors] = useState<any>({})

  const navigate = useNavigate()

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState)
  }
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState)
  }
  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: signup,
    retry: false,
    onSuccess: (data) => {
      // dispatch(hideLoader())
      console.log("data on success", data)
      let expirationTime = Date.now() + 9 * 60 * 60 * 1000
      dispatch(
        handleLogin({
          token: data.token,
          expirationTime: expirationTime,
        })
      )
      toast.success("signed up successfully", {
        classNames: {
          toast: "!bg-green-600 !text-white",
        },
        position: "top-right",
      })
      navigate("/home", {
        replace: true,
      })
    },
  })
  const handleSignUp = () => {
    usernameHandleBlur()
    emailHandleBlur()
    passwordBlur()
    confirmpasswordBlur()
    if (
      usernameValue.trim().length == 0 ||
      emailValue.trim().length == 0 ||
      passwordValue.trim().length == 0 ||
      confirmpasswordValue.trim().length == 0
    ) {
      return
    } else if (
      (usernameError && !usernameError.chk) ||
      (emailError && !emailError.chk) ||
      (passwordError && !passwordError.chk) ||
      (confirmpasswordError && !confirmpasswordError.chk)
    ) {
      return
    }
    let signUpData = {
      username: usernameValue,
      email: emailValue,
      password: passwordValue,
    }
    console.log("signupData----", signUpData)
    mutate(signUpData)
  }
  if (isPending) {
    // dispatch(showLoader())
  }
  if (isError) {
    // dispatch(hideLoader())
    // console.log("error---", error.info)
    //@ts-ignore
    if (error.info) {
      //@ts-ignore

      setServerFieldErrors(error.info.errors)
      //@ts-ignore
      if (error.info.errors.error) {
        toast.error("some error occurred", {
          classNames: {
            toast: "!bg-red-600 !text-white",
          },
          position: "top-right",
        })
      }
    } else {
      console.log(error)
      toast.error("some error occurred", {
        classNames: {
          toast: "!bg-red-600 !text-white",
        },
        position: "top-right",
      })
    }
    reset()
  }
  useEffect(() => {
    setServerFieldErrors({})
  }, [usernameValue, emailValue, passwordValue, confirmpasswordValue])
  return (
    <>
      {isPending && <LoadingScreen />}
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
          {serverFieldErrors.hasOwnProperty("username") && (
            <p className="error-text ml-2 mt-1">{serverFieldErrors.username}</p>
          )}
          <input
            id="email"
            className="text-input-default text-start mt-4"
            placeholder="Email"
            type="text"
            onBlur={emailHandleBlur}
            onChange={emailHandleChange}
            value={emailValue}
          />
          {emailDidEdit && emailError && !emailError.chk && (
            <p className="error-text ml-2 mt-1">{emailError.message}</p>
          )}
          {serverFieldErrors.hasOwnProperty("email") && (
            <p className="error-text ml-2 mt-1">{serverFieldErrors.email}</p>
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
              <Eye className="eye-position" onClick={toggleShowPassword} />
            )}

            {showPassword && (
              <EyeOff className="eye-position " onClick={toggleShowPassword} />
            )}
          </div>
          {passwordDidEdit && passwordError && !passwordError.chk && (
            <p className="error-text ml-2 mt-1">{passwordError.message}</p>
          )}
          {serverFieldErrors.hasOwnProperty("password") && (
            <p className="error-text ml-2 mt-1">{serverFieldErrors.password}</p>
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
                className="eye-position "
                onClick={toggleShowConfirmPassword}
              />
            )}

            {showConfirmPassword && (
              <EyeOff
                className="eye-position "
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
            <Button
              onClick={handleSignUp}
              className="w-full bg-blue-400 rounded-4xl shadow hover:bg-blue-400/80"
            >
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

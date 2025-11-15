import { Eye, EyeOff } from "lucide-react"
import { Button } from "./ui/button"
import useFormValidation from "@/hooks/useFomvalidation"
import { isNotEmpty } from "@/util/validations"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { login } from "@/util/http"
import LoadingScreen from "./LoadingScreen"
import { toast } from "sonner"
import useAppDispatch from "@/hooks/useAppDispatch"
import { handleLogin } from "@/store/userSlice"

const LoginCard: React.FC = () => {
  const {
    value: usernameOrEmail,
    didEdit: usernameOrEmailEdit,
    handleBlur: usernameOrEmailBlur,
    handleChange: usernameOrEmailChange,
    error: usernameOrEmailError,
  } = useFormValidation("", () => {
    return isNotEmpty(usernameOrEmail)
  })

  const {
    value: password,
    didEdit: passwordEdit,
    handleBlur: passwordBlur,
    handleChange: passwordChange,
    error: passwordError,
  } = useFormValidation("", () => {
    return isNotEmpty(password)
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [serverFieldErrors, setServerFieldErrors] = useState<any>({})

  const toggleShowPassword = () => {
    setShowPassword((state) => !state)
  }
  const { mutate, isPending, isError, error, reset } = useMutation({
    mutationFn: login,
    retry: false,
    onSuccess: (data) => {
      // console.log("login on sucess----", data)
      let exp = Date.now() + 9 * 60 * 60 * 1000
      dispatch(
        handleLogin({
          token: data.token,
          expirationTime: exp,
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
  const LoginClicked = () => {
    usernameOrEmailBlur()
    passwordBlur()
    if (usernameOrEmail.trim().length == 0 || password.trim().length == 0) {
      return
    }
    if (
      (usernameOrEmailError && !usernameOrEmailError.chk) ||
      (passwordError && !passwordError.chk)
    ) {
      return
    }

    // console.log("login payload---", )
    mutate({
      usernameOrEmail: usernameOrEmail.trim(),
      password: password.trim(),
    })
  }
  if (isError) {
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
  }, [usernameOrEmail, password])
  return (
    <>
      {isPending && <LoadingScreen />}
      <div className="card">
        <div id="card-header" className="text-center w-full">
          <h5 className="text-2xl font-bold ">Log in to VitexHub</h5>
          <p className="text-sm text-foreground/70 mt-1">
            Welcome back please enter your login details.
          </p>
        </div>

        <div id="card-content" className=" lg:w-[90%] w-full mx-auto mt-6">
          <input
            id="username"
            className="text-input-default"
            placeholder="Username or email"
            onChange={usernameOrEmailChange}
            onBlur={usernameOrEmailBlur}
            value={usernameOrEmail}
          />
          {usernameOrEmailEdit &&
            usernameOrEmailError &&
            !usernameOrEmailError.chk && (
              <p className="error-text ml-2 mt-1">
                {usernameOrEmailError.message}
              </p>
            )}
          {serverFieldErrors.hasOwnProperty("usernameOrEmail") && (
            <p className="error-text ml-2 mt-1">
              {serverFieldErrors.usernameOrEmail}
            </p>
          )}
          <div className="w-full relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="text-input-default mt-4 pr-11"
              placeholder="Password"
              autoComplete="new-password"
              onChange={passwordChange}
              onBlur={passwordBlur}
              value={password}
            />
            {!showPassword && (
              <Eye className="eye-position" onClick={toggleShowPassword} />
            )}

            {showPassword && (
              <EyeOff className="eye-position " onClick={toggleShowPassword} />
            )}
          </div>
          {passwordEdit && passwordError && !passwordError.chk && (
            <p className="error-text ml-2 mt-1">{passwordError.message}</p>
          )}
          {serverFieldErrors.hasOwnProperty("password") && (
            <p className="error-text ml-2 mt-1">{serverFieldErrors.password}</p>
          )}
          <div className="w-full text-right mt-5">
            <p className="bold-blue-pointer">Forgot Password ?</p>
          </div>
          <div className="w-full mt-5">
            <Button
              onClick={LoginClicked}
              className="w-full bg-blue-400 rounded-4xl shadow hover:bg-blue-400/70"
            >
              Login
            </Button>
          </div>
          <div className="w-full mt-5 text-center">
            <p className="text-sm text-foreground/70">
              Don't have an account?{" "}
              <Link to={"/sign-up"}>
                <span className="bold-blue-pointer">Sign Up</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginCard

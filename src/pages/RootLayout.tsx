// import LoadingScreen from "@/Components/LoadingScreen"
import Navbar from "@/Components/Navbar"
// import useAppSelector from "@/hooks/useAppSelector"
import { Outlet, useNavigation } from "react-router-dom"

import { Toaster } from "@/Components/ui/sonner"
import LoadingScreen from "@/Components/LoadingScreen"

const RootLayout: React.FC = () => {
  // const showLoader = useAppSelector((state) => state.loader)
  const navigation = useNavigation()
  let isLoading = navigation.state == "loading"

  return (
    <>
      {isLoading && <LoadingScreen />}
      <Navbar />
      <Outlet />
      <Toaster />

      {/* {showLoader.showLoader && <LoadingScreen />} */}
    </>
  )
}

export default RootLayout

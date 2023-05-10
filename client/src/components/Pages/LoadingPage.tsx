import { AnimationLoader } from "components/Molecules";
import Atoms from "components/Atoms";

const LoadingPage = () => {
  return(
    <Atoms.Div
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <AnimationLoader
        name="loader"
        path="https://assets7.lottiefiles.com/packages/lf20_p8bfn5to.json"
        size="400px"
      />

    </Atoms.Div>
  )
}

export default LoadingPage
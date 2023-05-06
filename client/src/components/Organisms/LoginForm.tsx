import Atoms from 'components/Atoms'
import {
  Form
} from "components/Molecules"

const LoginForm = () => {
  return (
    <Form
      height="400px"
      TypeofForm="Login"
    >
      <Atoms.Input />

    </Form>
  )
}

export default LoginForm;
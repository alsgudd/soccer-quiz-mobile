import Atoms from "components/Atoms";
import { Content, Form } from "components/Molecules";
import { useForm } from "src/hooks";
import { validateSignUp } from "src/utils";

const SignUpForm = () => {
  const {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit
  } = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    onSubmit: (values) => {},
    validate: validateSignUp
  });

  return (
    <Content>
      <Form height="400px" handleSubmit={handleSubmit}>
      <Atoms.Span>Name</Atoms.Span>
        <Atoms.Input
          type="name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        <Atoms.Span>Email</Atoms.Span>
        <Atoms.Input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <Atoms.Span>Password</Atoms.Span>
        <Atoms.Input
          type="password"
          name="password"
          value={values.email}
          onChange={handleChange}
        />
        <Atoms.Span>Confirm Password</Atoms.Span>
        <Atoms.Input
          type="confirmPassword"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
        />
        <br />
        <Atoms.Button
          type="submit"
          designType="primary400"
          height="40px"
          width="100%"
          borderRadius="8px"
          fontSize="18px"
        >
          SIGN UP
        </Atoms.Button>
      </Form>
    </Content>
  )
}

export default SignUpForm;
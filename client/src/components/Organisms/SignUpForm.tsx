import Atoms from "components/Atoms";
import { Content, Form } from "components/Molecules";
import { useForm } from "src/hooks";
import { validateSignUp, mycustomAxios } from "src/utils";


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
    onSubmit: (values) => {
      const body = {
        name: values.name,
        email: values.email,
        password: values.password
      }
      mycustomAxios.post('/auth/signup', body)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        })

    },
    validate: validateSignUp
  });

  return (
    <Content>
      <Form height="300px" onSubmit={handleSubmit}>
        <Atoms.Span>Name</Atoms.Span>
        <Atoms.Input
          type="name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <Atoms.Span color="var(--red-400)">{errors.name}</Atoms.Span>}
        <Atoms.Span>Email</Atoms.Span>
        <Atoms.Input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <Atoms.Span color="var(--red-400)">{errors.email}</Atoms.Span>}
        <Atoms.Span>Password</Atoms.Span>
        <Atoms.Input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <Atoms.Span>Confirm Password</Atoms.Span>
        <Atoms.Input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
        />
        {errors.password && <Atoms.Span color="var(--red-400)">{errors.password}</Atoms.Span>}
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
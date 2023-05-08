import axios from "axios";
import Atoms from "components/Atoms";
import { Content, Form } from "components/Molecules";
import { useForm } from "src/hooks";
import { validateSignUp } from "src/utils";
import { useNavigate } from "react-router";

const SignUpForm = () => {
  const navigate = useNavigate();
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
      axios({
        url: `${process.env.REACT_APP_SERVER_URL}/auth/signup`,
        method: "POST",
        data: body
      }).then((response) => {
        console.log(response.data);
        window.alert('SignUp Success! Please Login😊');
        navigate('/login');
      }).catch((e) => {
        console.log(e);
        if(e.response.data.error) {
          window.alert(e.response.data.error);
        }
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
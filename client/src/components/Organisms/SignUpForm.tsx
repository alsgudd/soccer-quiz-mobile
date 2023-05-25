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
      const serverURL = process.env.REACT_APP_SERVER_URL
      const body = {
        name: values.name,
        email: values.email,
        password: values.password
      }

      axios.post(`${serverURL}/auth/signup`, body, {
        withCredentials: true
      }).then((response) => {
        window.alert('SignUp Success! Please Login😊');
        navigate('/login');
      }).catch((e) => {
        if (e.response.data.error) {
          window.alert(e.response.data.error);
        }
      })
    },
    validate: validateSignUp
  });

  return (
    <Content>
      <Form height="300px" onSubmit={handleSubmit}>
        <Atoms.Label>
          Name
          <Atoms.Input
            type="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <Atoms.Span color="var(--red-400)">{errors.name}</Atoms.Span>}
        </Atoms.Label>
        <Atoms.Label>
          Email
          <Atoms.Input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <Atoms.Span color="var(--red-400)">{errors.email}</Atoms.Span>}
        </Atoms.Label>
        <Atoms.Label>
          Password
          <Atoms.Input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
        </Atoms.Label>
        <Atoms.Label>
          Confirm Password
          <Atoms.Input
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.password && <Atoms.Span color="var(--red-400)">{errors.password}</Atoms.Span>}
        </Atoms.Label>
        <br />
        <Atoms.Button
          type="submit"
          designType="primary400"
          height="40px"
          width="100%"
          borderRadius="8px"
          fontSize="18px"
          disabled={submitting}
        >
          SIGN UP
        </Atoms.Button>
      </Form>
    </Content>
  )
}

export default SignUpForm;
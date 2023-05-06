import Atoms from "components/Atoms";
import { Content, Form } from "components/Molecules";
import { useNavigate } from "react-router";
import { useForm } from "src/hooks";
import { validateLogin } from "src/utils";

const LoginForm = () => {
  const navigate = useNavigate();

  const { values, errors, submitting, handleChange, handleSubmit } = useForm({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {},
    validate: validateLogin,
  });

  return (
    <Content>
      <Form height="400px" handleSubmit={handleSubmit}>
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
        <br />
        <Atoms.Button
          type="submit"
          designType="primary400"
          height="40px"
          width="100%"
          borderRadius="8px"
          fontSize="18px"
        >
          LOGIN
        </Atoms.Button>
        <Atoms.Span
          color="var(--primary-400)"
          marginTop="4px"
          cursor="pointer"
          onClick={() => navigate("/signup")}
        >
          Create an account
        </Atoms.Span>
      </Form>
    </Content>
  );
};

export default LoginForm;

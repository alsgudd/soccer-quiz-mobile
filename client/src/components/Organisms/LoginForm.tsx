import axios from "axios";
import Atoms from "components/Atoms";
import { Content, Form } from "components/Molecules";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { useForm } from "src/hooks";
import { validateLogin } from "src/utils";
import { UserNameState } from "src/recoil";

const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(UserNameState)
  const {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit
  } = useForm({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      const body = {
        email: values.email,
        password: values.password
      }
      axios({
        url: `${process.env.REACT_APP_SERVER_URL}/auth/login`,
        method: "POST",
        withCredentials: true,
        data: body
      }).then((response) => {
        console.log(response);
        if (response.data.name) {
          window.alert(`Nice to meet you, ${response.data.name} 👋`);
          setUser(response.data.name);
          navigate('/');
        }
      }).catch((e) => {
        console.log(e);
        if (e.response.data.error) {
          window.alert(e.response.data.error);
        }
      })
    },
    validate: validateLogin,
  });

  return (
    <Content>
      <Form height="300px" onSubmit={handleSubmit}>
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
        {errors.password && <Atoms.Span color="var(--red-400)">{errors.password}</Atoms.Span>}

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

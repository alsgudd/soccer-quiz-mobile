import axios from "axios";
import Atoms from "components/Atoms";
import { Content, Form } from "components/Molecules";
import { useLocation, useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import { useForm } from "src/hooks";
import { IsLoggedInState } from "src/recoil";
import { validateLogin } from "src/utils";

const LoginForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const setIsLoggedIn = useSetRecoilState(IsLoggedInState);
  const directPage = (name: string) => {
    if (state) {
      navigate(state);
    } else {
      window.alert(`Nice to meet you, ${name} 👋`);
      navigate('/')
    }
  }
  const {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit
  } = useForm({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      const serverURL = process.env.REACT_APP_SERVER_URL;
      const body = {
        email: values.email,
        password: values.password
      }
      axios({
        url: `${serverURL}/auth/login`,
        method: "POST",
        withCredentials: true,
        data: body
      }).then((response) => {
        console.log(response);
        if (response.data.name) {
          setIsLoggedIn(true);
          directPage(response.data.name);
        }
      }).catch((e) => {
        console.log(e);
        if (e.response?.data?.error) {
          window.alert(e.response.data.error);
        } else {
          window.alert("unknown Error Occur! Please try again! 🥲")
        }
      })
    },
    validate: validateLogin,
  });
  return (
    <Content>
      <Form height="300px" onSubmit={handleSubmit}>
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

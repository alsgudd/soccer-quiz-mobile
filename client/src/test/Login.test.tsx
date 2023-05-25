import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { LoginForm } from "src/components/Organisms";
import axios from "axios";

jest.mock('axios')

describe("Testing LoginForm...", () => {
  beforeEach(() => {

  })
  test("When user don't type anything", () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <LoginForm />
        </RecoilRoot>
      </BrowserRouter>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const emailError = screen.getByText(/Email not Entered/i);
    const pwError = screen.getByText(/Password not Entered/i);

    expect(emailError).toBeInTheDocument();
    expect(pwError).toBeInTheDocument();
  })
  test("When a user does not enter a valid email type & at least 8 character for the password", () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <LoginForm />
        </RecoilRoot>
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText("Email");
    const pwInput = screen.getByLabelText("Password");
    const button = screen.getByRole("button");

    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(pwInput, { target: { value: "1234" } });

    fireEvent.click(button);
    const emailError = screen.getByText(/The Email entered is invalid/i);
    const pwError = screen.getByText(/Please enter at least 8 characters for the password/i);

    expect(emailError).toBeInTheDocument();
    expect(pwError).toBeInTheDocument();
  });

  test("When user enter correct email && password", async () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <LoginForm />
        </RecoilRoot>
      </BrowserRouter>
    );
    const response = { data: { name: "Bob" }};
    (axios.post as jest.Mock).mockImplementation(() => Promise.resolve(response));
    const emailInput = screen.getByLabelText("Email");
    const pwInput = screen.getByLabelText("Password");
    const button = screen.getByRole("button");
    const value = {
      email: "admin@naver.com",
      password: "123456789",
    }
    fireEvent.change(emailInput, { target: { value: "admin@naver.com" } });
    fireEvent.change(pwInput, { target: { value: 123456789 } });

    fireEvent.click(button);
    window.alert = jest.fn();
    await waitFor(() => {
      postAxios(value).then(data => expect(data.name).toEqual("Bob"));
    })
  })

})

const postAxios = async (value: { email: string, password: string }) => {
  const serverURL = process.env.REACT_SERVER_URL;
  const response = await axios.post(`${serverURL}/auth/login`, 
  { data: value },
  { withCredentials: true })

  return response.data;
}
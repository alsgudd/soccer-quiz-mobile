/* eslint-disable */

import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SignUpForm } from "src/components/Organisms";
import axios from "axios";

jest.mock('axios');

describe("SignUpForm Testing...", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <SignUpForm />
        </RecoilRoot>
      </BrowserRouter>
    );
  })
  test("When user entered anything...", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const nameError = screen.getByText(/Name not Entered/i);
    const emailError = screen.getByText(/Email not Entered/i);
    const pwError = screen.getByText(/Password not Entered/i);

    expect(nameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(pwError).toBeInTheDocument();
  })
  test("When a user does not enter a valid email type & at least 8 character for the password", () => {
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const pwInput = screen.getByLabelText("Password");
    const confirmInput = screen.getByLabelText("Confirm Password");

    const button = screen.getByRole("button");

    fireEvent.change(nameInput, { target: { value: "jestTest"}})
    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(pwInput, { target: { value: "1234" } });
    fireEvent.change(confirmInput, { target: { value: "1234" }});


    fireEvent.click(button);
    const emailError = screen.getByText(/The Email entered is invalid/i);
    const pwError = screen.getByText(/Please enter at least 8 characters for the password/i);

    expect(emailError).toBeInTheDocument();
    expect(pwError).toBeInTheDocument();
  });

  test("If confirm password is not correct to password", () => {
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const pwInput = screen.getByLabelText("Password");
    const confirmInput = screen.getByLabelText("Confirm Password");

    const button = screen.getByRole("button");

    fireEvent.change(nameInput, { target: { value: "jestTest"}})
    fireEvent.change(emailInput, { target: { value: "test@jest.com" } });
    fireEvent.change(pwInput, { target: { value: "12345123" } });
    fireEvent.change(confirmInput, { target: { value: "1234123123" }});

    fireEvent.click(button);
    const confirmError = screen.getByText(/Password does not match/i);

    expect(confirmError).toBeInTheDocument();
  })

  test("SignUp Success!", async () => {
    const response = { data: { success: true }};
    (axios.post as jest.Mock).mockImplementation(() => Promise.resolve(response));
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const pwInput = screen.getByLabelText("Password");
    const confirmInput = screen.getByLabelText("Confirm Password");

    const button = screen.getByRole("button");

    const value = {
      name: "jestTest",
      email: "test@jest.com",
      password: "12345123"
    }
    fireEvent.change(nameInput, { target: { value: "jestTest"}})
    fireEvent.change(emailInput, { target: { value: "test@jest.com" } });
    fireEvent.change(pwInput, { target: { value: "12345123" } });
    fireEvent.change(confirmInput, { target: { value: "12345123" }});
    fireEvent.click(button);

    window.alert = jest.fn();
    await waitFor(() => {
      signUpAxios(value).then(data => expect(data.success).toBe(true));
    })

    expect(window.alert).toBeCalledWith("SignUp Success! Please Login😊")
  })
})

interface axiosArg {
  name: string;
  email: string;
  password: string;
}

const signUpAxios = async (value: axiosArg) => {
  const serverURL = process.env.REACT_SERVER_URL;
  const response = await axios.post(`${serverURL}/auth/login`, 
  value,
  { withCredentials: true })

  return response.data;
}
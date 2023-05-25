import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { LoginForm } from "src/components/Organisms";




describe("Testing LoginForm...", () => {
  beforeEach(() => {

  })
  test("When user don't type anything", () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const emailError = screen.getByText(/Email not Entered/i);
    const pwError = screen.getByText(/Password not Entered/i)

    expect(emailError).toBeInTheDocument();
    expect(pwError).toBeInTheDocument();
  })
  test("When a user does not enter a valid email type", () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
    
    const emailInput = screen.getByLabelText("Name");
    const pwInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test" }})


  })

})
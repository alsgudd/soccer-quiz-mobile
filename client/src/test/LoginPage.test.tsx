/* eslint-disable */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from 'components/Organisms';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

let originalAlert: any;

beforeEach(() => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  )
})
// beforeAll(() => {
//   originalAlert = window.alert;
//   window.alert = jest.fn();
// })
// afterAll(() => {
//   window.alert = originalAlert;
// });



describe("Testing LoginForm", () => {

  test("renders login form with email and password inputs", () => {

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("submits login form with valid credentials", async () => {
    axios.post = jest.fn().mockResolvedValueOnce({ data: { name: 'John' } });
    window.alert = jest.fn().mockResolvedValueOnce({ })

    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    const submitButton = screen.getByText('LOGIN');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Nice to meet you, John 👋');
      expect(window.location.pathname).toBe('/');
    })
  })
})

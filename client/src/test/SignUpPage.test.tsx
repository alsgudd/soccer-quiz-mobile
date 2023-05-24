/* eslint-disable */

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { SignUpForm } from "components/Organisms";
import axios from 'axios';


describe('SignUpForm', () => {
  it('handles form submission', async () => {
    const mockServerURL = 'https://example.com';
    const mockResponseData = { success: true };
    const axiosMock = axios as jest.Mocked<typeof axios>;
    axiosMock.post.mockResolvedValueOnce({ data: mockResponseData });

    // Render the component
    render(<SignUpForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByText('SIGN UP'));

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(axiosMock).toHaveBeenCalledWith({
        url: `${mockServerURL}/auth/signup`,
        method: 'POST',
        data: {
          name: 'John Doe',
          email: 'test@example.com',
          password: 'password123',
        },
      });
      expect(window.alert).toHaveBeenCalledWith('SignUp Success! Please Login😊');
      // You can also expect the navigation, if it's possible to test with RTL
    });
  });
});

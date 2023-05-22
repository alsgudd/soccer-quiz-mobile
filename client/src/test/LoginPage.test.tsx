/* eslint-disable */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

import { LoginForm } from 'src/components/Organisms';
import axios from 'axios';


describe('LoginForm', () => {
  beforeEach(() => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <LoginForm />
        </BrowserRouter>
      </RecoilRoot>
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('renders email and password input fields', () => {
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    const mockNavigate = jest.fn();
    const mockSetIsLoggedIn = jest.fn();

    jest.mock('react-router', () => ({
      useNavigate: () => mockNavigate,
      useLocation: () => ({ state: null }),
    }));
    jest.mock('recoil', () => ({
      useSetRecoilState: () => mockSetIsLoggedIn,
    }));

    const email = 'admin@naver.com';
    const password = '12345678';
    const serverURL = process.env.REACT_APP_SERVER_URL;
    const mockPost = jest.spyOn(axios, 'post');
    mockPost.mockResolvedValueOnce({
      data: { name: 'John Doe' },
    });

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: email } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: password } });

    fireEvent.click(screen.getByText('LOGIN'));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith(`${serverURL}/auth/login`, {
        method: 'POST',
        withCredentials: true,
        data: { email, password },
      });
      expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

  });
});

interface validateProps {
  email?: string;
  password?: string;
}
interface errorType {
  email?: string;
  password?: string;
}

const validateLogin = ({ email, password }: validateProps) => {
  let errors: errorType = {}
  if (!email) {
    errors.email = "Email not Entered";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "The Email entered is invalid";
  }

  if (!password) {
    errors.password = "Password not Entered";
  } else if (password.length < 8) {
    errors.password = "Please enter at least 8 characters for the password";
  }

  return errors;
}

export default validateLogin;
interface validateProps {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword: string;
}

interface errorType {
  name?: string;
  email?: string;
  password?: string;
}

const validateSignUp = ({
  name,
  email,
  password,
  confirmPassword
}: validateProps) => {
  let errors: errorType = {};
  if (!name) {
    errors.name = "Name not Entered"
  }

  if (!email) {
    errors.email = "Email not Entered";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "The Email entered is invalid";
  }

  if (!password) {
    errors.password = "Password not Entered";
  } else if (password.length < 8) {
    errors.password = "Please enter at least 8 characters for the password";
  } else if (password !== confirmPassword) {
    errors.password = "Password does not match"
  }
  return errors;
}

export default validateSignUp;
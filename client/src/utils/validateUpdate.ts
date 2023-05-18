interface validateProps {
  currentPassword?: string;
  passwordToChange?: string;
  confirmPassword?: string;
}
interface errorType {
  currentPassword?: string;
  passwordToChange?: string;
  confirmPassword?: string;
}

const validateUpdate = ({ 
  currentPassword, 
  passwordToChange,
  confirmPassword 
}: validateProps) => {
  let errors: errorType = {}
  if (!currentPassword) {
    errors.currentPassword = "Password not Entered";
  } else if (currentPassword.length < 8) {
    errors.currentPassword = "Please enter at least 8 characters for the password";
  }

  if (!passwordToChange) {
    errors.passwordToChange = "Password not Entered";
  } else if (passwordToChange.length < 8) {
    errors.passwordToChange = "Please enter at least 8 characters for the password";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Password not Entered";
  } else if (confirmPassword.length < 8) {
    errors.confirmPassword = "Please enter at least 8 characters for the password";
  } else if (passwordToChange !== confirmPassword) {
    errors.confirmPassword = "Password does not match"
  }

  return errors;
}

export default validateUpdate;
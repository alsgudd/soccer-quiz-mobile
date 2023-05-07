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
    errors.name = "이름이 입력되지 않았습니다."
  }

  if (!email) {
    errors.email = "이메일이 입력되지 않았습니다.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "입력된 이메일이 유효하지 않습니다.";
  }

  if (!password) {
    errors.password = "비밀번호가 입력되지 않았습니다.";
  } else if (password.length < 8) {
    errors.password = "8자 이상의 패스워드를 사용해야 합니다.";
  } else if (password !== confirmPassword) {
    errors.password = "비밀번호가 일치하지 않습니다."
  }

}

export default validateSignUp;
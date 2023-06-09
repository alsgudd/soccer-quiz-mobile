import { ReactNode } from "react";
import styled, { CSSProperties } from "styled-components";
import Atoms from "components/Atoms";

export type FormProps = {
  height?: string;
  marginTop?: string;
  children?: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SForm = styled.form<CSSProperties>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: var(--white);
  height: ${({ height }) => height || "400px"};
  margin-top: ${({ marginTop }) => marginTop};
`

const Form = ({ height, marginTop, children, onSubmit }: FormProps) => {
  return (
    <SForm height={height} onSubmit={onSubmit} marginTop={marginTop} noValidate>
      <Atoms.Div
        display="flex"
        flexDirection="column"
        alignItems="left"
        justifyContent="start"
        height="100%"
        marginTop="20px"
      >
        {children}
      </Atoms.Div>
    </SForm>
  );
};

export default Form;

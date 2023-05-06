import { ReactNode } from "react";
import styled from "styled-components";
import Atoms from "components/Atoms";

export type FormProps = {
  height?: string;
  marginTop?: string;
  TypeofForm: string;
  children?: ReactNode;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: var(--white);
`

const Form = ({ height, marginTop, TypeofForm, children }: FormProps) => {
  return (
    <SForm>
      <Atoms.SubTitle
        textAlign="center"

      >{`${TypeofForm} Form`}</Atoms.SubTitle>
      <Atoms.Div
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
        marginTop="20px"
      >
        {children}
      </Atoms.Div>
    </SForm>
  );
};

export default Form;

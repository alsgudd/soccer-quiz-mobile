import axios from "axios";

import { Modal, Form } from "components/Molecules";
import Atoms from "components/Atoms";
import { useForm } from "src/hooks";
import { validateUpdate } from "src/utils";
import { useNavigate } from "react-router";

import { FaTimes } from "react-icons/fa";

interface UpdateModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

const MypageUpdateModal = ({
  isOpen,
  onClose,
  onConfirm
}: UpdateModalProps) => {
  const navigate = useNavigate();
  const {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit
  } = useForm({
    initialValues: {
      currentPassword: "",
      passwordToChange: "",
      confirmPassword: ""
    },
    onSubmit: (values) => {
      const serverURL = process.env.REACT_APP_SERVER_URL;
      const body = {
        currentPassword: values.currentPassword,
        passwordToChange: values.passwordToChange,
        confirmPassword: values.confirmPassword,
      };
      axios({
        url: `${serverURL}/mypage/modify`,
        method: "PUT",
        data: body,
        withCredentials: true,
      }).then((response) => {
        window.alert('Password change completed. Please log in again. 👋');
        navigate('/login');
        window.location.reload();
      }).catch((e) => {
        if (e.response.data.error) {
          window.alert(e.response.data.error);
          navigate('/');
          window.location.reload();
        }
      })
    },
    validate: validateUpdate
  })



  return (
    <Modal
      isOpen={isOpen}
      height="400px"
    >
      <Atoms.Div
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        position="relative"
      >
        <Atoms.Title margin="16px 0px 16px 0px">
          MODIFY PASSWORD
        </Atoms.Title>
        <Atoms.Button
          position="absolute"
          top="42px"
          right="18px"
          onClick={onClose}
          background="none"
          border="none"
          cursor="pointer"
          zIndex={1}
          fontSize="32px"
        >
          <FaTimes />
        </Atoms.Button>
        <Form 
          onSubmit={handleSubmit}
          marginTop="-20px"
        >
          <Atoms.Span>Current Password</Atoms.Span>
          <Atoms.Input
            type="password"
            name="currentPassword"
            value={values.currentPassword}
            onChange={handleChange}
          />
          {
            errors.currentPassword && 
            <Atoms.Span color="var(--red-400)" fontSize="8px">
              {errors.currentPassword}
            </Atoms.Span>
          }
          <Atoms.Span>Password To Change</Atoms.Span>
          <Atoms.Input
            type="password"
            name="passwordToChange"
            value={values.passwordToChange}
            onChange={handleChange}
          />
          {
            errors.passwordToChange && 
            <Atoms.Span color="var(--red-400)" fontSize="8px">
              {errors.passwordToChange}
            </Atoms.Span>
          }
          <Atoms.Span>Confirm Password To Change</Atoms.Span>
          <Atoms.Input
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {
            errors.confirmPassword && 
            <Atoms.Span color="var(--red-400)" fontSize="8px">
              {errors.confirmPassword}
            </Atoms.Span>
          }
          <br />
          <Atoms.Button
            marginTop="-8px"
            type="submit"
            designType="primary400"
            height="42px"
            width="cal(100% - 10px)"
            borderRadius="8px"
            fontSize="18px"
            disabled={submitting}
          >
            MODIFY
          </Atoms.Button>
        </Form>
      </Atoms.Div>
    </Modal>
  )
}

export default MypageUpdateModal;
import styled from 'styled-components';
import { Status } from '../types';
import Button from './button';

const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-overlay);
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-bg);
  padding: 3rem;
  border-radius: 5px;
  text-align: center;
`;

const Text = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

type ModalProps = {
  status: Status;
  closeModal: () => void;
  action: () => void;
};

export default function modal({ status, closeModal, action }: ModalProps) {
  const { message, isSuccess } = status;
  if (!message) return null;

  function clickHandler() {
    closeModal();
    if (!isSuccess) return;
    action();
  }

  return (
    <Wrapper>
      <Modal>
        <Text>{message}</Text>
        <Button bg="var(--color-bg)" onClick={clickHandler}>
          {isSuccess ? 'OK': 'Пробовать еще'}
        </Button>
      </Modal>
    </Wrapper>
  );
}

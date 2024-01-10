import styled from 'styled-components';
import { ReactNode } from 'react';

const Wrapper = styled.div`
  position: fixed;
  z-index: 20;
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

type ModalProps = {
  children: ReactNode;
};

export default function modal({ children }: ModalProps) {
  return (
    <Wrapper>
      <Modal>{children}</Modal>
    </Wrapper>
  );
}

import { ReactNode } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border-radius: 4px;
  border: 2px solid var(--color-text);
  outline: none;
  cursor: pointer;
  transition: all 0.2s;
  background-color: var(--color-bg);
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;

  & svg {
    width: 100%;
    height: 100%;
    fill: var(--color-text);
    stroke: var(--color-text);
  }

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 500px) {
    width: 3rem;
    height: 3rem;
    border: 1px solid var(--color-text);
  }
`;

type IconButtonProps = {
  children: ReactNode;
  action: () => void;
  title?: string;
};

export default function IconButton({
  children,
  action,
  title,
}: IconButtonProps) {
  return (
    <Button title={title} onClick={action}>
      {children}
    </Button>
  );
}

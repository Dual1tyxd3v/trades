import styled from 'styled-components';

type BtnProps = {
  bg: string;
};

const Button = styled.button<BtnProps>`
  ${(props) => `background: linear-gradient(
    to bottom,
    ${props.bg},
    #52c234,
    ${props.bg}
  );`}
  color: var(--color-text);
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  padding: 1rem 2rem;
  transition: all 0.2s;
  cursor: pointer;
  background-position: center center;

  &:disabled {
    ${(props) => `background: linear-gradient(
      to bottom,
      ${props.bg},
      #dd1818,
      ${props.bg}
    );`}
  }

  &:hover {
    transform: scale(1.1);
    background-size: 200% 200%;
  }

  &:disabled {
  transform: none;
  background-size: 100% 100%;
}
`;

export default Button;

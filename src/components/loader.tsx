import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: var(--color-bg);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;

const Loading = styled.div`
  width: fit-content;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  background: linear-gradient(
      90deg,
      var(--color-text) 50%,
      hwb(0 0% 100% / 0) 0
    )
    right/200% 100%;
  animation: l21 2s infinite linear;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &::before {
    content: 'Loading...';
    color: #0000;
    padding: 0 5px;
    background: inherit;
    background-image: linear-gradient(
      90deg,
      var(--color-bg) 50%,
      var(--color-text) 0
    );
    -webkit-background-clip: text;
    background-clip: text;
  }
`;

export default function Loader() {
  return (
    <Wrapper>
      <Loading />
    </Wrapper>
  );
}

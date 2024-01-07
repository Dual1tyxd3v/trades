import styled from 'styled-components';
import { useCheckAuth } from '../hooks/useCheckAuth';
import Loader from '../components/loader';
import Header from '../components/header';

const Wrapper = styled.div`
  background-color: var(--color-bg);
  margin: 2rem;
  border: 2px solid var(--color-text);
  border-radius: 5px;
`;

export default function Main() {
  const isAuthLoading = useCheckAuth();

  if (isAuthLoading) return <Loader />;

  return (
    <Wrapper>
      {/* <div>Main page</div> */}
      <Header />
    </Wrapper>
  );
}

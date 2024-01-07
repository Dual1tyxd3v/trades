import styled from 'styled-components';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { test } from '../utils/supabase';
import Loader from '../components/loader';

const Wrapper = styled.div`
  background-color: var(--color-bg);
  margin: 2rem;
  border: 2px solid var(--color-text);
  border-radius: 5px;
`;

export default function Main() {
  const isAuthLoading = useCheckAuth();

  if (isAuthLoading) return <Loader />;

  function clicker() {
    test();
  }
  return (
    <Wrapper>
      <div>Main page</div>
      <button onClick={clicker}>Click</button>
    </Wrapper>
  );
}

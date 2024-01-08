import styled from 'styled-components';
import Header from '../components/header';
import { getIsAuth, useAppSelector } from '../store';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  background-color: var(--color-bg);
  margin: 2rem;
  border: 2px solid var(--color-text);
  border-radius: 5px;
`;

export default function Main() {
  const isAuth = useAppSelector(getIsAuth);
  const navigate = useNavigate();
  !isAuth && navigate('/login');

  return (
    <Wrapper>
      {/* <div>Main page</div> */}
      <Header />
    </Wrapper>
  );
}

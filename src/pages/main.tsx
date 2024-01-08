import styled from 'styled-components';
import Header from '../components/header';
import { getIsAuth, useAppSelector } from '../store';
import { useNavigate } from 'react-router-dom';
import Mode from '../components/mode';
import { useEffect } from 'react';

const Wrapper = styled.div`
  background-color: var(--color-bg);
  margin: 4rem 2rem 2rem;
  border: 2px solid var(--color-text);
  border-radius: 5px;
`;

export default function Main() {
  const isAuth = useAppSelector(getIsAuth);
  const navigate = useNavigate();

  useEffect(() => {
    !isAuth && navigate('/login');
  }, []);

  return (
    <>
      <Mode />
      <Wrapper>
        {/* <div>Main page</div> */}
        <Header />
      </Wrapper>
    </>
  );
}

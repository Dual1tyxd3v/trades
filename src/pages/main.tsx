import Header from '../components/header';
import { getIsAuth, useAppSelector } from '../store';
import { useNavigate } from 'react-router-dom';
import Mode from '../components/mode';
import { useEffect } from 'react';
import Trades from '../components/trades';
import Wrapper from '../components/wrapper';

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
        <Header />
        <Trades />
      </Wrapper>
    </>
  );
}

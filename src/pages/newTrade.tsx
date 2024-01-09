import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Mode from '../components/mode';
import Wrapper from '../components/wrapper';
import { useAppSelector, getIsAuth } from '../store';
import RowForm from '../components/rowForm';
import Title from '../components/title';

export default function NewTrade() {
  const isAuth = useAppSelector(getIsAuth);
  const navigate = useNavigate();

  useEffect(() => {
    !isAuth && navigate('/login');
  });

  return (
    <>
      <Mode />
      <Wrapper>
        <Title>Создать новую запись</Title>
        <RowForm /> 
      </Wrapper>
    </>
  );
}

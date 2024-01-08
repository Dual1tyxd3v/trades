import { ChangeEvent, FormEvent, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { login } from '../utils/supabase';
import styled from 'styled-components';
import { getIsAuth, useAppSelector } from '../store';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #000;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0px 10px 20px rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  padding: 2rem;
  text-align: center;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-size: 2rem;
`;

const Input = styled.input`
  padding: 0.4rem 1rem;
  font-size: 1.6rem;
  border: 2px solid #000;
  border-radius: 4px;
`;

const Error = styled.p`
  color: red;
  font-weight: bold;
  font-size: 1.4rem;
`;

export default function Login() {
  const [pass, setPass] = useState('');
  const [loginError, setLoginError] = useState<null | string>(null);
  const navigate = useNavigate();
  const isAuth = useAppSelector(getIsAuth);
  isAuth && navigate('/');

  function changeHandler(e: ChangeEvent) {
    const value = (e.target as HTMLInputElement).value;
    setPass(value);
    setLoginError(null);
  }

  async function submitHandler(e: FormEvent) {
    e.preventDefault();

    const { error } = await login(pass);

    if (error) {
      setLoginError(error);
      return;
    }

    navigate('/');
  }

  return (
    <Wrapper>
      <Container>
        <form onSubmit={submitHandler}>
          <Field>
            <Label htmlFor="pass">Password</Label>
            <Input
              type="text"
              name="pass"
              id="pass"
              value={pass}
              onChange={changeHandler}
            />
            {loginError && <Error>{loginError}</Error>}
          </Field>
          <button className="btn" disabled={pass.length > 5 ? false : true}>
            Login
          </button>
        </form>
      </Container>
    </Wrapper>
  );
}

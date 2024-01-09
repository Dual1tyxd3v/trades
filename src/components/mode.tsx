import styled from 'styled-components';
import { IoMoon } from 'react-icons/io5';
import { useEffect } from 'react';
import { IoSunny } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { getIsDark, useAppDispatch } from '../store';
import { updateisDark } from '../store/actions';

const Button = styled.button`
  border: 1px solid var(--color-text);
  border-radius: 4px;
  position: fixed;
  top: 0.5rem;
  right: 2rem;
  cursor: pointer;
  transition: all 0.2s;
  background-color: var(--color-bg);
  width: 2.5rem;
  height: 2.5rem;

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    fill: var(--color-text);
    stroke: var(--color-text);
    transition: all 0.2s;
  }

  &:hover {
    transform: scale(1.1);
    & svg {
      transform: rotate(359deg);
    }
  }
`;

export default function Mode() {
  const isDark = useSelector(getIsDark);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isDarkMode =
      JSON.parse(localStorage.getItem('isDark') as string) ||
      document.body.classList.contains('dark');

    if (isDarkMode) document.body.classList.add('dark');

    dispatch(updateisDark(isDark));
  }, []);

  function clickHandler() {
    document.body.classList.toggle('dark');
    localStorage.setItem('isDark', JSON.stringify(!isDark));

    dispatch(updateisDark(!isDark));
  }

  return (
    <Button onClick={clickHandler}>
      {!isDark && <IoMoon />}
      {isDark && <IoSunny />}
    </Button>
  );
}

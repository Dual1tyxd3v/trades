import { FaPlus } from 'react-icons/fa';
import { getIsDark, useAppSelector } from '../store';
import IconButton from './iconButton';
import { IoMdRefresh } from 'react-icons/io';
import styled from 'styled-components';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const List = styled.ul`
  display: flex;
  justify-content: flex-end;
  padding: 0 2rem;
  margin: 0 0 2rem auto;

  & li:not(:last-child) {
    margin-right: 0.8rem;
  }
`;

type MenuProps = {
  refresh: () => void;
};

export default function Menu({ refresh }: MenuProps) {
  const isDark = useAppSelector(getIsDark);
  const navigate = useNavigate();

  const newTrade = useCallback(() => navigate('/new'), [navigate]);
  return (
    <List>
      <li>
        <IconButton action={refresh}>
          <IoMdRefresh color={isDark ? '#fff' : '#000'} />
        </IconButton>
      </li>
      <li>
        <IconButton action={newTrade}>
          <FaPlus color={isDark ? '#fff' : '#000'} />
        </IconButton>
      </li>
    </List>
  );
}

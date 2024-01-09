import { FaPlus } from 'react-icons/fa';
import { getIsDark, useAppSelector } from '../store';
import IconButton from './iconButton';
import { IoMdRefresh } from 'react-icons/io';
import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  justify-content: flex-end;
  padding: 0 2rem;

  & li:not(:last-child) {
    margin-right: 0.8rem;
  }
`;

export default function Menu() {
  const isDark = useAppSelector(getIsDark);
  return (
    <List>
      <li>
        <IconButton>
          <IoMdRefresh color={isDark ? '#fff' : '#000'} />
        </IconButton>
      </li>
      <li>
        <IconButton>
          <FaPlus color={isDark ? '#fff' : '#000'} />
        </IconButton>
      </li>
    </List>
  );
}

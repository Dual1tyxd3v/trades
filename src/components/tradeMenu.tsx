import styled from 'styled-components';
import { HiDotsVertical } from 'react-icons/hi';
import { getActiveId, useAppDispatch, useAppSelector } from '../store';
import { updateActiveId } from '../store/actions';
import { MouseEvent, useState } from 'react';
import { BsPencilFill } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Modal from './modal';
import Button from './button';
import { deleteTrade } from '../utils/supabase';

const Wrapper = styled.div`
  position: relative;
`;

const Menu = styled.div`
  position: absolute;
  right: 10px;
  background-color: var(--color-cell-bg);
  color: var(--color-text);
  border-radius: 4px;
  border: 1px solid var(--color-text);
  padding: 0.5rem;
  z-index: 4;
  cursor: auto;
`;

const MenuButton = styled.button`
  background-color: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-text);
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  &:hover {
    background-color: var(--color-text);
    color: var(--color-bg);
  }
`;

const BtnsContainer = styled.div`
  display: flex;
  gap: 5rem;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
  color: var(--color-text);
`;

type TradeMenuProps = {
  id: number;
  refresh: () => void;
};

export default function TradeMenu({ id, refresh }: TradeMenuProps) {
  const activeId = useAppSelector(getActiveId);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function clickHandler(e: MouseEvent) {
    e.stopPropagation();
    dispatch(updateActiveId(id === activeId ? 0 : id));
  }

  async function acceptHandler() {
    setIsLoading(true);
    const resp = await deleteTrade(id);
    setIsLoading(false);
    if (resp) {
      dispatch(updateActiveId(0));
      refresh();
    }
  }
  return (
    <>
      {showModal && (
        <Modal>
          <Text>Вы точно хотите удалить запись?</Text>
          <BtnsContainer>
            <Button
              bg="var(--color-bg)"
              disabled={isLoading}
              onClick={acceptHandler}
            >
              Да
            </Button>
            <Button
              bg="var(--color-bg)"
              disabled={isLoading}
              onClick={() => setShowModal(false)}
            >
              Нет
            </Button>
          </BtnsContainer>
        </Modal>
      )}
      <Wrapper>
        <HiDotsVertical size="2em" onClick={clickHandler} />
        {activeId === id && (
          <Menu>
            <MenuButton>
              Редактировать
              <BsPencilFill />
            </MenuButton>
            <MenuButton onClick={() => setShowModal(true)}>
              Удалить
              <RiDeleteBin6Line />
            </MenuButton>
          </Menu>
        )}
      </Wrapper>
    </>
  );
}

import { useState } from 'react';
import { PositionsType } from '../types';
import styled from 'styled-components';
import PositionRow from './positionRow';
import { formatPositions } from '../utils/moex';

type PositionsProps = {
  data: PositionsType;
};

type ButtonProps = {
  active?: string;
};

const Button = styled.button<ButtonProps>`
  display: block;
  margin: 0 auto;
  background-color: var(--color-cell-bg);
  width: 30rem;
  border: 2px solid var(--color-text);
  border-radius: 5px;
  padding: 0.5rem 0;
  font-weight: bold;
  transition: letter-spacing 0.2s;
  cursor: pointer;
  text-transform: uppercase;
  z-index: 2;
  position: relative;

  ${(props) =>
    props.active && 'border-bottom: none; border-radius:  5px 5px 0 0;'}

  &:hover {
    letter-spacing: 2px;
  }
`;

const Table = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(6, max-content);
  grid-template-rows: repeat(4, max-content);
  justify-content: center;
  border: 2px solid var(--color-text);
  border-radius: 5px;
  font-size: 1.6rem;
`;

type CellProps = {
  rows: string;
  colls: string;
  head?: string;
  color?: string;
};

const Cell = styled.div<CellProps>`
  font-weight: bold;
  grid-column: ${(props) => props.colls};
  grid-row: ${(props) => props.rows};
  border: 1px solid var(--color-text);
  border-collapse: collapse;
  padding: 0.2rem 1rem;

  ${(props) =>
    props.head && 'text-align: center; background-color: var(--color-cell-bg);'}

  ${(props) => props.color && `background-color: ${props.color}`}
`;

const Container = styled.div`
  text-align: center;
`;

export default function Positions({ data }: PositionsProps) {
  const [isShow, setIsShow] = useState(false);

  const { total, change } = data;

  return (
    <Container>
      <Button
        active={isShow ? 'true' : undefined}
        onClick={() => setIsShow((prev) => !prev)}
      >
        {isShow ? 'Скрыть позиции' : 'Показать позиции'} {`(${total.Date})`}
      </Button>
      {isShow && (
        <Table>
          <Cell head="true" colls="1 / 2" rows="1 / 3">
            &nbsp;
          </Cell>
          <Cell
            color={
              formatPositions(total.PhysicalLong) >
              formatPositions(total.PhysicalShort)
                ? 'var(--color-long)'
                : 'var(--color-short)'
            }
            head="true"
            colls="2 / 4"
            rows="1 / 2"
          >
            Физики
          </Cell>
          <Cell head="true" colls="2 / 3" rows="2 / 3">
            Long
          </Cell>
          <Cell head="true" colls="3 / 4" rows="2 / 3">
            Short
          </Cell>
          <Cell
            head="true"
            colls="4 / 6"
            rows="1 / 2"
            color={
              formatPositions(total.JuridicalLong) >
              formatPositions(total.JuridicalShort)
                ? 'var(--color-long)'
                : 'var(--color-short)'
            }
          >
            Юрики
          </Cell>
          <Cell head="true" colls="4 / 5" rows="2 / 3">
            Long
          </Cell>
          <Cell head="true" colls="5 / 6" rows="2 / 3">
            Short
          </Cell>
          <Cell head="true" colls="6 / 7" rows="1 / 3">
            Итого
          </Cell>
          <PositionRow data={total} label="Открытые позиции" />
          <PositionRow data={change} label="Изменения" />
        </Table>
      )}
    </Container>
  );
}

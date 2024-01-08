import styled from 'styled-components';
import { Position } from '../types';

type PositionRowProps = {
  label: string;
  data: Position;
};

const Cell = styled.div`
  border: 1px solid var(--color-text);
  border-collapse: collapse;
  padding: 0.2rem 1rem;
`;

export default function PositionRow({ data, label }: PositionRowProps) {
  const {
    JuridicalLong,
    JuridicalShort,
    PhysicalLong,
    PhysicalShort,
    Summary,
  } = data;
  return (
    <>
      <Cell>{label}</Cell>
      <Cell>{PhysicalLong}</Cell>
      <Cell>{PhysicalShort}</Cell>
      <Cell>{JuridicalLong}</Cell>
      <Cell>{JuridicalShort}</Cell>
      <Cell>{Summary}</Cell>
    </>
  );
}

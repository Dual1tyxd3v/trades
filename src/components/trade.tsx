/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from 'styled-components';
import { TradesRow } from '../types';
import { getTradeColor } from '../utils/moex';
import { useState } from 'react';
import TradeMenu from './tradeMenu';
import { getActiveId, useAppSelector } from '../store';

type WrapperProps = {
  color: string;
};

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: repeat(7, 11%) 1fr 20px;
  align-items: center;
  font-weight: bold;
  background-color: ${(props) => props.color};
  color: #000;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin: 0 3rem;
  cursor: pointer;
  border: 1px solid var(--color-text);
  position: relative;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

type OverlayProps = {
  display: string;
};

const Overlay = styled.div<OverlayProps>`
  position: absolute;
  display: ${(props) => props.display};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  background-color: var(--color-overlay);
`;

const Cell = styled.p`
  font-size: 1.6rem;
`;

const Image = styled.img`
  grid-column: 1 / -1;
  max-width: 40rem;
  justify-self: center;
  margin: 1rem 0;
`;

type TradeProps = {
  data: TradesRow;
  refresh: () => void;
};

export default function Trade({ data, refresh }: TradeProps) {
  const [showImage, setShowImage] = useState(false);
  const activeId = useAppSelector(getActiveId);

  const { tp, sl, price, comment, img, date, type, move, id, lots } = data;
  const color = getTradeColor(data);
  return (
    <Wrapper color={color} onClick={() => setShowImage((prev) => !prev)}>
      <Overlay display={activeId !== id && activeId ? 'block' : 'none'} />
      <Cell>{date}</Cell>
      <Cell>{price.toFixed(3)}</Cell>
      <Cell>{lots}</Cell>
      <Cell>{tp?.toFixed(3)}</Cell>
      <Cell>{sl?.toFixed(3) || 0}</Cell>
      <Cell>{type.toUpperCase()}</Cell>
      <Cell>{move}</Cell>
      <Cell>{comment ? comment : '-'}</Cell>
      <TradeMenu refresh={refresh} id={id} img={img} />
      {showImage && img && <Image src={img} />}
    </Wrapper>
  );
}

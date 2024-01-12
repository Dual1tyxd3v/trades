import styled from 'styled-components';
import { TradesRow } from '../types';
import { getTradeColor } from '../utils/moex';
import { MouseEvent, useState } from 'react';
import TradeMenu from './tradeMenu';
import { getActiveId, useAppSelector } from '../store';
import Button from './button';

type WrapperProps = {
  color: string;
};

const Wrapper = styled.div<WrapperProps>`
  display: grid;
  grid-template-columns: repeat(7, 11%) 1fr 2rem;
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

  @media (max-width: 500px) {
    grid-template-columns: repeat(6, 11%) 1fr 2rem;
    grid-column-gap: 1rem;
    justify-items: center;
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

type CellProps = {
  additional?: string;
};

const Cell = styled.p<CellProps>`
  font-size: 1.6rem;
  /* ${(props) => (props.additional ? 'grid-row: 2 / 3' : '')} */
  @media (max-width: 500px) {
    ${(props) => (props.additional ? 'grid-row: 2 / 3; grid-column: 1 / -1' : '')}
  }
`;

const Image = styled.img`
  grid-column: 1 / -1;
  max-width: 40rem;
  justify-self: center;
  margin: 1rem 0;
`;

const Details = styled.div`
  position: fixed;
  z-index: 130;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: var(--color-overlay);
`;

const DetailsContainer = styled.div`
  position: fixed;
  width: 90vw;
  height: 90vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-bg);
  color: var(--color-text);
  border-radius: 5px;
  padding: 2rem 3rem;
  display: flex;
  gap: 2rem;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const DetailsImage = styled.img`
  max-width: 70%;
  object-fit: contain;

  @media (max-width: 500px) {
    max-width: 100%;
  }
`;

const DetailsDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DetailsText = styled.p`
  font-size: 2rem;
  margin-bottom: 6rem;
`;

type TradeProps = {
  data: TradesRow;
  refresh: () => void;
};

export default function Trade({ data, refresh }: TradeProps) {
  const [showImage, setShowImage] = useState(false);
  const activeId = useAppSelector(getActiveId);
  const [showDetails, setShowDetails] = useState(false);

  const { tp, sl, price, comment, img, date, type, move, id, lots } = data;
  const color = getTradeColor(data);

  function clickHandler(e: MouseEvent) {
    e.stopPropagation();
    setShowDetails(true);
  }
  return (
    <>
      {showDetails && (
        <Details>
          <DetailsContainer>
            <DetailsImage src={img} />
            <DetailsDescription>
              <DetailsText>{comment}</DetailsText>
              <Button
                bg="var(--color-bg)"
                onClick={() => setShowDetails(false)}
              >
                Закрыть
              </Button>
            </DetailsDescription>
          </DetailsContainer>
        </Details>
      )}
      <Wrapper color={color} onClick={() => setShowImage((prev) => !prev)}>
        <Overlay display={activeId !== id && activeId ? 'block' : 'none'} />
        <Cell>{date}</Cell>
        <Cell>{price.toFixed(3)}</Cell>
        <Cell>{lots}</Cell>
        <Cell>{tp ? tp.toFixed(3) : 0}</Cell>
        <Cell>{sl ? sl.toFixed(3) : 0}</Cell>
        <Cell>{type.toUpperCase()}</Cell>
        <Cell>{move}</Cell>
        <Cell additional="yes">{comment ? comment : '-'}</Cell>
        <TradeMenu refresh={refresh} id={id} img={img} />
        {showImage && img && <Image src={img} onClick={clickHandler} />}
      </Wrapper>
    </>
  );
}

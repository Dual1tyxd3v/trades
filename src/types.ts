export type Options = {
  step: number;
  go: number;
};

export type InitState = {
  go: number;
  step: number;
  balance: number;
  isAuth: boolean;
};

export type HeadRowData = {
  label: string;
  data: number | string | null;
};

export type PositionsType = {
  total: Position;
  change: Position;
};

export type Position = {
  Date: string;
  JuridicalLong: string;
  JuridicalShort: string;
  PhysicalLong: string;
  PhysicalShort: string;
  Summary: string;
};

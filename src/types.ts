export type Options = {
  step: number;
  go: number;
};

export type InitState = {
  go: number;
  step: number;
  balance: number;
  isAuth: boolean;
  isDark: boolean;
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

export type TradesRow = {
  id: number;
  date: string;
  price: number;
  type: string;
  tp: number | null;
  sl: number | null;
  comment: string;
  img: string;
  move: number;
};

export type TradesRows = TradesRow[];

export type Status = {
  message: string;
  isSuccess: boolean;
};

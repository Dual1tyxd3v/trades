import { createAction } from '@reduxjs/toolkit';

export const updateGO = createAction('updateGO', (value: number) => ({
  payload: value,
}));
export const updateStep = createAction('updateStep', (value: number) => ({
  payload: value,
}));

export const updateBalance = createAction('updateBalance', (value: number) => ({
  payload: value,
}));

export const updateIsAuth = createAction('updateIsAuth', (value: boolean) => ({
  payload: value,
}));

export const updateisDark = createAction('updateIsDark', (value: boolean) => ({
  payload: value,
}));

export const updateActiveId = createAction(
  'updateActiveId',
  (value: number) => ({ payload: value })
);

import { configureStore, createReducer } from '@reduxjs/toolkit';
import {
  updateActiveId,
  updateGO,
  updateIsAuth,
  updateStep,
  updateisDark,
} from './actions';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { InitState } from '../types';

const initState: InitState = {
  go: 0,
  step: 0,
  isAuth: false,
  isDark: false,
  activeId: 0,
};

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(updateGO, (state, action) => {
      state.go = action.payload;
    })
    .addCase(updateStep, (state, action) => {
      state.step = action.payload;
    })
    .addCase(updateIsAuth, (state, action) => {
      state.isAuth = action.payload;
    })
    .addCase(updateisDark, (state, action) => {
      state.isDark = action.payload;
    })
    .addCase(updateActiveId, (state, action) => {
      state.activeId = action.payload;
    });
});

export const store = configureStore({ reducer, devTools: true });

type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const getGO = (state: State) => state.go;
export const getStep = (state: State) => state.step;
export const getIsAuth = (state: State) => state.isAuth;
export const getIsDark = (state: State) => state.isDark;
export const getActiveId = (state: State) => state.activeId;

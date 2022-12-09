import React, { useMemo, useRef } from 'react';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import { ElementStates, TArrayItem } from 'types';
import { Stack } from './model';
import { waitWithDelay } from 'helpers/utils';

export const useStack = () => {
  const stackClass = useMemo(() => new Stack<string>(9), []);
  const stackRef = useRef(stackClass);
  const { current: stack } = stackRef;

  return stack;
};

export type TActionType = 'add' | 'delete' | null;

export const changeValueAction = (payload: string) => ({
  type: 'changeValue' as const,
  payload,
});

export const animateAction = (elements: TArrayItem<string>[], action: TActionType) => ({
  type: 'animate' as const,
  payload: {
    renderElements: elements,
    animation: action,
  },
});

export const renderAction = (payload: TArrayItem<string>[]) => ({
  type: 'render' as const,
  payload,
});

type TStackActionTypes =
  | ReturnType<typeof changeValueAction>
  | ReturnType<typeof animateAction>
  | ReturnType<typeof renderAction>;

interface IStackVisualizerState {
  inputValue: string;
  animation: TActionType;
  renderElements: TArrayItem<string>[];
}

export const stackVisualizerState: IStackVisualizerState = {
  inputValue: '',
  animation: null,
  renderElements: [],
};

export const stackReducer: React.Reducer<IStackVisualizerState, TStackActionTypes> = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'changeValue':
      return { ...prevState, inputValue: action.payload };
    case 'animate':
      return { ...prevState, ...action.payload };
    case 'render':
      return { ...prevState, animation: null, renderElements: action.payload };
  }
};

export async function* generateStackAnimation(array: TArrayItem<string>[]) {
  if (array.length === 0) {
    return;
  }
  const delay = waitWithDelay(SHORT_DELAY_IN_MS);
  const peak = array.length - 1;

  array[peak].state = ElementStates.Changing;
  yield [...array];
  await delay();
  array[peak].state = ElementStates.Default;
  yield [...array];
}

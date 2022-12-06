import React, { useMemo, useRef } from 'react';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import { ElementStates, TArrayItem } from 'types';
import { Stack } from './model';

export const useStack = () => {
  const stackClass = useMemo(() => new Stack<TArrayItem<string>>(), []);
  const stackRef = useRef(stackClass);
  const { current: stack } = stackRef;

  return stack;
};

export const changeValueAction = (payload: string) => ({
  type: 'changeValue' as const,
  payload,
});

export const addAction = () => ({
  type: 'add' as const,
});

export const deleteAction = () => ({
  type: 'delete' as const,
});

export const clearAction = () => ({
  type: 'clear' as const,
});

export const toggleAnimationAction = (animation: boolean, action?: null) => ({
  type: 'toggleAnimation' as const,
  payload:
    action === null
      ? {
          animation,
          action,
        }
      : { animation },
});

export const setRenderAction = (payload: TArrayItem<string>[]) => ({
  type: 'render' as const,
  payload,
});

type TStackActionTypes =
  | ReturnType<typeof changeValueAction>
  | ReturnType<typeof addAction>
  | ReturnType<typeof deleteAction>
  | ReturnType<typeof clearAction>
  | ReturnType<typeof toggleAnimationAction>
  | ReturnType<typeof setRenderAction>;

interface IStackVisualizerState {
  inputValue: string;
  action: null | 'add' | 'delete' | 'clear';
  animation: boolean;
  renderElements: TArrayItem<string>[];
}

export const stackVisualizerState: IStackVisualizerState = {
  inputValue: '',
  action: null,
  animation: false,
  renderElements: [],
};

export const stackReducer: React.Reducer<IStackVisualizerState, TStackActionTypes> = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'changeValue':
      return { ...prevState, inputValue: action.payload };
    case 'add':
      return { ...prevState, inputValue: '', action: 'add' };
    case 'delete':
      return { ...prevState, action: 'delete' };
    case 'clear':
      return { ...prevState, action: 'clear' };
    case 'toggleAnimation':
      return { ...prevState, ...action.payload };
    case 'render':
      if (prevState.action === 'clear') {
        return { ...prevState, action: null, renderElements: [...action.payload] };
      } else {
        return { ...prevState, renderElements: [...action.payload] };
      }
  }
};

export async function* generateHighlightSequence(arr: TArrayItem<string>[]) {
  if (arr.length > 0) {
    arr.at(-1)!.state = ElementStates.Changing;
    yield [...arr];
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    arr.at(-1)!.state = ElementStates.Default;
    yield [...arr];
  }
}

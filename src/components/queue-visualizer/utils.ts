import React, { useMemo, useRef } from 'react';
import { Queue } from './model';
import { waitWithDelay } from 'helpers/utils';
import { DELAY_IN_MS } from 'constants/delays';
import { ElementStates, TArrayItem } from 'types';

export const useQueue = () => {
  const queueClass = useMemo(() => new Queue<string>(7), []);
  const queueRef = useRef(queueClass);
  const { current: queue } = queueRef;

  return queue;
};

export type TActionTypes = null | 'add' | 'delete' | 'clear';

export const changeValueAction = (payload: string) => ({
  type: 'changeValue' as const,
  payload,
});

export const animateAction = (elements: TArrayItem<string>[], action: TActionTypes) => ({
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

type TQueueActionTypes =
  | ReturnType<typeof changeValueAction>
  | ReturnType<typeof animateAction>
  | ReturnType<typeof renderAction>;

interface IQueueVisualizerState {
  inputValue: string;
  animation: TActionTypes;
  renderElements: TArrayItem<string>[];
}

export const queueVisualizerState: IQueueVisualizerState = {
  inputValue: '',
  animation: null,
  renderElements: [],
};

export const queueReducer: React.Reducer<IQueueVisualizerState, TQueueActionTypes> = (
  state,
  action
) => {
  switch (action.type) {
    case 'changeValue':
      return { ...state, inputValue: action.payload };
    case 'animate':
      return { ...state, ...action.payload };
    case 'render':
      return {
        ...state,
        animation: null,
        renderElements: action.payload,
      };
  }
};

export async function* generateQueueAnimation(array: TArrayItem<string>[], index: number) {
  if (array.length === 0) {
    return;
  }

  const delay = waitWithDelay(DELAY_IN_MS);

  array[index].state = ElementStates.Changing;
  yield array;
  await delay();
}

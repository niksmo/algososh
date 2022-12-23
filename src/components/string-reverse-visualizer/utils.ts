import React from 'react';
import { DELAY_IN_MS } from 'constants/delays';
import { ArrayItem } from 'helpers/entities';
import type { TArrayItem } from 'types';
import { ElementStates } from 'types/element-states';
import { swap, waitWithDelay } from 'helpers/utils';

export const changeValueAction = (payload: string) => ({
  type: 'changeValue' as const,
  payload,
});

export const stopAction = () => ({
  type: 'stop' as const,
});

export const animateAction = (payload: TArrayItem<string>[]) => ({
  type: 'animate' as const,
  payload,
});

type TReverserActionTypes =
  | ReturnType<typeof changeValueAction>
  | ReturnType<typeof stopAction>
  | ReturnType<typeof animateAction>;

interface IReverserState {
  animation: boolean;
  inputValue: string;
  renderElements: TArrayItem<string>[];
}

export const initReverserState: IReverserState = {
  animation: false,
  inputValue: '',
  renderElements: [],
};

export const reverserReducer: React.Reducer<IReverserState, TReverserActionTypes> = (
  prevState,
  action
): IReverserState => {
  switch (action.type) {
    case 'changeValue':
      return { ...prevState, inputValue: action.payload };
    case 'animate':
      return { ...prevState, animation: true, renderElements: action.payload };
    case 'stop':
      return { ...prevState, animation: false };
  }
};

export async function* generateReverseAnimation(string: string, latency = DELAY_IN_MS) {
  const array = [];
  const delay = waitWithDelay(latency);

  for (let subStr of string) {
    array.push(new ArrayItem(subStr));
  }

  let pointStart = 0;
  let pointEnd = array.length - 1;

  while (pointStart <= pointEnd) {
    array[pointStart].state = ElementStates.Changing;
    array[pointEnd].state = ElementStates.Changing;
    yield array;
    await delay();

    swap(array, pointStart, pointEnd);
    array[pointStart].state = ElementStates.Modified;
    array[pointEnd].state = ElementStates.Modified;
    yield array;

    pointStart++;
    pointEnd--;
  }
  return array;
}

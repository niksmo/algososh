import React from 'react';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import { ArrayItem } from 'helpers/entities';
import { waitWithDelay } from 'helpers/utils';
import type { TArrayItem } from 'types';

export const changeValueAction = (payload: string) => ({
  type: 'changeValue' as const,
  payload,
});

export const animateAction = (payload: TArrayItem[]) => ({
  type: 'animate' as const,
  payload,
});

export const stopAction = () => ({
  type: 'stop' as const,
});

type TFibCalcActionTypes =
  | ReturnType<typeof animateAction>
  | ReturnType<typeof stopAction>
  | ReturnType<typeof changeValueAction>;

interface IFibCalcState {
  animation: boolean;
  inputValue: string;
  renderElements: TArrayItem[];
}

export const fibCalcInitState: IFibCalcState = {
  animation: false,
  inputValue: '',
  renderElements: [],
};

export const fibCalcReducer: React.Reducer<IFibCalcState, TFibCalcActionTypes> = (
  prevState,
  action
): IFibCalcState => {
  switch (action.type) {
    case 'changeValue':
      return { ...prevState, inputValue: action.payload };
    case 'animate':
      return { ...prevState, animation: true, renderElements: action.payload };
    case 'stop':
      return { ...prevState, animation: false };
  }
};

export async function* generateFibAnimation(num: number) {
  let ans: TArrayItem[] = [];
  const delay = waitWithDelay(SHORT_DELAY_IN_MS);

  let a = 0;
  let b = 1;
  let c;

  ans.push(new ArrayItem(1));
  yield ans;
  await delay();

  for (let i = 0; i < num; i++) {
    c = a + b;

    ans.push(new ArrayItem(c));
    yield ans;
    await delay();

    a = b;
    b = c;
  }

  return ans;
}

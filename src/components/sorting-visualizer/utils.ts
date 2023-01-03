import React from 'react';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import { ArrayItem } from 'helpers/entities';
import { getRandomInteger, swap, waitWithDelay } from 'helpers/utils';
import { TArrayItem } from 'types';
import { Direction } from 'types/direction';
import { ElementStates } from 'types/element-states';

export type TSortMethod = 'selection' | 'bubble';

export const setNewArrayAction = (payload: TArrayItem[]) => ({
  type: 'new' as const,
  payload,
});

export const switchMethodAction = (payload: TSortMethod) => ({
  type: 'switchMethod' as const,
  payload,
});

export const animateAction = (renderElements: TArrayItem[], sortType: Direction) => ({
  type: 'animate' as const,
  payload: {
    renderElements,
    sortType,
  },
});

export const endAction = () => ({
  type: 'end' as const,
});

type TSortActionTypes =
  | ReturnType<typeof setNewArrayAction>
  | ReturnType<typeof animateAction>
  | ReturnType<typeof endAction>
  | ReturnType<typeof switchMethodAction>;

interface ISortingState {
  animation: boolean;
  method: TSortMethod;
  sortType: Direction;
  renderElements: TArrayItem[];
}

export const initSortingState: ISortingState = {
  animation: false,
  method: 'selection',
  sortType: Direction.Ascending,
  renderElements: [],
};

export const sortingReducer: React.Reducer<ISortingState, TSortActionTypes> = (
  prevState,
  action
): ISortingState => {
  switch (action.type) {
    case 'new':
      return { ...prevState, renderElements: action.payload };
    case 'switchMethod':
      return { ...prevState, method: action.payload };
    case 'animate':
      return { ...prevState, ...action.payload, animation: true };
    case 'end':
      return { ...prevState, animation: false };
  }
};

export const generateArray = () =>
  Array.from(new Array(getRandomInteger(3, 17)), () => new ArrayItem(getRandomInteger(0, 100)));

export async function* generateBubbleSortAnimation(
  array: TArrayItem[],
  sortType: Direction,
  latency = SHORT_DELAY_IN_MS,
  abortController?: AbortController
) {
  if (array.length === 0) {
    return array;
  }

  const delay = waitWithDelay(latency, abortController);
  try {
    for (let i = 0; i < array.length; i++) {
      array[i].state = ElementStates.Changing;
      yield array;
      await delay();
      for (let j = i + 1; j < array.length; j++) {
        array[j].state = ElementStates.Changing;
        yield array;
        await delay();

        const sortConditions =
          sortType === Direction.Ascending
            ? array[j].value < array[i].value
            : array[j].value > array[i].value;

        if (sortConditions) {
          swap(array, i, j);
        }

        array[j].state = ElementStates.Default;
        yield array;
        await delay();
      }
      array[i].state = ElementStates.Modified;
      yield array;
      await delay();
    }
  } catch {
    throw new Error('animation aborted');
  }
}

export async function* generateSelectionSortAnimation(
  array: TArrayItem[],
  sortType: Direction,
  latency = SHORT_DELAY_IN_MS,
  abortController?: AbortController
) {
  if (array.length === 0) {
    return array;
  }

  const delay = waitWithDelay(latency, abortController);
  let minIndex;

  try {
    for (let i = 0; i < array.length; i++) {
      minIndex = i;

      array[i].state = ElementStates.Changing;
      yield array;
      await delay();
      for (let j = i + 1; j < array.length; j++) {
        array[j].state = ElementStates.Changing;
        yield array;
        await delay();

        const sortConditions =
          sortType === Direction.Ascending
            ? array[j].value < array[minIndex].value
            : array[j].value > array[minIndex].value;

        if (sortConditions) {
          minIndex = j;
        }

        array[j].state = ElementStates.Default;
        yield array;
        await delay();
      }
      swap(array, i, minIndex);

      array[minIndex].state = ElementStates.Default;
      array[i].state = ElementStates.Modified;
      yield array;
      await delay();
    }
  } catch {
    throw new Error('animation aborted');
  }
}

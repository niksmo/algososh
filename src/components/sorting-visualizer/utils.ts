import { SHORT_DELAY_IN_MS } from 'constants/delays';
import { ArrayItem } from 'helpers/entities';
import { swap } from 'helpers/utils';
import { TArrayItem } from 'types';
import { Direction } from 'types/direction';
import { ElementStates } from 'types/element-states';

export type TSortMethod = 'selection' | 'bubble';

export const setNewArrayAction = (payload: TArrayItem[]) => ({
  type: 'new' as const,
  payload,
});

export const startSortAction = (payload: Direction) => ({
  type: 'start' as const,
  payload,
});

export const changeSortMethodAction = (payload: TSortMethod) => ({
  type: 'change' as const,
  payload,
});

export const updateArrayAction = (payload: TArrayItem[]) => ({
  type: 'update' as const,
  payload,
});

export const endSortAction = () => ({
  type: 'end' as const,
});

type TSortActionTypes =
  | ReturnType<typeof setNewArrayAction>
  | ReturnType<typeof startSortAction>
  | ReturnType<typeof updateArrayAction>
  | ReturnType<typeof endSortAction>
  | ReturnType<typeof changeSortMethodAction>;

interface ISortingState {
  isWorking: boolean;
  method: TSortMethod;
  sortType: Direction;
  array: TArrayItem[];
}

export const initSortingState: ISortingState = {
  isWorking: false,
  method: 'selection',
  sortType: Direction.Ascending,
  array: [],
};

export const sortingReducer = (
  prevState: ISortingState,
  action: TSortActionTypes
): ISortingState => {
  switch (action.type) {
    case 'new':
      return { ...prevState, array: action.payload };
    case 'start':
      return { ...prevState, isWorking: true, sortType: action.payload };
    case 'change':
      return { ...prevState, method: action.payload };
    case 'update':
      return { ...prevState, array: action.payload };
    case 'end':
      return { ...prevState, isWorking: false };
    default: {
      // eslint-disable-next-line
      const _exhaustiveCheck: never = action;
      return prevState;
    }
  }
};

const getRandomInteger = (min: number, max: number) => {
  const random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

export const generateArray = () => {
  return Array.from(
    new Array(getRandomInteger(3, 17)),
    () => new ArrayItem(getRandomInteger(0, 100))
  );
};

export async function* generateBubbleSortSequence(array: TArrayItem[], sortType: Direction) {
  for (let i = 0; i < array.length; i++) {
    array[i].state = ElementStates.Changing;
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    yield array;
    for (let j = i + 1; j < array.length; j++) {
      array[j].state = ElementStates.Changing;
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      yield array;

      const sortConditions =
        sortType === Direction.Ascending
          ? array[j].value < array[i].value
          : array[j].value > array[i].value;

      if (sortConditions) {
        swap(array, i, j);
      }

      array[j].state = ElementStates.Default;
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      yield array;
    }
    array[i].state = ElementStates.Modified;
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    yield array;
  }
  return array;
}

export async function* generateSelectionSortSequence(array: TArrayItem[], sortType: Direction) {
  let minIndex;

  for (let i = 0; i < array.length; i++) {
    minIndex = i;

    array[i].state = ElementStates.Changing;
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    yield array;
    for (let j = i + 1; j < array.length; j++) {
      array[j].state = ElementStates.Changing;
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      yield array;

      const sortConditions =
        sortType === Direction.Ascending
          ? array[j].value < array[minIndex].value
          : array[j].value > array[minIndex].value;

      if (sortConditions) {
        minIndex = j;
      }

      array[j].state = ElementStates.Default;
      await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
      yield array;
    }
    swap(array, i, minIndex);

    array[minIndex].state = ElementStates.Default;
    array[i].state = ElementStates.Modified;
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    yield array;
  }

  return array;
}

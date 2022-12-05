import { DELAY_IN_MS } from 'constants/delays';
import { ArrayItem } from 'helpers/entities';
import { swap } from 'helpers/utils';
import { TArrayItem } from 'types';
import { ElementStates } from 'types/element-states';

export const startAction = () => ({
  type: 'start' as const,
});

export const updateAction = (payload: TArrayItem<string>[]) => ({
  type: 'update' as const,
  payload,
});

export const changeValueAction = (payload: string) => ({
  type: 'changeValue' as const,
  payload,
});

export const stopAction = () => ({
  type: 'stop' as const,
});

type TReverserActionTypes =
  | ReturnType<typeof startAction>
  | ReturnType<typeof updateAction>
  | ReturnType<typeof stopAction>
  | ReturnType<typeof changeValueAction>;

interface IReverserState {
  isWorking: boolean;
  inputValue: string;
  array: TArrayItem<string>[];
}

export const initReverserState: IReverserState = {
  isWorking: false,
  inputValue: '',
  array: [],
};

export const reverserReducer = (
  prevState: IReverserState,
  action: TReverserActionTypes
): IReverserState => {
  switch (action.type) {
    case 'changeValue':
      return { ...prevState, inputValue: action.payload };
    case 'start':
      const array = [...prevState.inputValue].map(subStr => new ArrayItem(subStr));
      return { ...prevState, isWorking: true, array };
    case 'update':
      return { ...prevState, array: action.payload };
    case 'stop':
      return { ...prevState, isWorking: false };
  }
};

export async function* generateReverseSequence(array: TArrayItem<string>[]) {
  let pointStart = 0;
  let pointEnd = array.length - 1;

  while (pointStart <= pointEnd) {
    array[pointStart].state = ElementStates.Changing;
    array[pointEnd].state = ElementStates.Changing;
    await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
    yield array;

    swap(array, pointStart, pointEnd);
    array[pointStart].state = ElementStates.Modified;
    array[pointEnd].state = ElementStates.Modified;
    await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
    yield array;

    pointStart++;
    pointEnd--;
  }
  return array;
}

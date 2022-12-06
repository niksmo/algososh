import { SHORT_DELAY_IN_MS } from 'constants/delays';
import { ArrayItem } from 'helpers/entities';
import { TArrayItem } from 'types';

export const startAction = () => ({
  type: 'start' as const,
});

export const changeValueAction = (payload: string) => ({
  type: 'changeValue' as const,
  payload,
});

export const updateAction = (payload: TArrayItem[]) => ({
  type: 'update' as const,
  payload,
});

export const stopAction = () => ({
  type: 'stop' as const,
});

type TFibCalcActionTypes =
  | ReturnType<typeof startAction>
  | ReturnType<typeof updateAction>
  | ReturnType<typeof stopAction>
  | ReturnType<typeof changeValueAction>;

interface IFibCalcState {
  isWorking: boolean;
  value: string;
  array: TArrayItem[];
}

export const fibCalcInitState: IFibCalcState = {
  isWorking: false,
  value: '',
  array: [],
};

export const fibCalcReducer = (
  prevState: IFibCalcState,
  action: TFibCalcActionTypes
): IFibCalcState => {
  switch (action.type) {
    case 'changeValue':
      return { ...prevState, value: action.payload };
    case 'start':
      return { ...prevState, isWorking: true };
    case 'update':
      return { ...prevState, array: action.payload };
    case 'stop':
      return { ...prevState, isWorking: false };
  }
};

export async function* getFibNumbersSequence(num: number) {
  let ans: TArrayItem[] = [];

  let a = 0;
  let b = 1;
  let c;

  ans.push(new ArrayItem(1));
  await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
  yield ans;

  for (let i = 0; i < num; i++) {
    c = a + b;

    ans.push(new ArrayItem(c));
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    yield ans;

    a = b;
    b = c;
  }

  return ans;
}

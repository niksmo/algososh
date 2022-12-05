import { SHORT_DELAY_IN_MS } from 'constants/delays';
import { nanoid } from 'nanoid';

export interface IRenderElement {
  id: string;
  value: number;
}

export const startAction = () => ({
  type: 'start' as const,
});

export const updateAction = (payload: IRenderElement[]) => ({
  type: 'update' as const,
  payload,
});

export const stopAction = () => ({
  type: 'stop' as const,
});

type TFibCalcActions =
  | ReturnType<typeof startAction>
  | ReturnType<typeof updateAction>
  | ReturnType<typeof stopAction>;

interface IFibCalcState {
  isWorking: boolean;
  renderElements: IRenderElement[];
}

export const fibCalcReducer = (
  prevState: IFibCalcState,
  action: TFibCalcActions
): IFibCalcState => {
  switch (action.type) {
    case 'start':
      return { ...prevState, isWorking: true };
    case 'update':
      return { ...prevState, renderElements: action.payload };
    case 'stop':
      return { ...prevState, isWorking: false };
  }
};

class ArrayItem implements IRenderElement {
  value: number;
  id: string;

  constructor(value: number) {
    this.value = value;
    this.id = nanoid();
  }
}

export async function* getFibonacciNumbers(num: number) {
  let ans: IRenderElement[] = [];

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

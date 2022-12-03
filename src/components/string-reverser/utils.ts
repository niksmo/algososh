import { nanoid } from 'nanoid';
import { DELAY_IN_MS } from 'constants/delays';
import { ElementStates } from 'types/element-states';

export interface IRenderElement {
  id: string;
  value: string;
  status: ElementStates;
}

export const startAction = (payload: string) => ({
  type: 'start' as const,
  payload,
});

export const updateAction = (payload: IRenderElement[]) => ({
  type: 'update' as const,
  payload,
});

export const stopAction = () => ({
  type: 'stop' as const,
});

type TReverserActions =
  | ReturnType<typeof startAction>
  | ReturnType<typeof updateAction>
  | ReturnType<typeof stopAction>;

interface IReverserState {
  isWorking: boolean;
  renderElements: IRenderElement[];
}

export const reverserReducer = (
  prevState: IReverserState,
  action: TReverserActions
): IReverserState => {
  switch (action.type) {
    case 'start':
      const renderElements = [...action.payload].map(subStr => ({
        id: nanoid(),
        value: subStr,
        status: ElementStates.Default,
      }));
      return { isWorking: true, renderElements };

    case 'update':
      return { ...prevState, renderElements: action.payload };
    case 'stop':
      return { ...prevState, isWorking: false };
  }
};

export async function* generateReverseSequence(array: IRenderElement[]) {
  const renderElements = [...array];
  let pointStart = 0;
  let pointEnd = renderElements.length - 1;
  let tmp;

  while (pointStart <= pointEnd) {
    renderElements[pointStart].status = ElementStates.Changing;
    renderElements[pointEnd].status = ElementStates.Changing;
    await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
    yield renderElements;

    tmp = renderElements[pointStart];
    renderElements[pointStart] = renderElements[pointEnd];
    renderElements[pointEnd] = tmp;
    renderElements[pointStart].status = ElementStates.Modified;
    renderElements[pointEnd].status = ElementStates.Modified;
    await new Promise(resolve => setTimeout(resolve, DELAY_IN_MS));
    yield renderElements;

    pointStart++;
    pointEnd--;
  }
}

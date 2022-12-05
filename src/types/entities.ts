import { ElementStates } from './element-states';

export type TArrayItem<T = number> = {
  id: string;
  value: T;
  state: ElementStates;
};

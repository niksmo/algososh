import { ElementStates } from './element-states';

export type TArrayItem<T = number> = {
  id: string;
  value: T;
  state: ElementStates;
  head?: string | null;
  tail?: string | null;
  passed?: boolean;
};

export type TListNode<T> = {
  id: string;
  value: T;
  state: ElementStates;
  next: TListNode<T> | null;
};

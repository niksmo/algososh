import { nanoid } from 'nanoid';
import { ElementStates, TArrayItem } from 'types';

export class ArrayItem<T = number> implements TArrayItem<T> {
  id: string;
  value: T;
  state: ElementStates;

  constructor(value: T) {
    this.id = nanoid();
    this.value = value;
    this.state = ElementStates.Default;
  }
}

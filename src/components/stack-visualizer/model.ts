import { ArrayItem } from 'helpers/entities';
import { TArrayItem } from 'types';

export type TStack<T> = {
  push: (value: T) => void;
  pop: () => void;
  clear: () => void;
};

export class Stack<T> implements TStack<T> {
  private _container: TArrayItem<T>[] = [];
  private _maxSize = 9;

  get size() {
    return this._container.length;
  }

  get maxSize() {
    return this._maxSize;
  }

  get elements() {
    return this._container;
  }

  push(value: T) {
    if (this.size < this.maxSize) {
      this._container.push(new ArrayItem<T>(value));
    }
  }

  pop() {
    this._container.pop();
  }

  clear() {
    this._container = [];
  }
}

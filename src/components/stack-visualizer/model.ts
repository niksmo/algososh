import { ArrayItem } from 'helpers/entities';
import { TArrayItem } from 'types';

export type TStack<T> = {
  push: (value: T) => void;
  pop: () => void;
  clear: () => void;
  getArray: () => TArrayItem<T>[];
};

export class Stack<T> implements TStack<T> {
  private _container: TArrayItem<T>[] = [];
  private _maxSize;

  constructor(maxSize: number) {
    this._maxSize = maxSize;
  }

  get size() {
    return this._container.length;
  }

  get maxSize() {
    return this._maxSize;
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

  getArray() {
    return [...this._container];
  }
}

export type TStack<T> = {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
};

export class Stack<T> implements TStack<T> {
  private _container: T[] = [];
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

  push(item: T) {
    if (this.size < this.maxSize) {
      this._container.push(item);
    }
  }

  pop() {
    this._container.pop();
  }

  clear() {
    this._container = [];
  }
}

export type TQueue<T> = {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
};

export class Queue<T> implements TQueue<T> {
  private _container: T[] = [];
  private _maxSize: number;
  private _length = 0;
  private _head = 0;
  private _tail = 0;

  constructor(maxSize: number) {
    this._maxSize = maxSize;
  }

  get length() {
    return this._length;
  }

  get maxSize() {
    return this._maxSize;
  }

  get elements() {
    return this._container;
  }

  get head() {
    return this._head;
  }

  get tail() {
    return this._tail;
  }

  enqueue(item: T) {
    if (this.length < this.maxSize) {
      if (this.length === 0) {
        this._tail = 0;
      } else {
        this._tail = (this._tail + 1) % this._maxSize;
      }
      this._container[this._tail] = item;
      this._length++;
    } else {
      console.error('queue is full');
    }
  }

  dequeue() {
    if (this.length === 0) {
      console.error('queue is empty');
    }
    delete this._container[this._head];
    this._length--;
    if (this._length) {
      this._head = (this._head + 1) % this._maxSize;
    } else {
      this._head = 0;
      this._tail = 0;
    }
  }

  clear() {
    this._container = [];
    this._head = 0;
    this._tail = 0;
    this._length = 0;
  }
}

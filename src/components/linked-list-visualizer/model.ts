import { ArrayItem, ListNode } from 'helpers/entities';
import type { TArrayItem, TListNode } from 'types';

export type TLinkedList<T> = {
  prepend: (item: T) => void;
  append: (item: T) => void;
  addByIndex: (item: T, index: number) => void;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  toArray?: () => TArrayItem<T>[];
};

export class LinkedList<T> implements TLinkedList<T> {
  private _maxSize: number;
  private _length: number;
  private _head: TListNode<T> | null = null;
  private _tail: TListNode<T> | null;

  constructor(maxSize: number, node?: TListNode<T>) {
    this._maxSize = maxSize;
    if (node) {
      this._head = node;
      let current = this._head;
      this._length = 1;
      while (current.next) {
        current = current.next;
        this._length++;
      }
      this._tail = current;
    } else {
      this._head = null;
      this._tail = null;
      this._length = 0;
    }
  }

  get length() {
    return this._length;
  }

  get maxSize() {
    return this._maxSize;
  }

  get head() {
    return this._head;
  }

  get tail() {
    return this._tail;
  }

  prepend = (value: T) => {
    if (this._length === this._maxSize) {
      console.error('linked list is full');
      return;
    }
    const node = new ListNode<T>(value);
    if (this._head) {
      node.next = this._head;
      this._head = node;
    } else {
      this._head = node;
      this._tail = this._head;
    }

    this._length++;
  };

  append = (value: T) => {
    if (this._length === this._maxSize) {
      console.error('linked list is full');
      return;
    }

    const node = new ListNode<T>(value);
    if (this._tail) {
      this._tail.next = node;
      this._tail = this._tail.next;
    } else {
      this._head = node;
      this._tail = node;
    }
    this._length++;
  };

  deleteHead = () => {
    if (this._head && this.length >= 1) {
      this._head = this._head.next;
      if (this.length === 1) {
        this._tail = null;
      }
      this._length--;
    } else {
      console.error('head is empty');
    }
  };

  deleteTail = () => {
    if (this._tail && this._head) {
      let current = this._head;
      let prev;
      while (current.next) {
        prev = current;
        current = current.next;
      }
      if (prev) {
        prev.next = null;
        this._tail = prev;
      } else {
        this._head = null;
        this._tail = null;
      }
      this._length--;
    } else {
      console.error('tail is empty');
    }
  };

  addByIndex = (value: T, index: number) => {
    if (this._length === this._maxSize) {
      console.error('linked list is full');
      return;
    }

    if (index === 0) {
      this.prepend(value);
      return;
    }

    if (index > 0 && index < this._length) {
      const node = new ListNode<T>(value);

      let current = this._head;
      let currentIndex = 0;

      while (currentIndex < index && current) {
        if (currentIndex === index - 1) {
          node.next = current.next;
          current.next = node;
        }
        current = current.next;
        currentIndex++;
      }
      this._length++;
    } else {
      console.error("index doesn't exist");
    }
  };

  deleteByIndex = (index: number) => {
    if (this._length === 0) {
      console.error('list is empty');
      return;
    }

    if (index === 0) {
      this.deleteHead();
      return;
    }

    if (index === this.length - 1) {
      this.deleteTail();
      return;
    }

    if (index > 0 && index < this._length) {
      let current = this._head;
      let prev = null;
      for (let i = 1; i <= index; i++) {
        prev = current;
        if (current) {
          current = current.next;
        }
      }
      if (prev && current) {
        prev.next = current.next;
        this._length--;
      } else {
        console.error("index doesn't exist");
      }
    }
  };

  toArray = () => {
    const ans = [];

    if (this.length > 0) {
      let current = this._head;
      while (current) {
        ans.push(new ArrayItem<T>(current.value, null, null));

        current = current.next;
      }
      ans[0].head = 'head';
      ans[this._length - 1].tail = 'tail';
    }

    return ans;
  };
}

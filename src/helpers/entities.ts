import { nanoid } from 'nanoid';
import { ElementStates, TArrayItem } from 'types';
import { TListNode } from 'types/entities';

export class ArrayItem<T = number> implements TArrayItem<T> {
  id: string;
  value: T;
  state: ElementStates;
  head?;
  tail?;
  passed?;

  constructor(value: T, head?: string | null, tail?: string | null, passed?: boolean) {
    this.id = nanoid();
    this.value = value;
    this.state = ElementStates.Default;
    if (head || head === null) {
      this.head = head;
    }
    if (tail || tail === null) {
      this.tail = tail;
    }
    if (typeof passed === 'boolean') {
      this.passed = passed;
    }
  }
}

export class ListNode<T> implements TListNode<T> {
  id: string;
  value: T;
  state: ElementStates;
  next: TListNode<T> | null;

  constructor(value: T, next?: TListNode<T>) {
    this.id = nanoid();
    this.value = value;
    this.state = ElementStates.Default;
    this.next = next ? next : null;
  }
}

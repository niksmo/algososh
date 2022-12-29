import React, { useMemo, useRef } from 'react';
import { LinkedList } from './model';
import { ElementStates, TArrayItem } from 'types';
import { ArrayItem, ListNode } from 'helpers/entities';
import { getRandomInteger, waitWithDelay } from 'helpers/utils';
import { DELAY_IN_MS } from 'constants/delays';

export const useLinkedList = () => {
  const queueClass = useMemo(() => new LinkedList<string>(7, getRandomListNodes(5)), []);
  const queueRef = useRef(queueClass);
  const { current: queue } = queueRef;

  return queue;
};

function getRandomListNodes(maxSize: number) {
  const randNumber = 2 + Math.floor(Math.random() * maxSize);

  const dummyHead = new ListNode<string>(String(0));
  let current = dummyHead;
  for (let i = 0; i < randNumber; i++) {
    const node = new ListNode<string>(String(getRandomInteger(1, 99)));
    current.next = node;
    current = current.next;
  }

  if (dummyHead.next) {
    return dummyHead.next;
  }
}

export type TAnimationType =
  | 'prepend'
  | 'append'
  | 'addByIndex'
  | 'deleteByIndex'
  | 'deleteHead'
  | 'deleteTail'
  | null;

export const changeValueAction = (payload: string) => ({
  type: 'changeValue' as const,
  payload,
});

export const changeIndexAction = (payload: string) => ({
  type: 'changeIndex' as const,
  payload,
});

export const animateAction = (action: TAnimationType, elements: TArrayItem<string>[]) => ({
  type: 'animate' as const,
  payload: { renderElements: elements, animation: action },
});

export const renderAction = (payload: TArrayItem<string>[]) => ({
  type: 'render' as const,
  payload,
});

type TLinkedListActionTypes =
  | ReturnType<typeof changeValueAction>
  | ReturnType<typeof changeIndexAction>
  | ReturnType<typeof animateAction>
  | ReturnType<typeof renderAction>;

interface ILinkedListVisualizerState {
  inputValue: string;
  indexValue: string;
  animation: TAnimationType;
  renderElements: TArrayItem<string>[];
}

export const linkedListVisualizerState: ILinkedListVisualizerState = {
  inputValue: '',
  indexValue: '',
  animation: null,
  renderElements: [],
};

export const linkedListReducer: React.Reducer<
  ILinkedListVisualizerState,
  TLinkedListActionTypes
> = (state, action) => {
  switch (action.type) {
    case 'changeValue':
      return { ...state, inputValue: action.payload };
    case 'changeIndex':
      return { ...state, indexValue: action.payload };
    case 'animate':
      return { ...state, ...action.payload };
    case 'render':
      return {
        ...state,
        renderElements: action.payload,
        animation: null,
      };
  }
};

export async function* generateAddAnimation(
  array: TArrayItem<string>[],
  value: string,
  action: TAnimationType,
  index?: string | number
) {
  if (typeof index === 'string') {
    index = Number(index);
  }

  if (array.length === 0 || value === '') {
    return;
  }

  const delay = waitWithDelay(DELAY_IN_MS);

  if (action === 'prepend' || index === 0) {
    array[0].head = value;
    yield [...array];
    await delay();
    array[0].head = null;
    array.unshift(new ArrayItem(value, 'head', null));
    array[0].state = ElementStates.Modified;
    yield [...array];
    await delay();
  }

  if (action === 'append') {
    const tailIndex = array.length - 1;
    array[tailIndex].head = value;
    yield [...array];
    await delay();
    if (tailIndex === 0) {
      array[tailIndex].head = 'head';
    } else {
      array[tailIndex].head = null;
    }
    array[tailIndex].tail = null;
    array.push(new ArrayItem(value, null, 'tail'));
    array.at(-1)!.state = ElementStates.Modified;
    yield [...array];
    await delay();
  }

  if (!index || index >= array.length || index < 0) {
    return;
  }

  if (action === 'addByIndex') {
    let currentIndex = 0;
    array[currentIndex].head = value;
    yield [...array];
    await delay();
    while (currentIndex < index) {
      if (currentIndex === 0) {
        array[currentIndex].head = 'head';
      } else {
        array[currentIndex].head = null;
      }
      array[currentIndex].state = ElementStates.Changing;
      array[currentIndex].passed = true;
      currentIndex++;
      array[currentIndex].head = value;
      yield [...array];
      await delay();
    }
    array[currentIndex].head = null;
    array.splice(currentIndex, 0, new ArrayItem(value));
    array[currentIndex].state = ElementStates.Modified;
    yield [...array];
    await delay();
  }
}

export async function* generateDeleteAnimation(
  array: TArrayItem<string>[],
  action: TAnimationType,
  index?: string | number
) {
  if (typeof index === 'string') {
    index = Number(index);
  }

  if (array.length === 0) {
    return;
  }

  const delay = waitWithDelay(DELAY_IN_MS);

  if (action === 'deleteHead' || index === 0) {
    array[0].tail = array[0].value;
    array[0].value = '';
    yield [...array];
    await delay();
  }

  if (action === 'deleteTail') {
    const tail = array.length - 1;
    array[tail].tail = array[tail].value;
    array[tail].value = '';
    yield [...array];
    await delay();
  }

  if (!index || index >= array.length || index < 0) {
    return;
  }

  if (action === 'deleteByIndex') {
    let currentIndex = 0;
    while (currentIndex < index) {
      array[currentIndex].state = ElementStates.Changing;
      yield [...array];
      await delay();
      array[currentIndex].passed = true;
      currentIndex++;
    }
    array[currentIndex].state = ElementStates.Changing;
    array[currentIndex].tail = array[currentIndex].value;
    array[currentIndex].value = '';
    yield [...array];
    await delay();
  }
}

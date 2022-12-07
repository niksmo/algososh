import React, { useMemo, useRef } from 'react';
import { TArrayItem } from 'types';
import { Queue } from './model';
import { ArrayItem } from 'helpers/entities';

export const useQueue = () => {
  const queueClass = useMemo(() => new Queue<TArrayItem<string>>(7), []);
  const queueRef = useRef(queueClass);
  const { current: queue } = queueRef;

  return queue;
};

export const changeValueAction = (payload: string) => ({
  type: 'changeValue' as const,
  payload,
});

export const addAction = () => ({
  type: 'add' as const,
});

export const deleteAction = () => ({
  type: 'delete' as const,
});

export const clearAction = () => ({
  type: 'clear' as const,
});

export const animateAction = (payload: TArrayItem<string>[]) => ({
  type: 'animate' as const,
  payload,
});

export const renderAction = (
  elements: TArrayItem<string>[],
  headIndex: number,
  tailIndex: number,
  length: number
) => ({
  type: 'render' as const,
  payload: { renderElements: elements, head: headIndex, tail: tailIndex, length },
});

type TQueueActionTypes =
  | ReturnType<typeof changeValueAction>
  | ReturnType<typeof addAction>
  | ReturnType<typeof deleteAction>
  | ReturnType<typeof clearAction>
  | ReturnType<typeof animateAction>
  | ReturnType<typeof renderAction>;

interface IQueueVisualizerState {
  inputValue: string;
  action: null | 'add' | 'delete' | 'clear';
  animation: boolean;
  renderElements: TArrayItem<string>[];
  head: number;
  tail: number;
  length: number;
  maxSize: number;
}

export const queueVisualizerState: IQueueVisualizerState = {
  inputValue: '',
  action: null,
  animation: false,
  renderElements: [],
  head: 0,
  tail: 0,
  length: 0,
  maxSize: 0,
};

export const queueReducer: React.Reducer<IQueueVisualizerState, TQueueActionTypes> = (
  state,
  action
) => {
  switch (action.type) {
    case 'changeValue':
      return { ...state, inputValue: action.payload };
    case 'add':
      return { ...state, inputValue: '', action: 'add' };
    case 'delete':
      return { ...state, action: 'delete' };
    case 'clear':
      return { ...state, action: 'clear' };
    case 'animate':
      return { ...state, animation: true, renderElements: [...action.payload] };
    case 'render':
      const emptyArray = Array.from(new Array(state.maxSize), i => new ArrayItem<string>(''));

      const renderElements = emptyArray.map((emtyItem, index) =>
        action.payload.renderElements[index] ? action.payload.renderElements[index] : emtyItem
      );

      return {
        ...state,
        animation: false,
        action: null,
        renderElements,
        head: action.payload.head,
        tail: action.payload.tail,
        length: action.payload.length,
      };
  }
};

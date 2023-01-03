import React, { useEffect, useReducer, useRef } from 'react';
import { Direction } from 'types';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import { withMessage } from 'helpers/utils';
import { SortingChart } from './chart';
import { SortManager } from './manager';
import {
  animateAction,
  endAction,
  generateArray,
  generateBubbleSortAnimation,
  generateSelectionSortAnimation,
  initSortingState,
  switchMethodAction,
  setNewArrayAction,
  sortingReducer,
} from './utils';

interface ISortingVisualizerProps {
  extClassName?: string;
}

export const SortingVisualizer = ({ extClassName }: ISortingVisualizerProps) => {
  const [{ animation, method, sortType, renderElements }, dispatch] = useReducer(
    sortingReducer,
    initSortingState
  );

  const abortControllerRef = useRef<null | AbortController>(null);

  const abortAnimation = () => {
    dispatch(endAction());
    abortControllerRef.current?.abort();
  };

  const handleSort = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const type = evt.currentTarget.value as Direction;

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      if (method === 'bubble') {
        const animationGenerator = generateBubbleSortAnimation(
          renderElements,
          type,
          SHORT_DELAY_IN_MS,
          abortController
        );
        for await (let elements of animationGenerator) {
          dispatch(animateAction(elements, type));
        }
      }
      if (method === 'selection') {
        const animationGenerator = generateSelectionSortAnimation(
          renderElements,
          type,
          SHORT_DELAY_IN_MS,
          abortController
        );
        for await (let elements of animationGenerator) {
          dispatch(animateAction(elements, type));
        }
      }
      dispatch(endAction());
    } catch (error) {
      if (withMessage(error)) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    dispatch(setNewArrayAction(generateArray()));
    return () => void abortAnimation();
  }, []);

  return (
    <div className={extClassName}>
      <SortManager
        method={method}
        onStart={handleSort}
        onChangeMethod={method => dispatch(switchMethodAction(method))}
        isDisabled={animation}
        sortType={sortType}
        newArray={() => dispatch(setNewArrayAction(generateArray()))}
      />
      <SortingChart elements={renderElements} extClassName="mt-25" />
    </div>
  );
};

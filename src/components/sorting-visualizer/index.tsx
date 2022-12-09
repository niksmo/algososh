import React, { useEffect, useReducer } from 'react';
import { Direction } from 'types';
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

  const handleSort = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const type = evt.currentTarget.value as Direction;

    if (method === 'bubble') {
      const animationGenerator = generateBubbleSortAnimation(renderElements, type);
      for await (let elements of animationGenerator) {
        dispatch(animateAction(elements, type));
      }
    }
    if (method === 'selection') {
      const animationGenerator = generateSelectionSortAnimation(renderElements, type);
      for await (let elements of animationGenerator) {
        dispatch(animateAction(elements, type));
      }
    }
    dispatch(endAction());
  };

  useEffect(() => {
    dispatch(setNewArrayAction(generateArray()));
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

import { useEffect, useReducer } from 'react';
import { SortingChart } from './chart';
import { SortManager } from './manager';
import {
  generateBubbleSortSequence,
  changeSortMethodAction,
  endSortAction,
  generateArray,
  initSortingState,
  generateSelectionSortSequence,
  setNewArrayAction,
  sortingReducer,
  startSortAction,
  updateArrayAction,
} from './utils';

interface ISortingVisualizatorProps {
  extClassName?: string;
}

export const SortingVisualizator = ({ extClassName }: ISortingVisualizatorProps) => {
  const [{ isWorking, method, sortType, array }, dispatch] = useReducer(
    sortingReducer,
    initSortingState
  );

  async function sortArray() {
    let sortGenerator;
    if (method === 'bubble') {
      sortGenerator = generateBubbleSortSequence(array, sortType);
    } else {
      sortGenerator = generateSelectionSortSequence(array, sortType);
    }

    for await (let array of sortGenerator) {
      dispatch(updateArrayAction(array));
    }

    dispatch(endSortAction());
  }

  useEffect(() => {
    dispatch(setNewArrayAction(generateArray()));
  }, []);

  useEffect(() => {
    if (isWorking) {
      sortArray();
    }
    // eslint-disable-next-line
  }, [isWorking]);

  return (
    <div className={extClassName}>
      <SortManager
        defaultMethod={method}
        onStart={direction => dispatch(startSortAction(direction))}
        onChangeMethod={method => dispatch(changeSortMethodAction(method))}
        isDisabled={isWorking}
        sortType={sortType}
        newArray={() => dispatch(setNewArrayAction(generateArray()))}
      />
      <SortingChart array={array} extClassName="mt-25" />
    </div>
  );
};

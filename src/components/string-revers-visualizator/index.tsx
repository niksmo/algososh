import React, { useEffect, useReducer } from 'react';
import cn from 'classnames';
import {
  changeValueAction,
  generateReverseSequence,
  initReverserState,
  reverserReducer,
  startAction,
  stopAction,
  updateAction,
} from './utils';
import { ReverseManager } from './manager';
import { ReverseChart } from './chart';
import styles from './styles.module.css';

interface IReverseVisualizatorProps {
  extClassName?: string;
}

export const ReverseVisualizator: React.FC<IReverseVisualizatorProps> = ({ extClassName }) => {
  const [{ isWorking, inputValue, array }, dispatch] = useReducer(
    reverserReducer,
    initReverserState
  );

  async function reverseString() {
    const reverseGenerator = generateReverseSequence(array);
    for await (let array of reverseGenerator) {
      dispatch(updateAction(array));
    }

    dispatch(stopAction());
  }

  useEffect(() => {
    if (isWorking) {
      reverseString();
    }
    // eslint-disable-next-line
  }, [isWorking]);

  return (
    <div className={cn(styles.reverseVisualizator, extClassName)}>
      <ReverseManager
        value={inputValue}
        onChange={value => dispatch(changeValueAction(value))}
        isDisabled={isWorking}
        onSubmit={() => dispatch(startAction())}
      />
      <ReverseChart elements={array} extClassName={styles.reverseVisualizator__chart} />
    </div>
  );
};

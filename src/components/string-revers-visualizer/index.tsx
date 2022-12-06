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

interface IReverseVisualizerProps {
  extClassName?: string;
}

export const ReverseVisualizer: React.FC<IReverseVisualizerProps> = ({ extClassName }) => {
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
    <div className={cn(styles.reverseVisualizer, extClassName)}>
      <ReverseManager
        value={inputValue}
        onChange={value => dispatch(changeValueAction(value))}
        isDisabled={isWorking}
        onSubmit={() => dispatch(startAction())}
      />
      <ReverseChart elements={array} extClassName={styles.reverseVisualizer__chart} />
    </div>
  );
};

import React, { useEffect, useReducer } from 'react';
import cn from 'classnames';
import { FibChart } from './chart';
import { FibManager } from './manager';
import {
  changeValueAction,
  fibCalcInitState,
  fibCalcReducer,
  getFibNumbersSequence,
  startAction,
  stopAction,
  updateAction,
} from './utils';
import styles from './styles.module.css';

interface IFibCalcVisualizerProps {
  extClassName?: string;
}

export const FibCalcVisualizer: React.FC<IFibCalcVisualizerProps> = ({ extClassName }) => {
  const [{ isWorking, value, array }, dispatch] = useReducer(fibCalcReducer, fibCalcInitState);

  async function calcFibNum() {
    const generatorCalcFibNum = getFibNumbersSequence(Number(value));
    for await (let renderElements of generatorCalcFibNum) {
      dispatch(updateAction(renderElements));
    }
    dispatch(stopAction());
  }

  useEffect(() => {
    if (isWorking) {
      calcFibNum();
    }
    // eslint-disable-next-line
  }, [isWorking]);

  return (
    <div className={cn(styles.fibVisualizer, extClassName)}>
      <FibManager
        onSubmit={() => dispatch(startAction())}
        onChange={value => dispatch(changeValueAction(value))}
        value={value}
        isDisabled={isWorking}
      />
      <FibChart extClassName={styles.fibVisualizer__chart} elements={array} />
    </div>
  );
};

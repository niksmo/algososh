import React, { useReducer } from 'react';
import cn from 'classnames';
import { FibChart } from './chart';
import { FibManager } from './manager';
import {
  animateAction,
  changeValueAction,
  fibCalcInitState,
  fibCalcReducer,
  generateFibAnimation,
  stopAction,
} from './utils';
import styles from './styles.module.css';

interface IFibCalcVisualizerProps {
  extClassName?: string;
}

export const FibCalcVisualizer: React.FC<IFibCalcVisualizerProps> = ({ extClassName }) => {
  const [{ animation, inputValue, renderElements }, dispatch] = useReducer(
    fibCalcReducer,
    fibCalcInitState
  );

  const handleCalcFibNum = async (evt: React.FormEvent) => {
    evt.preventDefault();
    const animationGenerator = generateFibAnimation(Number(inputValue));
    for await (let elements of animationGenerator) {
      dispatch(animateAction(elements));
    }
    dispatch(stopAction());
  };

  return (
    <div className={cn(styles.fibVisualizer, extClassName)}>
      <FibManager
        onSubmit={handleCalcFibNum}
        onChange={value => dispatch(changeValueAction(value))}
        value={inputValue}
        isDisabled={animation}
      />
      <FibChart extClassName={styles.fibVisualizer__chart} elements={renderElements} />
    </div>
  );
};

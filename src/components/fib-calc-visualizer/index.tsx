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

  const handleOnChange = (evt: React.FormEvent<HTMLInputElement>) => {
    const currentValue = evt.currentTarget.value;

    const allowedNum = /^[1-9]$|^1\d$|^\s*$/;
    if (allowedNum.test(currentValue)) {
      dispatch(changeValueAction(currentValue));
    }
  };

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
        onChange={handleOnChange}
        value={inputValue}
        isDisabled={animation}
      />
      <FibChart extClassName={styles.fibVisualizer__chart} elements={renderElements} />
    </div>
  );
};

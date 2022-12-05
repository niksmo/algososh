import React, { useEffect, useReducer } from 'react';
import cn from 'classnames';
import { Circle } from 'components/ui/circle';
import {
  getFibonacciNumbers,
  fibCalcReducer,
  startAction,
  stopAction,
  updateAction,
} from './utils';
import styles from './styles.module.css';

interface IFibonacciCalcProps {
  num: string;
  extClassName?: string;
  startCb: () => void;
  finishCb: () => void;
}

export const FibonacciCalc: React.FC<IFibonacciCalcProps> = ({
  num,
  extClassName,
  startCb,
  finishCb,
}) => {
  const [{ isWorking, renderElements }, dispatch] = useReducer(fibCalcReducer, {
    isWorking: false,
    renderElements: [],
  });

  async function calcFibNum() {
    const generatorCalcFibNum = getFibonacciNumbers(Number(num));
    for await (let renderElements of generatorCalcFibNum) {
      dispatch(updateAction(renderElements));
    }
    dispatch(stopAction());
    finishCb();
  }

  useEffect(() => {
    dispatch(startAction());
    startCb();
    // eslint-disable-next-line
  }, [num]);

  useEffect(() => {
    if (isWorking) {
      calcFibNum();
    }
    // eslint-disable-next-line
  }, [isWorking]);

  return (
    <div className={cn(styles.fibCalc, extClassName)}>
      {renderElements.map((element, index) => (
        <Circle
          letter={String(element.value)}
          index={index}
          key={element.id}
          extraClass={cn(styles.fibCalc__element, 'mr-8')}
        />
      ))}
    </div>
  );
};

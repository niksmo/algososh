import React, { useEffect, useReducer } from 'react';
import cn from 'classnames';
import { Circle } from '../ui/circle';
import {
  generateReverseSequence,
  reverserReducer,
  startAction,
  stopAction,
  updateAction,
} from './utils';
import styles from './styles.module.css';

interface IStringReverserProps {
  string: string;
  startCb: () => void;
  finishCb: () => void;
  extClassName?: string;
}

export const StringReverser: React.FC<IStringReverserProps> = ({
  string,
  extClassName,
  startCb,
  finishCb,
}) => {
  const [{ isWorking, renderElements }, dispatch] = useReducer(reverserReducer, {
    isWorking: false,
    renderElements: [],
  });

  const reverseString = async () => {
    const reverseGenerator = generateReverseSequence(renderElements);
    for await (let renderElements of reverseGenerator) {
      dispatch(updateAction(renderElements));
    }

    dispatch(stopAction());
    finishCb();
  };

  useEffect(() => {
    dispatch(startAction(string));
    startCb();
    // eslint-disable-next-line
  }, [string]);

  useEffect(() => {
    if (isWorking) {
      reverseString();
    }
    // eslint-disable-next-line
  }, [isWorking]);

  return (
    <div className={cn(styles.stringReverser, extClassName)}>
      {renderElements.map(({ value, id, status }) => (
        <Circle key={id} letter={value} state={status} />
      ))}
    </div>
  );
};

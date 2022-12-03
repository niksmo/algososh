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
  toggleReversingState: React.Dispatch<React.SetStateAction<boolean>>;
  extClassName?: string;
}

export const StringReverser: React.FC<IStringReverserProps> = ({
  string,
  extClassName,
  toggleReversingState,
}) => {
  const [{ isWorking, renderElements }, dispatch] = useReducer(reverserReducer, {
    isWorking: false,
    renderElements: [],
  });

  const reverseString = async () => {
    toggleReversingState(true);

    const reverseGenerator = generateReverseSequence(renderElements);
    for await (let renderElements of reverseGenerator) {
      dispatch(updateAction(renderElements));
    }

    dispatch(stopAction());
    toggleReversingState(false);
  };

  useEffect(() => {
    dispatch(startAction(string));
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

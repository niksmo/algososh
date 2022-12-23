import React, { useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';
import { withMessage } from 'helpers/utils';
import { DELAY_IN_MS } from 'constants/delays';
import {
  animateAction,
  changeValueAction,
  generateReverseAnimation,
  initReverserState,
  reverserReducer,
  stopAction,
} from './utils';
import { ReverseManager } from './manager';
import { ReverseChart } from './chart';
import styles from './styles.module.css';

interface IReverseVisualizerProps {
  extClassName?: string;
}

export const ReverseVisualizer: React.FC<IReverseVisualizerProps> = ({ extClassName }) => {
  const [{ animation, inputValue, renderElements }, dispatch] = useReducer(
    reverserReducer,
    initReverserState
  );

  const abortControllerRef = useRef<null | AbortController>(null);

  const abortAnimation = () => {
    dispatch(stopAction());
    abortControllerRef.current?.abort();
  };

  const handleOnChangeInputValue = (evt: React.FormEvent<HTMLInputElement>) => {
    const currentValue = evt.currentTarget.value;
    dispatch(changeValueAction(currentValue));
  };

  const handleReverseString = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const animationGenerator = generateReverseAnimation(
      inputValue.trim(),
      DELAY_IN_MS,
      abortController
    );

    try {
      for await (let elements of animationGenerator) {
        dispatch(animateAction(elements));
      }
      dispatch(stopAction());
    } catch (error) {
      if (withMessage(error)) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => () => void abortAnimation(), []);

  return (
    <div className={cn(styles.reverseVisualizer, extClassName)}>
      <ReverseManager
        value={inputValue}
        onChange={handleOnChangeInputValue}
        isDisabled={animation}
        onSubmit={handleReverseString}
      />
      <ReverseChart elements={renderElements} extClassName={styles.reverseVisualizer__chart} />
    </div>
  );
};

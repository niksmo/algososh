import React, { useReducer } from 'react';
import cn from 'classnames';
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

  const handleReverseString = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    const animationGenerator = generateReverseAnimation(inputValue.trim());
    for await (let elements of animationGenerator) {
      dispatch(animateAction(elements));
    }
    dispatch(stopAction());
  };

  return (
    <div className={cn(styles.reverseVisualizer, extClassName)}>
      <ReverseManager
        value={inputValue}
        onChange={value => dispatch(changeValueAction(value))}
        isDisabled={animation}
        onSubmit={handleReverseString}
      />
      <ReverseChart elements={renderElements} extClassName={styles.reverseVisualizer__chart} />
    </div>
  );
};

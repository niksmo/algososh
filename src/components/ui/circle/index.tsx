import React from 'react';
import { ElementStates } from 'types/element-states';
import styles from './styles.module.css';

interface CircleProps {
  state?: ElementStates;
  letter?: string;
  head?: string | React.ReactElement | null;
  index?: number;
  tail?: string | React.ReactElement | null;
  extraClass?: string;
  isSmall?: boolean;
}

export const Circle: React.FC<CircleProps> = ({
  state = ElementStates.Default,
  letter,
  head,
  index,
  tail,
  extraClass = '',
  isSmall,
}) => {
  return (
    <div className={`${styles.content} ${extraClass}`} data-testid="circle">
      <div
        className={`text text_type_input text_color_input mb-4 ${styles.absolute} ${styles.head} ${
          styles[typeof head === 'string' ? 'string' : 'element']
        }`}>
        {head}
      </div>
      <div
        data-testid="circle-main"
        className={`${styles.circle}  ${isSmall ? styles.small : ''} ${styles[state]}`}>
        <p
          data-testid="circle-value"
          className={`text text_type_circle text_color_input ${styles.letter}`}>
          {letter}
        </p>
      </div>
      <p
        className={`text text_type_input text_color_input mt-4 ${styles.absolute} ${styles.index}`}>
        {index?.toString()}
      </p>
      <div
        className={`text text_type_input text_color_input mt-4 ${styles.absolute} ${
          index?.toString() ? styles.tail60 : styles.tail30
        } ${styles[typeof tail === 'string' ? 'string' : 'element']}`}>
        {tail}
      </div>
    </div>
  );
};

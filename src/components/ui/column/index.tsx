import React from 'react';
import styles from './styles.module.css';
import { ElementStates } from 'types/element-states';

interface ColumnProps {
  elevation: number;
  state?: ElementStates;
  extraClass?: string;
}

export const Column: React.FC<ColumnProps> = ({
  elevation,
  state = ElementStates.Default,
  extraClass = '',
}) => (
  <div className={`${styles.content} ${extraClass}`}>
    <div
      className={`${styles.column} ${styles[state]}`}
      style={{ height: 320 * elevation * 0.01 || 1 }}
    />
    <p className={`text text_type_column text_color_input mt-3`}>{elevation}</p>
  </div>
);

import React from 'react';
import cn from 'classnames';
import { TArrayItem } from 'types';
import { Circle } from 'components/ui/circle';
import styles from './styles.module.css';

interface IReverseChart {
  elements: TArrayItem<string>[];
  extClassName?: string;
}

export const ReverseChart: React.FC<IReverseChart> = ({ elements, extClassName }) => (
  <div className={cn(styles.reverseChart, extClassName)}>
    {elements.map(({ value, id, state }) => (
      <Circle key={id} letter={value} state={state} />
    ))}
  </div>
);

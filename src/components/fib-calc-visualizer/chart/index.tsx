import React from 'react';
import cn from 'classnames';
import { TArrayItem } from 'types';
import { Circle } from 'components/ui/circle';
import styles from './styles.module.css';

interface IFibChartProps {
  elements: TArrayItem[];
  extClassName?: string;
}

export const FibChart: React.FC<IFibChartProps> = ({ elements, extClassName }) => (
  <div className={cn(styles.chart, extClassName)}>
    {elements.map((item, index) => (
      <Circle
        letter={String(item.value)}
        index={index}
        key={item.id}
        extraClass={cn(styles.chart__element, 'mr-8')}
      />
    ))}
  </div>
);

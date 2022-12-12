import React from 'react';
import cn from 'classnames';
import { Circle } from 'components/ui/circle';
import { TArrayItem } from 'types';
import styles from './styles.module.css';

interface IQueueChartProps {
  elements: TArrayItem<string>[];
  extClassName?: string;
}

export const QueueChart: React.FC<IQueueChartProps> = ({ elements, extClassName }) => (
  <div className={cn(styles.chart, extClassName)}>
    {elements.map((item, index) => (
      <Circle
        key={item.id}
        state={item.state}
        head={item.head}
        tail={item.tail}
        letter={item.value}
        index={index}
        extraClass={cn(styles.chart__element, 'mr-8')}
      />
    ))}
  </div>
);

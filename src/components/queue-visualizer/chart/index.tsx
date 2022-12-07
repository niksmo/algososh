import React from 'react';
import cn from 'classnames';
import { Circle } from 'components/ui/circle';
import styles from './styles.module.css';
import { TArrayItem } from 'types';

interface IQueueChartProps {
  elements: TArrayItem<string>[];
  headIndex: number;
  tailIndex: number;
  queueLength: number;
  extClassName?: string;
}

export const QueueChart: React.FC<IQueueChartProps> = ({
  elements,
  headIndex,
  tailIndex,
  queueLength,
  extClassName,
}) => (
  <div className={cn(styles.chart, extClassName)}>
    {elements.map((item, index) => (
      <Circle
        key={item.id}
        state={item.state}
        head={index === headIndex && queueLength ? 'head' : null}
        tail={index === tailIndex && queueLength ? 'tail' : null}
        letter={item.value}
        index={index}
        extraClass={cn(styles.chart__element, 'mr-8')}
      />
    ))}
  </div>
);

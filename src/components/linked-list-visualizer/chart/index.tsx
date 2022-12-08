import React from 'react';
import cn from 'classnames';
import { Circle } from 'components/ui/circle';
import { ElementStates, TArrayItem } from 'types';
import { ArrowIcon } from 'components/ui/icons';
import styles from './styles.module.css';

interface IQueueChartProps {
  elements: TArrayItem<string>[];
  extClassName?: string;
}

export const QueueChart: React.FC<IQueueChartProps> = ({ elements, extClassName }) => {
  const getHead = (headValue: string | null) => {
    if (headValue === 'head') {
      return headValue;
    }

    if (headValue) {
      return <Circle isSmall letter={headValue} state={ElementStates.Changing} />;
    }

    return headValue;
  };

  const getTail = (tailValue: string | null) => {
    if (tailValue === 'tail') {
      return tailValue;
    }

    if (tailValue) {
      return <Circle isSmall letter={tailValue} state={ElementStates.Changing} />;
    }

    return tailValue;
  };

  return (
    <ul className={cn(styles.chart, extClassName)}>
      {elements.map((item, index, array) => (
        <li key={item.id} className={styles.chart__item}>
          <Circle
            head={getHead(item.head!)}
            tail={getTail(item.tail!)}
            state={item.state}
            letter={item.value}
            index={index}
            extraClass={cn(styles.chart__element, 'ml-8 mr-8')}
          />
          {index !== array.length - 1 && <ArrowIcon />}
        </li>
      ))}
    </ul>
  );
};

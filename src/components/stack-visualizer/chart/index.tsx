import React from 'react';
import cn from 'classnames';
import { Circle } from 'components/ui/circle';
import styles from './styles.module.css';
import { TArrayItem } from 'types';

interface IStackChartProps {
  elements: TArrayItem<string>[];
  extClassName?: string;
}

export const StackChart: React.FC<IStackChartProps> = ({ elements, extClassName }) => {
  return (
    <div className={cn(styles.chart, extClassName)}>
      {elements.map(({ value, id, state }, index, arr) => (
        <Circle
          key={id}
          state={state}
          head={index === arr.length - 1 ? 'top' : null}
          letter={value}
          index={index}
          extraClass={cn(styles.chart__element, 'mr-8')}
        />
      ))}
    </div>
  );
};

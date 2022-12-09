import React from 'react';
import cn from 'classnames';
import { Column } from 'components/ui/column';
import type { TArrayItem } from 'types';
import styles from './styles.module.css';

interface ISortingChartProps {
  elements: TArrayItem[];
  extClassName?: string;
}

export const SortingChart: React.FC<ISortingChartProps> = ({ elements, extClassName }) => (
  <div className={cn(styles.sortingChart, extClassName)}>
    {elements.map(item => (
      <Column
        key={item.id}
        elevation={item.value}
        state={item.state}
        extraClass={cn(styles.sortingChart__scale, 'mr-5')}
      />
    ))}
  </div>
);

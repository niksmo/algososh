import React from 'react';
import cn from 'classnames';
import { Button } from 'components/ui/button';
import { RadioInput } from 'components/ui/radio-input';
import { Direction } from 'types/direction';
import styles from './styles.module.css';
import { TSortMethod } from '../utils';

interface ISortManagerProps {
  newArray: () => void;
  isDisabled: boolean;
  sortType: Direction;
  defaultMethod: TSortMethod;
  onChangeMethod: (method: TSortMethod) => void;
  onStart: (value: Direction) => void;
}

export const SortManager: React.FC<ISortManagerProps> = ({
  newArray,
  isDisabled,
  sortType,
  defaultMethod,
  onChangeMethod,
  onStart,
}) => {
  return (
    <form className={styles.controls}>
      <RadioInput
        label="Выбор"
        name="sortType"
        value="selection"
        disabled={isDisabled}
        checked={defaultMethod === 'selection'}
        onChange={evt => onChangeMethod(evt.currentTarget.value as TSortMethod)}
      />
      <RadioInput
        label="Пузырёк"
        name="sortType"
        value="bubble"
        extraClass="ml-10"
        disabled={isDisabled}
        onChange={evt => onChangeMethod(evt.currentTarget.value as TSortMethod)}
      />
      <Button
        extraClass={cn(styles.controls__button, 'ml-25')}
        sorting={Direction.Ascending}
        text="По возрастанию"
        name="ascending"
        disabled={isDisabled}
        isLoader={isDisabled && sortType === Direction.Ascending}
        onClick={evt => onStart(evt.currentTarget.name as Direction)}
      />
      <Button
        extraClass={cn(styles.controls__button, 'ml-6')}
        sorting={Direction.Descending}
        text="По убыванию"
        name="descending"
        disabled={isDisabled}
        isLoader={isDisabled && sortType === Direction.Descending}
        onClick={evt => onStart(evt.currentTarget.name as Direction)}
      />
      <Button
        extraClass={cn(styles.controls__button, 'ml-40')}
        text="Новый массив"
        disabled={isDisabled}
        onClick={() => newArray()}
      />
    </form>
  );
};

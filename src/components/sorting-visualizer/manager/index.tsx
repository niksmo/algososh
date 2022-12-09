import React from 'react';
import cn from 'classnames';
import { Button } from 'components/ui/button';
import { RadioInput } from 'components/ui/radio-input';
import { Direction } from 'types/direction';
import { TSortMethod } from '../utils';
import styles from './styles.module.css';

interface ISortManagerProps {
  newArray: () => void;
  isDisabled: boolean;
  sortType: Direction;
  method: TSortMethod;
  onChangeMethod: (method: TSortMethod) => void;
  onStart: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
}

export const SortManager: React.FC<ISortManagerProps> = ({
  newArray,
  isDisabled,
  sortType,
  method,
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
        checked={method === 'selection'}
        onChange={evt => onChangeMethod(evt.currentTarget.value as TSortMethod)}
      />
      <RadioInput
        label="Пузырёк"
        name="sortType"
        value="bubble"
        extraClass="ml-10"
        disabled={isDisabled}
        checked={method === 'bubble'}
        onChange={evt => onChangeMethod(evt.currentTarget.value as TSortMethod)}
      />
      <Button
        extraClass={cn(styles.controls__button, 'ml-25')}
        sorting={Direction.Ascending}
        text="По возрастанию"
        name="asc"
        value="ascending"
        disabled={isDisabled}
        isLoader={isDisabled && sortType === Direction.Ascending}
        onClick={onStart}
      />
      <Button
        extraClass={cn(styles.controls__button, 'ml-6')}
        sorting={Direction.Descending}
        text="По убыванию"
        name="desc"
        value="descending"
        disabled={isDisabled}
        isLoader={isDisabled && sortType === Direction.Descending}
        onClick={onStart}
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

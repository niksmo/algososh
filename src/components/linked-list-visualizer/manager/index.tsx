import React from 'react';
import cn from 'classnames';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { TAnimationType } from '../utils';
import styles from './styles.module.css';

interface ILinkedListManagerProps {
  value: string;
  index: string;
  listLength: number;
  maxSize: number;
  animation: TAnimationType;
  onValueChange: (evt: React.FormEvent<HTMLInputElement>) => void;
  onIndexChange: (evt: React.FormEvent<HTMLInputElement>) => void;
  onAddInHead: () => void;
  onAddInTail: () => void;
  onDeleteFromHead: () => void;
  onDeleteFromTail: () => void;
  onAddByIndex: () => void;
  onDeleteByIndex: () => void;
  extClassName?: string;
}

export const LinkedListManager: React.FC<ILinkedListManagerProps> = ({
  value,
  index,
  listLength,
  maxSize,
  animation,
  onValueChange,
  onIndexChange,
  onAddInHead,
  onAddInTail,
  onDeleteFromHead,
  onDeleteFromTail,
  onAddByIndex,
  onDeleteByIndex,
  extClassName,
}) => (
  <form className={cn(styles.controls, extClassName)}>
    <div className={styles.controls__row}>
      <Input
        placeholder="Введите значение"
        name="value"
        value={value}
        maxLength={4}
        isLimitText
        extraClass={styles.controls__input}
        onChange={onValueChange}
        disabled={listLength === maxSize || animation !== null}
      />
      <Button
        text="Добавить в head"
        linkedList="small"
        extraClass={cn(styles.controls__button, 'ml-6')}
        isLoader={animation === 'prepend'}
        disabled={value === '' || listLength === maxSize || animation !== null}
        onClick={onAddInHead}
      />
      <Button
        text="Добавить в tail"
        linkedList="small"
        extraClass={cn(styles.controls__button, 'ml-6')}
        isLoader={animation === 'append'}
        disabled={value === '' || listLength === maxSize || animation !== null}
        onClick={onAddInTail}
      />
      <Button
        text="Удалить из head"
        linkedList="small"
        extraClass={cn(styles.controls__button, 'ml-6')}
        isLoader={animation === 'deleteHead'}
        disabled={listLength === 0 || animation !== null}
        onClick={onDeleteFromHead}
      />
      <Button
        text="Удалить из tail"
        linkedList="small"
        extraClass={cn(styles.controls__button, 'ml-6')}
        isLoader={animation === 'deleteTail'}
        disabled={listLength === 0 || animation !== null}
        onClick={onDeleteFromTail}
      />
    </div>
    <div className={cn(styles.controls__row, 'mt-6')}>
      <Input
        placeholder="Введите индекс"
        name="index"
        value={index}
        type="number"
        min={0}
        max={listLength ? listLength - 1 : 0}
        extraClass={styles.controls__input}
        disabled={animation !== null || listLength === 0}
        onChange={onIndexChange}
      />
      <Button
        text="Добавить по индексу"
        linkedList="big"
        extraClass={cn(styles.controls__button, 'ml-6')}
        isLoader={animation === 'addByIndex'}
        disabled={
          value === '' ||
          !index ||
          listLength === maxSize ||
          animation !== null ||
          Number(index) > listLength - 1
        }
        onClick={onAddByIndex}
      />
      <Button
        text="Удалить по индексу"
        linkedList="big"
        extraClass={cn(styles.controls__button, 'ml-6')}
        isLoader={animation === 'deleteByIndex'}
        disabled={
          !index || listLength === 0 || animation !== null || Number(index) > listLength - 1
        }
        onClick={onDeleteByIndex}
      />
    </div>
  </form>
);

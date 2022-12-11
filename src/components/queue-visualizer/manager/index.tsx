import React from 'react';
import cn from 'classnames';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import styles from './styles.module.css';
import { TActionTypes } from '../utils';

interface IQueueManagerProps {
  value: string;
  queueLength: number;
  queueMaxSize: number;
  animation: TActionTypes;
  onChange: (evt: React.FormEvent<HTMLInputElement>) => void;
  onAdd: (evt: React.FormEvent) => void;
  onDelete: () => void;
  onClear: () => void;
  extClassName?: string;
}

export const QueueManager: React.FC<IQueueManagerProps> = ({
  value,
  queueLength,
  queueMaxSize,
  animation,
  onChange,
  onAdd,
  onDelete,
  onClear,
  extClassName,
}) => (
  <form className={cn(styles.controls, extClassName)} onSubmit={onAdd}>
    <Input
      placeholder="Введите значение"
      value={value}
      maxLength={4}
      isLimitText
      extraClass={styles.controls__input}
      onChange={onChange}
      disabled={queueLength === queueMaxSize}
    />
    <Button
      type="submit"
      text="Добавить"
      extraClass="ml-6"
      isLoader={animation === 'add'}
      disabled={!value || queueLength === queueMaxSize}
    />
    <Button
      text="Удалить"
      extraClass="ml-6"
      isLoader={animation === 'delete'}
      disabled={queueLength === 0}
      onClick={onDelete}
    />
    <Button text="Очистить" extraClass="ml-40" disabled={queueLength === 0} onClick={onClear} />
  </form>
);

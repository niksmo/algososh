import React from 'react';
import cn from 'classnames';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import styles from './styles.module.css';

interface IQueueManagerProps {
  value: string;
  queueLength: number;
  queueMaxSize: number;
  onChange: (value: string) => void;
  onAdd: () => void;
  onDelete: () => void;
  onClear: () => void;
  extClassName?: string;
}

export const QueueManager: React.FC<IQueueManagerProps> = ({
  value,
  queueLength,
  queueMaxSize,
  onChange,
  onAdd,
  onDelete,
  onClear,
  extClassName,
}) => (
  <form
    className={cn(styles.controls, extClassName)}
    onSubmit={evt => {
      evt.preventDefault();
      onAdd();
    }}>
    <Input
      value={value}
      maxLength={4}
      isLimitText
      extraClass={styles.controls__input}
      onChange={evt => onChange(evt.currentTarget.value)}
      disabled={queueLength === queueMaxSize}
    />
    <Button
      type="submit"
      text="Добавить"
      extraClass="ml-6"
      disabled={!value || queueLength === queueMaxSize}
    />
    <Button
      text="Удалить"
      extraClass="ml-6"
      disabled={queueLength === 0}
      onClick={() => onDelete()}
    />
    <Button
      text="Очистить"
      extraClass="ml-40"
      disabled={queueLength === 0}
      onClick={() => onClear()}
    />
  </form>
);

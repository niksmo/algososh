import React from 'react';
import cn from 'classnames';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import styles from './styles.module.css';

interface IStackManagerProps {
  value: string;
  stackSize: number;
  stackMaxSize: number;
  onChange: (value: string) => void;
  onAdd: () => void;
  onDelete: () => void;
  onClear: () => void;
  extClassName?: string;
}

export const StackManager: React.FC<IStackManagerProps> = ({
  value,
  stackSize,
  stackMaxSize,
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
      disabled={stackSize === stackMaxSize}
    />
    <Button
      type="submit"
      text="Добавить"
      extraClass="ml-6"
      disabled={!value || stackSize === stackMaxSize}
    />
    <Button text="Удалить" extraClass="ml-6" disabled={!stackSize} onClick={() => onDelete()} />
    <Button text="Очистить" extraClass="ml-40" disabled={!stackSize} onClick={() => onClear()} />
  </form>
);

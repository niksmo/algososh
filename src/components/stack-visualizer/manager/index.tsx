import React from 'react';
import cn from 'classnames';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { TActionType } from '../utils';
import styles from './styles.module.css';

interface IStackManagerProps {
  value: string;
  stackSize: number;
  stackMaxSize: number;
  action: TActionType;
  onChange: (evt: React.FormEvent<HTMLInputElement>) => void;
  onAdd: (evt: React.FormEvent) => void;
  onDelete: () => void;
  onClear: () => void;
  extClassName?: string;
}

export const StackManager: React.FC<IStackManagerProps> = ({
  value,
  stackSize,
  stackMaxSize,
  action,
  onChange,
  onAdd,
  onDelete,
  onClear,
  extClassName,
}) => (
  <form className={cn(styles.controls, extClassName)} onSubmit={onAdd}>
    <Input
      value={value}
      maxLength={4}
      isLimitText
      extraClass={styles.controls__input}
      onChange={onChange}
      disabled={stackSize === stackMaxSize}
    />
    <Button
      type="submit"
      text="Добавить"
      name="add"
      extraClass="ml-6"
      isLoader={action === 'add'}
      disabled={Boolean(action) || !value || stackSize === stackMaxSize}
    />
    <Button
      text="Удалить"
      data-testid="remove"
      extraClass="ml-6"
      isLoader={action === 'delete'}
      disabled={stackSize === 0}
      onClick={onDelete}
    />
    <Button
      text="Очистить"
      data-testid="clear"
      extraClass="ml-40"
      disabled={stackSize === 0}
      onClick={onClear}
    />
  </form>
);

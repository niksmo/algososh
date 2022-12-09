import React from 'react';
import cn from 'classnames';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import styles from './styles.module.css';

interface IFibManagerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (evt: React.FormEvent) => void;
  isDisabled: boolean;
  extClassName?: string;
}

export const FibManager: React.FC<IFibManagerProps> = ({
  value,
  onChange,
  onSubmit,
  isDisabled,
  extClassName,
}) => (
  <form className={cn(styles.controls, extClassName)} onSubmit={onSubmit}>
    <Input
      placeholder="Введите число"
      value={value}
      max={19}
      min={1}
      maxLength={1}
      type="number"
      isLimitText
      extraClass={styles.controls__input}
      onChange={evt => onChange(evt.currentTarget.value)}
      disabled={isDisabled}
    />
    <Button
      type="submit"
      text="Рассчитать"
      extraClass={cn('ml-6', styles.controls__button)}
      isLoader={isDisabled}
    />
  </form>
);

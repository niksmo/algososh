import React from 'react';
import cn from 'classnames';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import styles from './styles.module.css';

interface IReverseManagerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isDisabled: boolean;
  extClassName?: string;
}

export const ReverseManager: React.FC<IReverseManagerProps> = ({
  value,
  onChange,
  onSubmit,
  isDisabled,
  extClassName,
}) => (
  <form
    className={cn(styles.controls, extClassName)}
    onSubmit={evt => {
      evt.preventDefault();
      onSubmit();
    }}>
    <Input
      value={value}
      maxLength={11}
      isLimitText
      extraClass={styles.controls__input}
      onChange={evt => onChange(evt.currentTarget.value)}
      disabled={isDisabled}
    />
    <Button
      type="submit"
      text="Развернуть"
      extraClass={cn('ml-6', styles.controls__button)}
      isLoader={isDisabled}
    />
  </form>
);

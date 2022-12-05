import React, { useState } from 'react';
import cn from 'classnames';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { SolutionLayout } from 'components/ui/solution-layout';
import { StringReverser } from 'components/string-reverser';
import styles from './styles.module.css';

export const StringComponent: React.FC = () => {
  const [inputValue, changeInputValue] = useState('');
  const [reverseString, setReverseString] = useState('');
  const [isReversing, toggleReversingState] = useState(false);

  const handleReverse = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setReverseString(inputValue);
  };

  const handleChangeInputValue = (evt: React.FormEvent<HTMLInputElement>) =>
    changeInputValue(evt.currentTarget.value);

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleReverse}>
        <Input
          value={inputValue}
          maxLength={11}
          isLimitText
          extraClass={styles.form__input}
          onChange={handleChangeInputValue}
        />
        <Button
          type="submit"
          text="Развернуть"
          extraClass={cn('ml-6', styles.form__button)}
          isLoader={isReversing}
        />
      </form>
      {reverseString && (
        <StringReverser
          string={reverseString}
          startCb={() => toggleReversingState(true)}
          finishCb={() => toggleReversingState(false)}
          extClassName={styles.stringComponent__stringReverser}
        />
      )}
    </SolutionLayout>
  );
};

import React, { useState } from 'react';
import cn from 'classnames';
import { SolutionLayout } from 'components/ui/solution-layout';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import styles from './styles.module.css';
import { FibonacciCalc } from 'components/fibonacci-calc';

export const FibonacciPage: React.FC = () => {
  const [inputValue, changeInputValue] = useState('');
  const [fibInt, setFibInt] = useState('');
  const [isCalc, toggleCalcState] = useState(false);

  const handleChangeInputValue = (evt: React.FormEvent<HTMLInputElement>) =>
    changeInputValue(evt.currentTarget.value);

  const handleCalc = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFibInt(inputValue);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleCalc}>
        <Input
          placeholder="Введите число"
          value={inputValue}
          max={19}
          min={1}
          maxLength={1}
          type="number"
          isLimitText
          extraClass={styles.form__input}
          onChange={handleChangeInputValue}
        />
        <Button
          type="submit"
          text="Рассчитать"
          extraClass={cn('ml-6', styles.form__button)}
          isLoader={isCalc}
        />
      </form>
      {fibInt && (
        <FibonacciCalc
          num={fibInt}
          extClassName={styles.fibPage__fibCalc}
          startCb={() => toggleCalcState(true)}
          finishCb={() => toggleCalcState(false)}
        />
      )}
    </SolutionLayout>
  );
};

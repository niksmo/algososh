import React from 'react';
import { SolutionLayout } from 'components/ui/solution-layout';
import { FibCalcVisualizator } from 'components/fib-calc-visualizator';

export const FibonacciPage: React.FC = () => (
  <SolutionLayout title="Последовательность Фибоначчи">
    <FibCalcVisualizator />
  </SolutionLayout>
);

import React from 'react';
import { SolutionLayout } from 'components/ui/solution-layout';
import { FibCalcVisualizer } from 'components/fib-calc-visualizer';

export const FibonacciPage: React.FC = () => (
  <SolutionLayout title="Последовательность Фибоначчи">
    <FibCalcVisualizer />
  </SolutionLayout>
);

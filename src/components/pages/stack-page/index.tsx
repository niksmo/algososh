import { StackVisualizer } from 'components/stack-visualizer';
import React from 'react';
import { SolutionLayout } from '../../ui/solution-layout';

export const StackPage: React.FC = () => {
  return (
    <SolutionLayout title="Стек">
      <StackVisualizer />
    </SolutionLayout>
  );
};

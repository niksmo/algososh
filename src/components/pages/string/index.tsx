import React from 'react';
import { SolutionLayout } from 'components/ui/solution-layout';
import { ReverseVisualizer } from 'components/string-revers-visualizer';

export const StringComponent = () => (
  <SolutionLayout title="Строка">
    <ReverseVisualizer />
  </SolutionLayout>
);

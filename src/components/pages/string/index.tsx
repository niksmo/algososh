import React from 'react';
import { SolutionLayout } from 'components/ui/solution-layout';
import { ReverseVisualizator } from 'components/string-revers-visualizator';

export const StringComponent = () => (
  <SolutionLayout title="Строка">
    <ReverseVisualizator />
  </SolutionLayout>
);

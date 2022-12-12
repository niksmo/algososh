import React from 'react';
import { SolutionLayout } from 'components/ui/solution-layout';
import { SortingVisualizer } from 'components/sorting-visualizer';

export const SortingPage = () => (
  <SolutionLayout title="Сортировка массива">
    <SortingVisualizer />
  </SolutionLayout>
);

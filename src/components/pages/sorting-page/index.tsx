import React from 'react';
import { SolutionLayout } from 'components/ui/solution-layout';
import { SortingVisualizator } from 'components/sorting-visualizator';

export const SortingPage = () => (
  <SolutionLayout title="Сортировка массива">
    <SortingVisualizator />
  </SolutionLayout>
);

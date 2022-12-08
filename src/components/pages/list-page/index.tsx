import React from 'react';
import { SolutionLayout } from 'components/ui/solution-layout';
import { LinkedListVisualizer } from 'components/linked-list-visualizer';

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <LinkedListVisualizer />
    </SolutionLayout>
  );
};

import React from 'react';
import { QueueVisualizer } from 'components/queue-visualizer';
import { SolutionLayout } from 'components/ui/solution-layout';

export const QueuePage: React.FC = () => {
  return (
    <SolutionLayout title="Очередь">
      <QueueVisualizer />
    </SolutionLayout>
  );
};

import { useEffect, useReducer } from 'react';
import { QueueChart } from './chart';
import { QueueManager } from './manager';
import {
  changeValueAction,
  renderAction,
  queueReducer,
  queueVisualizerState,
  useQueue,
  animateAction,
  generateQueueAnimation,
} from './utils';
import styles from './styles.module.css';

export const QueueVisualizer = () => {
  const queue = useQueue();
  const [{ inputValue, animation, renderElements }, dispatch] = useReducer(
    queueReducer,
    queueVisualizerState
  );

  const handleAdd = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!inputValue.trim()) {
      dispatch(changeValueAction(''));
      return;
    }
    queue.enqueue(inputValue.trim());
    dispatch(changeValueAction(''));

    const animationGenerator = generateQueueAnimation(renderElements, queue.tail);
    for await (let elements of animationGenerator) {
      dispatch(animateAction(elements, 'add'));
    }
    dispatch(renderAction(queue.getArray()));
  };

  const handleDelete = async () => {
    const animationGenerator = generateQueueAnimation(renderElements, queue.head);
    for await (let elements of animationGenerator) {
      dispatch(animateAction(elements, 'delete'));
    }
    queue.dequeue();
    dispatch(renderAction(queue.getArray()));
  };

  const handleClear = () => {
    queue.clear();
    dispatch(renderAction(queue.getArray()));
  };

  useEffect(() => {
    dispatch(renderAction(queue.getArray()));
  }, []);

  return (
    <div>
      <QueueManager
        value={inputValue}
        queueLength={queue.length}
        queueMaxSize={queue.maxSize}
        animation={animation}
        onAdd={handleAdd}
        onChange={value => dispatch(changeValueAction(value))}
        onClear={handleClear}
        onDelete={handleDelete}
      />
      <QueueChart elements={renderElements} extClassName={styles.queue__chart} />
    </div>
  );
};

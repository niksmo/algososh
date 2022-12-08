import { useEffect, useReducer } from 'react';
import { QueueChart } from './chart';
import { QueueManager } from './manager';
import { ElementStates } from 'types';
import { SHORT_DELAY_IN_MS } from 'constants/delays';
import {
  addAction,
  changeValueAction,
  clearAction,
  deleteAction,
  renderAction,
  queueReducer,
  queueVisualizerState,
  useQueue,
  animateAction,
} from './utils';
import styles from './styles.module.css';

export const QueueVisualizer = () => {
  const queue = useQueue();
  const [{ inputValue, action, animation, renderElements, head, tail, length }, dispatch] =
    useReducer(queueReducer, queueVisualizerState, initState => ({
      ...initState,
      maxSize: queue.maxSize,
    }));

  const handleAdd = () => {
    if (!action) {
      queue.enqueue(inputValue);
      dispatch(addAction());
    }
  };

  const handleClear = () => {
    queue.clear();
    dispatch(clearAction());
  };

  const handleDelete = () => {
    if (!action) {
      queue.dequeue();
      dispatch(deleteAction());
    }
  };

  async function renderQueue(animateIndex: number) {
    renderElements[animateIndex].state = ElementStates.Changing;
    dispatch(animateAction(renderElements));
    await new Promise(resolve => setTimeout(resolve, SHORT_DELAY_IN_MS));
    dispatch(renderAction(queue.elements, queue.head, queue.tail, queue.length));
  }

  useEffect(() => {
    dispatch(renderAction(queue.elements, queue.head, queue.tail, queue.length));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!animation && action) {
      if (action === 'add') {
        renderQueue(queue.tail);
      }
      if (action === 'delete') {
        renderQueue(head);
      }

      if (action === 'clear') {
        dispatch(renderAction(queue.elements, queue.head, queue.tail, queue.length));
      }
    }
    // eslint-disable-next-line
  }, [queue.length, renderElements, action, animation]);

  return (
    <div>
      <QueueManager
        value={inputValue}
        queueLength={queue.length}
        queueMaxSize={queue.maxSize}
        onAdd={handleAdd}
        onChange={value => dispatch(changeValueAction(value))}
        onClear={handleClear}
        onDelete={handleDelete}
      />
      <QueueChart
        elements={renderElements}
        queueLength={length}
        headIndex={head}
        tailIndex={tail}
        extClassName={styles.queue__chart}
      />
    </div>
  );
};

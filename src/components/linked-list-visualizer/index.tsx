import { useEffect, useReducer } from 'react';
import { QueueChart } from './chart';
import { LinkedListManager } from './manager';
import {
  changeValueAction,
  renderAction,
  animateAction,
  useLinkedList,
  linkedListReducer,
  linkedListVisualizerState,
  changeIndexAction,
  generateAddAnimation,
  generateDeleteAnimation,
} from './utils';
import styles from './styles.module.css';

export const LinkedListVisualizer = () => {
  const linkedList = useLinkedList();
  const [{ inputValue, indexValue, animation, renderElements }, dispatch] = useReducer(
    linkedListReducer,
    linkedListVisualizerState
  );

  const handleAddInHead = async () => {
    if (!inputValue.trim()) {
      dispatch(changeValueAction(''));
      return;
    }

    linkedList.prepend(inputValue);
    dispatch(changeValueAction(''));
    const animationGenerator = generateAddAnimation(renderElements, inputValue, 'prepend');
    for await (let elements of animationGenerator) {
      dispatch(animateAction('prepend', elements));
    }
    dispatch(renderAction(linkedList.toArray()));
  };

  const handleAddInTail = async () => {
    if (!inputValue.trim()) {
      dispatch(changeValueAction(''));
      return;
    }

    linkedList.append(inputValue);
    dispatch(changeValueAction(''));
    const animationGenerator = generateAddAnimation(renderElements, inputValue, 'append');
    for await (let elements of animationGenerator) {
      dispatch(animateAction('append', elements));
    }
    dispatch(renderAction(linkedList.toArray()));
  };

  const handleDeleteFromHead = async () => {
    linkedList.deleteHead();
    const animationGenerator = generateDeleteAnimation(renderElements, 'deleteHead');
    for await (let elements of animationGenerator) {
      dispatch(animateAction('deleteHead', elements));
    }
    dispatch(renderAction(linkedList.toArray()));
  };

  const handleDeleteFromTail = async () => {
    linkedList.deleteTail();
    const animationGenerator = generateDeleteAnimation(renderElements, 'deleteTail');
    for await (let elements of animationGenerator) {
      dispatch(animateAction('deleteTail', elements));
    }
    dispatch(renderAction(linkedList.toArray()));
  };

  const handleAddByIndex = async () => {
    if (!inputValue.trim()) {
      dispatch(changeValueAction(''));
      return;
    }

    linkedList.addByIndex(inputValue, Number(indexValue));
    dispatch(changeValueAction(''));
    dispatch(changeIndexAction(''));
    const animationGenerator = generateAddAnimation(
      renderElements,
      inputValue,
      'addByIndex',
      indexValue
    );
    for await (let elements of animationGenerator) {
      dispatch(animateAction('addByIndex', elements));
    }
    dispatch(renderAction(linkedList.toArray()));
  };

  const handleDeleteByIndex = async () => {
    linkedList.deleteByIndex(Number(indexValue));
    dispatch(changeIndexAction(''));
    const animationGenerator = generateDeleteAnimation(renderElements, 'deleteByIndex', indexValue);
    for await (let elements of animationGenerator) {
      dispatch(animateAction('deleteByIndex', elements));
    }
    dispatch(renderAction(linkedList.toArray()));
  };

  useEffect(() => {
    dispatch(renderAction(linkedList.toArray()));
  }, []);

  return (
    <div>
      <LinkedListManager
        value={inputValue}
        index={indexValue}
        listLength={linkedList.length}
        maxSize={linkedList.maxSize}
        animation={animation}
        onValueChange={value => dispatch(changeValueAction(value))}
        onIndexChange={index => dispatch(changeIndexAction(index))}
        onAddInHead={handleAddInHead}
        onAddInTail={handleAddInTail}
        onDeleteFromHead={handleDeleteFromHead}
        onDeleteFromTail={handleDeleteFromTail}
        onAddByIndex={handleAddByIndex}
        onDeleteByIndex={handleDeleteByIndex}
      />
      <QueueChart elements={renderElements} extClassName={styles.linkedList__chart} />
    </div>
  );
};

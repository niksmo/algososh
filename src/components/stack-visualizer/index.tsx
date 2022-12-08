import { useEffect, useReducer } from 'react';
import { StackChart } from './chart';
import { StackManager } from './manager';
import {
  addAction,
  changeValueAction,
  clearAction,
  deleteAction,
  generateHighlightSequence,
  setRenderAction,
  stackReducer,
  stackVisualizerState,
  toggleAnimationAction,
  useStack,
} from './utils';
import styles from './styles.module.css';

export const StackVisualizer = () => {
  const stack = useStack();
  const [{ inputValue, action, animation, renderElements }, dispatch] = useReducer(
    stackReducer,
    stackVisualizerState
  );

  const handleAdd = () => {
    if (!action) {
      stack.push(inputValue);
      dispatch(addAction());
    }
  };

  const handleClear = () => {
    stack.clear();
    dispatch(clearAction());
  };

  const handleDelete = () => {
    if (!action) {
      stack.pop();
      dispatch(deleteAction());
    }
  };

  async function renderStackContainer(arr: typeof stack.elements) {
    dispatch(toggleAnimationAction(true));
    const highlightSequence = generateHighlightSequence(arr);
    for await (let arr of highlightSequence) {
      dispatch(setRenderAction(arr));
    }
    if (action === 'delete') {
      dispatch(setRenderAction(stack.elements));
    }
    dispatch(toggleAnimationAction(false, null));
  }

  useEffect(() => {
    if (!animation && action) {
      if (action === 'add') {
        renderStackContainer(stack.elements);
      }
      if (action === 'delete') {
        renderStackContainer(renderElements);
      }

      if (action === 'clear') {
        dispatch(setRenderAction(stack.elements));
      }
    }
    // eslint-disable-next-line
  }, [stack.size, renderElements, action, animation]);

  return (
    <div>
      <StackManager
        value={inputValue}
        stackSize={stack.size}
        stackMaxSize={stack.maxSize}
        onAdd={handleAdd}
        onChange={value => dispatch(changeValueAction(value))}
        onClear={handleClear}
        onDelete={handleDelete}
      />
      <StackChart elements={renderElements} extClassName={styles.stack__chart} />
    </div>
  );
};

import { ArrayItem } from 'helpers/entities';
import { ElementStates } from 'types';
import { generateReverseAnimation } from './utils';

describe('reverse string', () => {
  it('should correctly reverse string with even count of substrings', async () => {
    let reversedItems: ArrayItem<string>[] = [];

    const reverseIterator = generateReverseAnimation('1234', 0);
    for await (let arrayOfItems of reverseIterator) {
      reversedItems = arrayOfItems;
    }

    const expectedValues = ['4', '3', '2', '1'];

    expect(reversedItems.map(item => item.value)).toEqual(expectedValues);
  });

  it('should correctly reverse string with odd count of substrings', async () => {
    let reversedItems: ArrayItem<string>[] = [];

    const reverseIterator = generateReverseAnimation('12345', 0);
    for await (let arrayOfItems of reverseIterator) {
      reversedItems = arrayOfItems;
    }

    const expectedValues = ['5', '4', '3', '2', '1'];

    expect(reversedItems.map(item => item.value)).toEqual(expectedValues);
  });

  it('should correctly reverse string with one substring', async () => {
    let reversedItems: ArrayItem<string>[] = [];

    const reverseIterator = generateReverseAnimation('1', 0);
    for await (let arrayOfItems of reverseIterator) {
      reversedItems = arrayOfItems;
    }

    const expectedValues = ['1'];

    expect(reversedItems.map(item => item.value)).toEqual(expectedValues);
  });

  it('should correctly reverse empty string', async () => {
    let reversedItems: ArrayItem<string>[] = [];

    const reverseIterator = generateReverseAnimation('', 0);
    for await (let arrayOfItems of reverseIterator) {
      reversedItems = arrayOfItems;
    }

    const expectedValues: number[] = [];

    expect(reversedItems.map(item => item.value)).toEqual(expectedValues);
  });

  it('should correctly changing items state', async () => {
    let array: ArrayItem<string>[] = [];

    const reverseIterator = generateReverseAnimation('123', 0);

    array = await reverseIterator.next().then(next => next.value);
    expect([array[0].state, array[2].state]).toEqual(
      Array.from(new Array(2), i => ElementStates.Changing)
    );

    array = await reverseIterator.next().then(next => next.value);
    expect([array[0].state, array[2].state]).toEqual(
      Array.from(new Array(2), i => ElementStates.Modified)
    );

    array = await reverseIterator.next().then(next => next.value);
    expect(array[1].state).toEqual(ElementStates.Changing);

    array = await reverseIterator.next().then(next => next.value);
    expect(array.every(item => item.state === ElementStates.Modified)).toBe(true);
  });
});

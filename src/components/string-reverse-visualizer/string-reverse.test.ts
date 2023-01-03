import { ArrayItem } from 'helpers/entities';
import { ElementStates } from 'types';
import { generateReverseAnimation } from './utils';

describe('reverse string', () => {
  let array: ArrayItem<string>[] = [];
  let reverseIterator: ReturnType<typeof generateReverseAnimation>;
  let expectedValues: string[];

  it('should correctly reverse string with even count of substrings', async () => {
    reverseIterator = generateReverseAnimation('1234', 0);
    for await (let arrayOfItems of reverseIterator) {
      array = arrayOfItems;
    }

    expectedValues = ['4', '3', '2', '1'];

    expect(array.map(item => item.value)).toEqual(expectedValues);
  });

  it('should correctly reverse string with odd count of substrings', async () => {
    reverseIterator = generateReverseAnimation('12345', 0);
    for await (let arrayOfItems of reverseIterator) {
      array = arrayOfItems;
    }

    expectedValues = ['5', '4', '3', '2', '1'];

    expect(array.map(item => item.value)).toEqual(expectedValues);
  });

  it('should correctly reverse string with one substring', async () => {
    reverseIterator = generateReverseAnimation('1', 0);
    for await (let arrayOfItems of reverseIterator) {
      array = arrayOfItems;
    }

    expectedValues = ['1'];

    expect(array.map(item => item.value)).toEqual(expectedValues);
  });

  it('should correctly reverse empty string', async () => {
    reverseIterator = generateReverseAnimation('', 0);
    for await (let arrayOfItems of reverseIterator) {
      array = arrayOfItems;
    }

    expect(array.map(item => item.value)).toEqual(expectedValues);
  });

  it('should correctly changing items state', async () => {
    reverseIterator = generateReverseAnimation('123', 0);

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

import { generateBubbleSortAnimation, generateSelectionSortAnimation } from './utils';
import { ArrayItem } from 'helpers/entities';
import { Direction } from 'types';

describe('sort array', () => {
  let iterator: ReturnType<
    typeof generateBubbleSortAnimation | typeof generateSelectionSortAnimation
  >;
  let returnedArray: ArrayItem[] | undefined = [];

  const arrayL0: ArrayItem[] = [];

  const arrayL1 = [new ArrayItem(3)];

  const arrayL4 = [new ArrayItem(3), new ArrayItem(1), new ArrayItem(7), new ArrayItem(4)];

  const expectedArray = {
    L0: arrayL0,
    L1: arrayL1,
    L4: {
      asc: [1, 3, 4, 7],
      des: [7, 4, 3, 1],
    },
  };

  describe('with bubble method', () => {
    it('should correctly sort empty array', async () => {
      iterator = generateBubbleSortAnimation(arrayL0, Direction.Ascending, 0);
      returnedArray = await iterator.next().then(next => next.value);

      expect(returnedArray).toEqual(expectedArray.L0);
    });

    it('should correctly sort array with one element', async () => {
      iterator = generateBubbleSortAnimation([...arrayL1], Direction.Ascending, 0);

      returnedArray = await iterator.next().then(next => next.value);

      expect(returnedArray).toEqual(expectedArray.L1);
    });

    it('should correctly sort array with several elements', async () => {
      iterator = generateBubbleSortAnimation([...arrayL4], Direction.Ascending, 0);

      for await (let array of iterator) {
        returnedArray = array;
      }

      expect(returnedArray?.map(item => item.value)).toEqual(expectedArray.L4.asc);

      iterator = generateBubbleSortAnimation([...arrayL4], Direction.Descending, 0);

      for await (let array of iterator) {
        returnedArray = array;
      }

      expect(returnedArray?.map(item => item.value)).toEqual(expectedArray.L4.des);
    });
  });

  describe('with selection method', () => {
    it('should correctly sort empty array', async () => {
      iterator = generateSelectionSortAnimation(arrayL0, Direction.Ascending, 0);
      returnedArray = await iterator.next().then(next => next.value);

      expect(returnedArray).toEqual(expectedArray.L0);
    });

    it('should correctly sort array with one element', async () => {
      iterator = generateSelectionSortAnimation([...arrayL1], Direction.Ascending, 0);

      returnedArray = await iterator.next().then(next => next.value);

      expect(returnedArray).toEqual(expectedArray.L1);
    });

    it('should correctly sort array with several elements', async () => {
      iterator = generateSelectionSortAnimation([...arrayL4], Direction.Ascending, 0);

      for await (let array of iterator) {
        returnedArray = array;
      }

      expect(returnedArray?.map(item => item.value)).toEqual(expectedArray.L4.asc);

      iterator = generateSelectionSortAnimation([...arrayL4], Direction.Descending, 0);

      for await (let array of iterator) {
        returnedArray = array;
      }

      expect(returnedArray?.map(item => item.value)).toEqual(expectedArray.L4.des);
    });
  });
});

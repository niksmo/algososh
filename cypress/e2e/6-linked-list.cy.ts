import { ElementStates } from 'types';
import { getRegExp } from './utils';

const getSelector = (testId: string) => {
  return `[data-testid=${testId}]`;
};

describe('linked-list visualizer work', () => {
  const valueInput = '@valueInput';
  const addToHead = '@addToHead';
  const addToTail = '@addToTail';
  const removeFromHead = '@removeFromHead';
  const removeFromTail = '@removeFromTail';
  const indexInput = '@indexInput';
  const addByIndex = '@addByIndex';
  const removeByIndex = '@removeByIndex';
  const linkedList = '@linkedList';

  const head = getSelector('circle-head');
  const tail = getSelector('circle-tail');
  const circle = getSelector('circle-main');
  const listItem = getSelector('circle');
  const smallListItem = getSelector('circle-small');
  const listItemValue = getSelector('circle-value');
  const listItemIndex = getSelector('circle-index');

  beforeEach(() => {
    cy.visit('/list');

    cy.get(getSelector('valueInput')).as('valueInput');
    cy.get(getSelector('addToHead')).as('addToHead');
    cy.get(getSelector('addToTail')).as('addToTail');
    cy.get(getSelector('removeFromHead')).as('removeFromHead');
    cy.get(getSelector('removeFromTail')).as('removeFromTail');
    cy.get(getSelector('indexInput')).as('indexInput');
    cy.get(getSelector('addByIndex')).as('addByIndex');
    cy.get(getSelector('removeByIndex')).as('removeByIndex');
    cy.get(listItem).as('linkedList');
  });

  describe('init linked list', () => {
    it('should render list', () => {
      cy.get(linkedList).each(($element, index, $array) => {
        cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Default));

        cy.wrap($element).find(listItemValue).should('not.have.text', '');
        cy.wrap($element).find(listItemIndex).should('have.text', String(index));

        cy.wrap($element)
          .find(head)
          .then($head => {
            if (index === 0) {
              return cy.wrap($head).should('have.text', 'head');
            }

            cy.wrap($head).should('have.text', '');
          });

        cy.wrap($element)
          .find(tail)
          .then($tail => {
            if (index === $array.length - 1) {
              return cy.wrap($tail).should('have.text', 'tail');
            }

            cy.wrap($tail).should('have.text', '');
          });
      });
    });
  });

  describe('buttons and input', () => {
    it('should unavailable add buttons, while value input is empty', () => {
      cy.get(valueInput).should('have.value', '');
      cy.get(addToTail).should('have.attr', 'disabled');
      cy.get(addToHead).should('have.attr', 'disabled');
      cy.get(addByIndex).should('have.attr', 'disabled');
    });

    it('should available remove buttons, while linked list is exist', () => {
      cy.get(removeFromHead).should('not.have.attr', 'disabled');
      cy.get(removeFromTail).should('not.have.attr', 'disabled');

      const clearList = () => {
        cy.get(linkedList)
          .its('length')
          .then(length => {
            cy.get(removeFromTail).click();
            cy.wait(1000);
            if (length > 1) {
              clearList();
            }
          });
      };

      clearList();

      cy.get(removeFromHead).should('have.attr', 'disabled');
      cy.get(removeFromTail).should('have.attr', 'disabled');
    });

    it('should limit value', () => {
      cy.get(valueInput).type('12345').should('have.value', '1234');
    });
  });

  describe('add linked-list item', () => {
    it('should adds new item to head', () => {
      cy.get(listItemValue).then($listValues => {
        const initValues = $listValues.toArray().map(el => el.textContent);
        cy.get(valueInput).type('abcd');
        cy.get(addToHead).click();
        cy.wait(1000);
        cy.get(listItemValue).then($newValues => {
          const newValues = $newValues.toArray().map(el => el.textContent);
          cy.wrap(newValues).should('deep.equal', ['abcd', ...initValues]);
        });
      });
    });
    it('should adds new item to tail', () => {
      cy.get(listItemValue).then($listValues => {
        const initValues = $listValues.toArray().map(el => el.textContent);
        cy.get(valueInput).type('abcd');
        cy.get(addToTail).click();
        cy.wait(1000);
        cy.get(listItemValue).then($newValues => {
          const newValues = $newValues.toArray().map(el => el.textContent);
          cy.wrap(newValues).should('deep.equal', [...initValues, 'abcd']);
        });
      });
    });
    it('should adds new item by index', () => {
      cy.get(listItemValue).then($listValues => {
        const initValues = $listValues.toArray().map(el => el.textContent);
        cy.get(valueInput).type('abcd');
        cy.get(indexInput).type('1');
        cy.get(addByIndex).click();
        cy.wait(1000);
        cy.get(listItemValue).then($newValues => {
          const newValues = $newValues.toArray().map(el => el.textContent);
          const exectedValues = [...initValues];
          exectedValues.splice(1, 0, 'abcd');
          cy.wrap(newValues).should('deep.equal', exectedValues);
        });
      });
    });
    it('should show animation while adds to head', () => {
      cy.get(valueInput).type('abcd');
      cy.get(addToHead).click();
      cy.get(linkedList).each(($element, index) => {
        if (index === 0) {
          cy.wrap($element).find(smallListItem).as('newItem');
          cy.get('@newItem').find(circle).matchClass(/small/i);
          cy.get('@newItem').find(listItemValue).should('have.text', 'abcd');
          cy.wrap($element).find(`>${circle}`).matchClass(getRegExp(ElementStates.Default));
        }
      });
      cy.wait(1000);
      cy.get('@newItem').should('not.exist');
      cy.get(linkedList).each(($element, index, $array) => {
        if (index === 0) {
          cy.wrap($element).find(listItemValue).should('have.text', 'abcd');
          cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Modified));
          return;
        }
        cy.wrap($element)
          .find(head)
          .then($head => {
            if (index === 0) {
              return cy.wrap($head).should('have.text', 'head');
            }
            cy.wrap($head).should('have.text', '');
          });
        cy.wrap($element)
          .find(tail)
          .then($tail => {
            if (index === $array.length - 1) {
              return cy.wrap($tail).should('have.text', 'tail');
            }
            cy.wrap($tail).should('have.text', '');
          });
        cy.wrap($element).find(listItemIndex).should('have.text', index);
        cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Default));
      });
      cy.wait(1000);
      cy.get(linkedList).first().find(circle).matchClass(getRegExp(ElementStates.Default));
    });
    it('should show animation while adds to tail', () => {
      cy.get(valueInput).type('wxyz');
      cy.get(addToTail).click();
      cy.get(linkedList).each(($element, index, $array) => {
        if (index === $array.length - 1) {
          cy.wrap($element).find(smallListItem).as('newItem');
          cy.get('@newItem').find(circle).matchClass(/small/i);
          cy.get('@newItem').find(listItemValue).should('have.text', 'wxyz');
          cy.wrap($element).find(`>${circle}`).matchClass(getRegExp(ElementStates.Default));
        }
      });
      cy.wait(1000);
      cy.get('@newItem').should('not.exist');
      cy.get(linkedList).each(($element, index, $array) => {
        if (index === $array.length - 1) {
          cy.wrap($element).find(listItemValue).should('have.text', 'wxyz');
          cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Modified));
          return;
        }
        cy.wrap($element)
          .find(head)
          .then($head => {
            if (index === 0) {
              return cy.wrap($head).should('have.text', 'head');
            }
            cy.wrap($head).should('have.text', '');
          });
        cy.wrap($element)
          .find(tail)
          .then($tail => {
            if (index === $array.length - 1) {
              return cy.wrap($tail).should('have.text', 'tail');
            }
            cy.wrap($tail).should('have.text', '');
          });
        cy.wrap($element).find(listItemIndex).should('have.text', index);
        cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Default));
      });
      cy.wait(1000);
      cy.get(linkedList).last().find(circle).matchClass(getRegExp(ElementStates.Default));
    });

    it('should show animation while adds by index', () => {
      cy.get(valueInput).type('777');
      cy.get(indexInput).type('1');
      cy.get(addByIndex).click();

      cy.get(linkedList).each(($element, index) => {
        if (index === 0) {
          cy.wrap($element).find(smallListItem).as('newItem');
          cy.get('@newItem').find(circle).matchClass(/small/i);
          cy.get('@newItem').find(listItemValue).should('have.text', '777');
          cy.wrap($element).find(`>${circle}`).matchClass(getRegExp(ElementStates.Default));
        }
      });

      cy.wait(1000);

      cy.get('@newItem').should('not.exist');

      cy.get(linkedList).each(($element, index) => {
        if (index === 0) {
          cy.wrap($element).find(head).should('have.text', 'head');
          cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Changing));
        }

        if (index === 1) {
          cy.wrap($element).find(smallListItem).as('newItem');
          cy.get('@newItem').find(circle).matchClass(/small/i);
          cy.get('@newItem').find(listItemValue).should('have.text', '777');
          cy.wrap($element).find(`>${circle}`).matchClass(getRegExp(ElementStates.Default));
        }
      });

      cy.wait(1000);

      cy.get('@newItem').should('not.exist');

      cy.get(linkedList).each(($element, index) => {
        if (index === 0) {
          cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Changing));
        }

        if (index === 1) {
          cy.wrap($element).find(listItemValue).should('have.text', '777');
          cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Modified));
        }
      });

      cy.wait(1000);

      cy.get(linkedList).each(($element, index) => {
        if (index === 1) {
          cy.wrap($element).find(listItemValue).should('have.text', '777');
        }

        cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Default));
      });
    });
  });

  describe('remove linked-list item', () => {
    it('should remove item from head', () => {
      cy.get(listItemValue).then($listValues => {
        const initValues = $listValues.toArray().map(el => el.textContent);
        cy.get(removeFromHead).click();
        cy.wait(1000);
        cy.get(listItemValue).then($newValues => {
          const newValues = $newValues.toArray().map(el => el.textContent);
          initValues.shift();
          cy.wrap(newValues).should('deep.equal', initValues);
        });
      });
    });

    it('should remove item from tail', () => {
      cy.get(listItemValue).then($listValues => {
        const initValues = $listValues.toArray().map(el => el.textContent);
        cy.get(removeFromTail).click();
        cy.wait(1000);
        cy.get(listItemValue).then($newValues => {
          const newValues = $newValues.toArray().map(el => el.textContent);
          initValues.pop();
          cy.wrap(newValues).should('deep.equal', initValues);
        });
      });
    });

    it('should remove item by index', () => {
      cy.get(listItemValue).then($listValues => {
        const initValues = $listValues.toArray().map(el => el.textContent);
        cy.get(indexInput).type('1');
        cy.get(removeByIndex).click();
        cy.wait(2000);
        cy.get(listItemValue).then($newValues => {
          const newValues = $newValues.toArray().map(el => el.textContent);
          initValues.splice(1, 1);
          cy.wrap(newValues).should('deep.equal', initValues);
        });
      });
    });

    it('should show animation while remove from head', () => {
      cy.get(listItemValue)
        .first()
        .then($headValue => {
          const headValue = $headValue.text();

          cy.get(removeFromHead).click();

          cy.get(linkedList).each(($element, index) => {
            if (index === 0) {
              cy.wrap($element).find(smallListItem).as('removedItem');
              cy.get('@removedItem').find(circle).matchClass(/small/i);
              cy.get('@removedItem').find(listItemValue).invoke('text').should('equal', headValue);
              cy.wrap($element).find(`>${circle}`).find(listItemValue).should('have.text', '');
            }
            cy.wrap($element).find(`>${circle}`).matchClass(getRegExp(ElementStates.Default));
          });
        });

      cy.wait(1000);

      cy.get(smallListItem).should('not.exist');

      cy.get(linkedList).each(($element, index, $array) => {
        cy.wrap($element)
          .find(head)
          .then($head => {
            if (index === 0) {
              return cy.wrap($head).should('have.text', 'head');
            }
            cy.wrap($head).should('have.text', '');
          });

        cy.wrap($element)
          .find(tail)
          .then($tail => {
            if (index === $array.length - 1) {
              return cy.wrap($tail).should('have.text', 'tail');
            }
            cy.wrap($tail).should('have.text', '');
          });
        cy.wrap($element).find(listItemIndex).should('have.text', index);
        cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Default));
      });
    });

    it('should show animation while remove from tail', () => {
      cy.get(listItemValue)
        .last()
        .then($tailValue => {
          const tailValue = $tailValue.text();

          cy.get(removeFromTail).click();

          cy.get(linkedList).each(($element, index, $array) => {
            if (index === $array.length - 1) {
              cy.wrap($element).find(smallListItem).as('removedItem');
              cy.get('@removedItem').find(circle).matchClass(/small/i);
              cy.get('@removedItem').find(listItemValue).invoke('text').should('equal', tailValue);
              cy.wrap($element).find(`>${circle}`).find(listItemValue).should('have.text', '');
            }
            cy.wrap($element).find(`>${circle}`).matchClass(getRegExp(ElementStates.Default));
          });
        });

      cy.wait(1000);

      cy.get(smallListItem).should('not.exist');

      cy.get(linkedList).each(($element, index, $array) => {
        cy.wrap($element)
          .find(head)
          .then($head => {
            if (index === 0) {
              return cy.wrap($head).should('have.text', 'head');
            }
            cy.wrap($head).should('have.text', '');
          });

        cy.wrap($element)
          .find(tail)
          .then($tail => {
            if (index === $array.length - 1) {
              return cy.wrap($tail).should('have.text', 'tail');
            }
            cy.wrap($tail).should('have.text', '');
          });
        cy.wrap($element).find(listItemIndex).should('have.text', index);
        cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Default));
      });
    });

    it('should show animation while remove by index', () => {
      cy.get(indexInput).type('1');

      cy.get(listItemValue)
        .eq(1)
        .then($indexValue => {
          const indexValue = $indexValue.text();

          cy.get(removeByIndex).click();

          cy.get(linkedList).each(($element, index, $array) => {
            if (index === 0) {
              cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Changing));
            } else {
              cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Default));
            }
          });

          cy.wait(1000);

          cy.get(linkedList).each(($element, index, $array) => {
            if (index === 0) {
              cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Changing));
            } else if (index === 1) {
              cy.wrap($element).find(smallListItem).as('removedItem');
              cy.get('@removedItem').find(circle).matchClass(/small/i);
              cy.get('@removedItem').find(listItemValue).invoke('text').should('equal', indexValue);
              cy.wrap($element).find(`>${circle}`).matchClass(getRegExp(ElementStates.Changing));
              cy.wrap($element).find(`>${circle}`).find(listItemValue).should('have.text', '');
            } else {
              cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Default));
            }
          });
        });

      cy.wait(1000);

      cy.get(linkedList).each(($element, index, $array) => {
        cy.wrap($element)
          .find(head)
          .then($head => {
            if (index === 0) {
              return cy.wrap($head).should('have.text', 'head');
            }
            cy.wrap($head).should('have.text', '');
          });

        cy.wrap($element)
          .find(tail)
          .then($tail => {
            if (index === $array.length - 1) {
              return cy.wrap($tail).should('have.text', 'tail');
            }
            cy.wrap($tail).should('have.text', '');
          });
        cy.wrap($element).find(listItemIndex).should('have.text', index);
        cy.wrap($element).find(circle).matchClass(getRegExp(ElementStates.Default));
      });
    });
  });
});

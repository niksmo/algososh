import { ElementStates } from 'types';
import { getRegExp } from './utils';

describe('stack visualizer work', () => {
  beforeEach(() => {
    cy.visit('/queue');
    cy.get('input').as('input');
    cy.get('button[type=submit]').as('submitBtn');
    cy.get('[data-testid=remove]').as('removeBtn');
    cy.get('[data-testid=clear]').as('clearBtn');
  });

  describe('buttons and input', () => {
    it('when input is empty, add button should be unavailable', () => {
      cy.get('@input').should('have.value', '');
      cy.get('@submitBtn').should('have.attr', 'disabled');

      cy.get('@input').type('abcd');
      cy.get('@input').should('have.value', 'abcd');
      cy.get('@submitBtn').should('not.have.attr', 'disabled');
    });

    it('should limit input value', () => {
      cy.get('@input').type('12345').should('have.value', '1234');
    });

    it('when stack is empty, delete and clear buttons should be unavailable', () => {
      cy.get('@removeBtn').should('have.attr', 'disabled');
      cy.get('@clearBtn').should('have.attr', 'disabled');

      cy.get('@input').type('abcd');
      cy.get('@submitBtn').click();

      cy.get('@removeBtn').should('not.have.attr', 'disabled');
      cy.get('@clearBtn').should('not.have.attr', 'disabled');
    });
  });

  describe('add item in queue', () => {
    it('should add item', () => {
      cy.get('[data-testid=circle-value]')
        .as('values')
        .then($elements => {
          const isEmpty = Array.from($elements.get()).every(el => el.textContent === '');
          cy.wrap(isEmpty).should('be.true');
        });

      cy.get('@input').type('abc');

      cy.get('@submitBtn').click();
      cy.get('@submitBtn')
        .find('img')
        .as('loader')
        .then($el => {
          cy.wrap($el[0].className).should('match', /loader/i);
        });
      cy.get('@input').should('have.value', '');

      cy.get('[data-testid=circle]')
        .as('queue')
        .each(($element, index) => {
          if (index === 0) {
            cy.wrap($element)
              .find('[data-testid=circle-main]')
              .matchClass(getRegExp(ElementStates.Changing));
          } else {
            cy.wrap($element)
              .find('[data-testid=circle-main]')
              .matchClass(getRegExp(ElementStates.Default));
          }
          cy.wrap($element).find('[data-testid=circle-head]').should('have.value', '');

          cy.wrap($element).find('[data-testid=circle-tail]').should('have.value', '');

          cy.wrap($element).find('[data-testid=circle-value]').should('have.value', '');
        });

      cy.wait(1000);

      cy.get('@loader').should('not.exist');

      cy.get('@queue').each(($element, index) => {
        if (index === 0) {
          cy.wrap($element).contains('head');
          cy.wrap($element).contains('tail');
          cy.wrap($element).contains('abc');

          cy.wrap($element)
            .find('[data-testid=circle-main]')
            .matchClass(getRegExp(ElementStates.Default));
          return;
        }
        cy.wrap($element).find('[data-testid=circle-head]').should('have.value', '');

        cy.wrap($element).find('[data-testid=circle-tail]').should('have.value', '');

        cy.wrap($element).find('[data-testid=circle-value]').should('have.value', '');
        cy.wrap($element)
          .find('[data-testid=circle-main]')
          .matchClass(getRegExp(ElementStates.Default));
      });

      cy.get('@input').type('def');
      cy.get('@submitBtn').click();
      cy.get('@loader');
      cy.get('@input').should('have.value', '');

      cy.get('@queue').each(($element, index) => {
        if (index === 0) {
          cy.wrap($element).contains('head');
          cy.wrap($element).contains('tail');
          cy.wrap($element).contains('abc');

          cy.wrap($element)
            .find('[data-testid=circle-main]')
            .matchClass(getRegExp(ElementStates.Default));
          return;
        } else {
          cy.wrap($element).find('[data-testid=circle-head]').should('have.value', '');

          cy.wrap($element).find('[data-testid=circle-tail]').should('have.value', '');

          cy.wrap($element).find('[data-testid=circle-value]').should('have.value', '');
        }

        if (index === 1) {
          cy.wrap($element)
            .find('[data-testid=circle-main]')
            .matchClass(getRegExp(ElementStates.Changing));
        } else {
          cy.wrap($element)
            .find('[data-testid=circle-main]')
            .matchClass(getRegExp(ElementStates.Default));
        }
      });

      cy.wait(1000);

      cy.get('@loader').should('not.exist');

      cy.get('@queue').each(($element, index) => {
        if (index === 0) {
          cy.wrap($element).contains('head');
          cy.wrap($element).contains('tail').should('not.exist');
          cy.wrap($element).contains('abc');
        }

        if (index === 1) {
          cy.wrap($element).contains('tail');
          cy.wrap($element).contains('def');
        }

        cy.wrap($element)
          .find('[data-testid=circle-main]')
          .matchClass(getRegExp(ElementStates.Default));
      });

      cy.get('@values').then($elements => {
        const values = $elements.toArray().filter(el => el.textContent !== '');
        cy.wrap(values.length).should('equal', 2);
      });
    });
  });

  describe('remove and clear queue', () => {
    beforeEach(() => {
      cy.get('@input').type('abc{enter}');
      cy.wait(1000);
      cy.get('@input').type('def{enter}');
      cy.wait(1000);
    });

    it('should remove item from queue', () => {
      cy.get('@removeBtn').click();
      cy.get('@removeBtn')
        .find('img')
        .as('loader')
        .then($el => {
          cy.wrap($el[0].className).should('match', /loader/i);
        });

      cy.get('[data-testid=circle]')
        .as('queue')
        .each(($element, index) => {
          if (index === 0) {
            cy.wrap($element).contains('head');
            cy.wrap($element).contains('tail').should('not.exist');
            cy.wrap($element).contains('abc');
          }

          if (index === 1) {
            cy.wrap($element).contains('tail');
            cy.wrap($element).contains('def');
          }

          if (index === 0) {
            cy.wrap($element)
              .find('[data-testid=circle-main]')
              .matchClass(getRegExp(ElementStates.Changing));
          } else {
            cy.wrap($element)
              .find('[data-testid=circle-main]')
              .matchClass(getRegExp(ElementStates.Default));
          }
        });

      cy.wait(1000);

      cy.get('@loader').should('not.exist');

      cy.get('@queue').each(($element, index) => {
        if (index === 0) {
          cy.wrap($element).find('[data-testid=circle-head]').should('have.value', '');

          cy.wrap($element).find('[data-testid=circle-tail]').should('have.value', '');

          cy.wrap($element).find('[data-testid=circle-value]').should('have.value', '');
        }

        if (index === 1) {
          cy.wrap($element).contains('tail');
          cy.wrap($element).contains('head');
          cy.wrap($element).contains('def');
        }

        cy.wrap($element)
          .find('[data-testid=circle-main]')
          .matchClass(getRegExp(ElementStates.Default));
      });
    });

    it('should clear stack', () => {
      cy.get('@clearBtn').click();
      cy.get('[data-testid=circle-value]')
        .as('values')
        .then($elements => {
          const isEmpty = $elements.toArray().every(el => el.textContent === '');
          cy.wrap(isEmpty).should('be.true');
        });
    });
  });
});

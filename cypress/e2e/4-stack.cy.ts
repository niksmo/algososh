import { ElementStates } from 'types';
import { getRegExp } from './utils';

describe('stack visualizer work', () => {
  beforeEach(() => {
    cy.visit('/stack');
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

    it('when stack is empty, delete and clear buttons should be unavailable', () => {
      cy.get('@removeBtn').should('have.attr', 'disabled');
      cy.get('@clearBtn').should('have.attr', 'disabled');

      cy.get('@input').type('abcd');
      cy.get('@submitBtn').click();

      cy.get('@removeBtn').should('not.have.attr', 'disabled');
      cy.get('@clearBtn').should('not.have.attr', 'disabled');
    });
  });

  describe('add item in stack', () => {
    it('should add item', () => {
      cy.get('[data-testid=circle]').should('not.exist');

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
        .as('stack')
        .each($element => {
          cy.wrap($element).contains('top').as('prevTop');
          cy.wrap($element).contains('0');
          cy.wrap($element).contains('abc');
          cy.wrap($element)
            .find('[data-testid=circle-main]')
            .as('circle')
            .then($el => {
              cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Changing));
            });
        });

      cy.wait(500);

      cy.get('@loader').should('not.exist');

      cy.get('@circle').then($el =>
        cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Default))
      );

      cy.get('@input').type('def');
      cy.get('@submitBtn').click();
      cy.get('@loader');
      cy.get('@input').should('have.value', '');

      cy.get('@prevTop').should('not.exist');

      cy.get('@stack').each(($element, index) => {
        if (index === 0) {
          cy.wrap($element).contains('0');
          cy.wrap($element).contains('abc');
          return;
        }
        cy.wrap($element).contains('top');
        cy.wrap($element).contains('1');
        cy.wrap($element).contains('def');
        cy.wrap($element)
          .find('[data-testid=circle-main]')
          .as('circle')
          .then($el => {
            cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Changing));
          });
      });

      cy.wait(500);

      cy.get('@loader').should('not.exist');

      cy.get('@circle').then($el =>
        cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Default))
      );
    });
  });

  describe('remove and clear stack', () => {
    beforeEach(() => {
      cy.get('@input').type('abc{enter}');
      cy.wait(500);
      cy.get('@input').type('def{enter}');
      cy.wait(500);
      cy.get('[data-testid=circle]').as('stack').its('length').should('equal', 2);
    });

    it('should remove item from stack', () => {
      cy.get('@removeBtn').click();
      cy.get('@removeBtn')
        .find('img')
        .as('loader')
        .then($el => {
          cy.wrap($el[0].className).should('match', /loader/i);
        });

      cy.get('@stack').each(($element, index) => {
        if (index === 1) {
          cy.wrap($element).contains('top');
          cy.wrap($element).contains('1');
          cy.wrap($element).contains('def');
          cy.wrap($element)
            .find('[data-testid=circle-main]')
            .then($el => {
              cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Changing));
            });
          return;
        }

        cy.wrap($element).as('stackItem').contains('top').should('not.exist');
        cy.wrap($element).contains('0');
        cy.wrap($element).contains('abc');

        cy.wrap($element)
          .find('[data-testid=circle-main]')
          .as('circle')
          .then($el => {
            cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Default));
          });
      });

      cy.wait(500);

      cy.get('@stack').its('length').should('equal', 1);
      cy.contains('def').should('not.exist');
      cy.get('@loader').should('not.exist');

      cy.get('@stackItem').contains('0');
      cy.get('@stackItem').contains('abc');
      cy.get('@circle').then($el => {
        cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Default));
      });
    });

    it('should clear stack', () => {
      cy.get('@clearBtn').click();
      cy.get('[data-testid=circle]').should('not.exist');
    });
  });
});

export {};

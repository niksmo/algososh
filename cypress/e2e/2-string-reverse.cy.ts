import { ElementStates } from 'types';

describe('string reverse visualizer work', () => {
  beforeEach(() => {
    cy.visit('/recursion');
  });

  it('when input is empty, reverse button should be unavailable', () => {
    cy.get('input').as('input').should('have.value', '');
    cy.get('button[type=submit]').as('button').should('have.attr', 'disabled');

    cy.get('@input').type('12345').should('have.value', '12345');
    cy.get('@button').click();
  });

  const checkControlsState = (should: 'disabled' | 'enabled') => {
    const prefix = should === 'disabled' ? '' : 'not.';

    cy.get('button[type=submit]').should(`${prefix}have.attr`, 'disabled');
    cy.get('button[type=submit] > img').should(`${prefix}exist`);
  };

  const getRegExp = (value: string) => new RegExp(value, 'i');

  it('should reverse string with odd length', () => {
    cy.get('input').type('12345{enter}').should('have.attr', 'disabled');

    checkControlsState('disabled');

    cy.get('[data-testid=circle-value]')
      .as('values')
      .then($values => {
        cy.wrap($values.text()).should('equal', '12345');
      });
    cy.get('[data-testid=circle-main]')
      .as('elements')
      .each(($el, index) => {
        if (index === 0 || index === 4) {
          cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Changing));
          return;
        }
        cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Default));
      });

    cy.wait(1000);

    cy.get('@values').then($values => {
      cy.wrap($values.text()).should('equal', '52341');
    });
    cy.get('@elements').each(($el, index) => {
      if (index === 0 || index === 4) {
        cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Modified));
        return;
      }
      if (index === 1 || index === 3) {
        cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Changing));
        return;
      }
      cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Default));
    });

    cy.wait(1000);

    cy.get('@values').then($values => {
      cy.wrap($values.text()).should('equal', '54321');
    });
    cy.get('@elements').each(($el, index) => {
      if (index === 2) {
        cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Changing));
        return;
      }
      cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Modified));
    });

    cy.wait(1000);

    cy.get('@elements').each($el => {
      cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Modified));
    });

    checkControlsState('enabled');
  });

  it('should reverse string with even length', () => {
    cy.get('input').type('abcd{enter}').should('have.attr', 'disabled');

    checkControlsState('disabled');

    cy.get('[data-testid=circle-value]')
      .as('values')
      .then($values => {
        cy.wrap($values.text()).should('equal', 'abcd');
      });
    cy.get('[data-testid=circle-main]')
      .as('elements')
      .each(($el, index) => {
        if (index === 0 || index === 3) {
          cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Changing));
          return;
        }
        cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Default));
      });

    cy.wait(1000);

    cy.get('@values').then($values => {
      cy.wrap($values.text()).should('equal', 'dbca');
    });
    cy.get('@elements').each(($el, index) => {
      if (index === 0 || index === 3) {
        cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Modified));
        return;
      }

      cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Changing));
    });

    cy.wait(1000);

    cy.get('@values').then($values => {
      cy.wrap($values.text()).should('equal', 'dcba');
    });
    cy.get('@elements').each($el => {
      cy.wrap($el[0].className).should('match', getRegExp(ElementStates.Modified));
    });

    checkControlsState('enabled');
  });
});

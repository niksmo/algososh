describe('fibonacci calc visualizer work', () => {
  beforeEach(() => {
    cy.visit('fibonacci');
  });

  it('when input is empty, reverse button should be unavailable', () => {
    cy.get('input').as('input').should('have.value', '');
    cy.get('button[type=submit]').as('button').should('have.attr', 'disabled');

    cy.get('@input').type('2').should('have.value', '2');
    cy.get('@button').click();
  });

  it('should calculate and visualize fibonacci num', () => {
    const expectedValues = [
      '1',
      '1',
      '2',
      '3',
      '5',
      '8',
      '13',
      '21',
      '34',
      '55',
      '89',
      '144',
      '233',
      '377',
      '610',
      '987',
      '1597',
      '2584',
      '4181',
      '6765',
    ];

    cy.get('input').as('input').type('19{enter}');
    cy.get('@input').should('have.attr', 'disabled');

    cy.get('button[type=submit]')
      .find('img')
      .as('loader')
      .then($el => {
        cy.wrap($el[0].className).should('match', /loader/i);
      });

    cy.get('[data-testid=circle-value]')
      .as('values')
      .should('not.have.length')
      .then($el => {
        cy.wrap($el.text()).should('equal', '1');
      });

    cy.wait(500);

    cy.get('@values').should('have.length', 2);

    cy.wait(18 * 500);

    cy.get('@values').should('have.length', 20);
    cy.get('@values').then($elements => {
      const arrayOfValues = $elements.map((i, element) => element.textContent);

      expect(arrayOfValues.get()).to.deep.equal(expectedValues);
    });

    cy.get('@input').should('not.have.attr', 'disabled');
    cy.get('@loader').should('not.exist');
  });
});

export {};

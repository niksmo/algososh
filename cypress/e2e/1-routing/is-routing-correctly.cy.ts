describe('app works correctly with routes', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid=navigation]').as('mainNavigation');
  });

  const testRoute = (page: string, title: string) => () => {
    cy.get('@mainNavigation').should('exist');
    cy.get(`[href$=${page}]`).click();
    cy.get('@mainNavigation').should('not.exist');
    cy.contains(title, { matchCase: false }).should('exist');
    cy.get('[data-testid=returnBtn]').click();
    cy.get('@mainNavigation').should('exist');
  };

  it(
    'should open reverse string visualizer and come back to main',
    testRoute('recursion', 'строка')
  );

  it(
    'should open fib calc visualizer and come back to main',
    testRoute('fibonacci', 'последовательность фибоначчи')
  );

  it(
    'should open sorting visualizer and come back to main',
    testRoute('sorting', 'сортировка массива')
  );

  it('should open stack visualizer and come back to main', testRoute('stack', 'стек'));

  it('should open queue visualizer and come back to main', testRoute('queue', 'очередь'));

  it(
    'should open linked-list visualizer and come back to main',
    testRoute('list', 'связный список')
  );
});

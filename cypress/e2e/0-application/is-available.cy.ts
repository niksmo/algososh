describe('application is available', () => {
  it('should be available on localhost:3000/algososh', () => {
    cy.visit('/');
    cy.get('main').should('exist');
  });
});

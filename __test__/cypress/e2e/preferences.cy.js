describe('User preferences', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5555');
  });

  it('loads preferences bar succesfully', () => {
    cy.visit('http://localhost:5555');
    cy.get('#settings-content').should('exist');
  });

  it('should have preferences for pistes', () => {
    cy.visit('http://localhost:5555');
    cy.get('#piste-preferences').should('exist');
  });

  it('should have preferences for lifts', () => {
    cy.visit('http://localhost:5555');
    cy.get('#lift-preferences').should('exist');
  });

  it('toggles a specific piste checkbox', () => {
    // Select a specific checkbox by a more stable identifier, like the first checkbox in the list
    cy.get('#piste-preferences input[type="checkbox"]').first()
      .as('firstCheckbox') // Alias this checkbox for easy reference
      .then(($checkbox) => {
        cy.wrap($checkbox)
          .click() // Toggle the checkbox
          .should('not.be.checked'); // Check the new state against the initial state
      })
      .click() // Toggle it again
      .then(($checkbox) => {
        cy.wrap($checkbox)
          .should('be.checked'); // Check the state has returned to the initial
      });
  });
});
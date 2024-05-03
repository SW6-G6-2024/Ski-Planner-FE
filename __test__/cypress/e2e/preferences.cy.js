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
    // Select the first checkbox and perform actions in separate commands
    cy.get('#piste-preferences input[type="checkbox"]').first()
      .as('firstCheckbox') // Alias this checkbox for easy reference
      .click() // Toggle the checkbox
      .should('not.be.checked'); // Assert the checkbox is unchecked after the first click
  
    cy.get('@firstCheckbox') // Re-query the checkbox using the alias
      .click() // Toggle it again
      .should('be.checked'); // Assert the checkbox is checked after the second click
  });
  
});
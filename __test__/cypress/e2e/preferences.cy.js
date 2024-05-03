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
    // First action: Click the checkbox and verify its unchecked state
    cy.get('#piste-preferences input[type="checkbox"]').first()
      .click() // Toggle the checkbox
      .should('not.be.checked'); // Verify it's unchecked
  
    // Second action: Re-query the checkbox, click again, and verify its checked state
    cy.get('#piste-preferences input[type="checkbox"]').first()
      .click() // Toggle the checkbox again
      .should('be.checked'); // Verify it's checked
  });  
});
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
    // First click the checkbox
    cy.get('#piste-preferences input[type="checkbox"]').first()
      .click(); // Toggle the checkbox
  
    // Then verify its unchecked state
    cy.get('#piste-preferences input[type="checkbox"]').first()
      .should('not.be.checked'); // Verify it's unchecked
  
    // Click the checkbox again
    cy.get('#piste-preferences input[type="checkbox"]').first()
      .click(); // Toggle the checkbox again
  
    // Finally verify its checked state
    cy.get('#piste-preferences input[type="checkbox"]').first()
      .should('be.checked'); // Verify it's checked
  });
  
});
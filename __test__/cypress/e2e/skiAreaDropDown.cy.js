describe('Ski Area Dropdown', () => {
  beforeEach(() => {
    cy.intercept('GET', Cypress.env('BACKEND_URL') + '/api/ski-areas/*', {
      fixture: 'ski-area.json',
    });
    cy.intercept('GET', Cypress.env('BACKEND_URL') + '/api/ski-areas/*', {
      fixture: 'new-ski-area.json',
    });
  });

  it('should display SkiAreaDropDown button', () => {
    cy.visit('/');
    cy.get('#ski-area-dropdown-button').should('exist');
  });

  it('should display ski area options when dropdown is clicked', () => {
    cy.visit('/');
    // Click the dropdown button to open the dropdown
    cy.get('#ski-area-dropdown-button').click();

    // Check if the dropdown is open and the options are visible
    cy.get('button').contains('Trysil').should('be.visible');
    cy.get('button').contains('Isaberg').should('be.visible');
  });

  it('should fly to Isaberg and click on Dalbacken piste', () => {
    cy.visit('/');

    cy.get('#ski-area-dropdown-button').click();
    cy.get('button').contains('Isaberg').click();

    cy.get('.leaflet-container').should('exist');
    cy.get('.leaflet-interactive').eq(40).click({ force: true });
    cy.get('.leaflet-popup').should('exist');
    cy.get('.leaflet-popup-content').should('contain', 'Dalbacken');
  });
});
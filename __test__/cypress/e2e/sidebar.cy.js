describe('Ski map', () => {
  beforeEach(() => {
    cy.intercept('GET', Cypress.env('BACKEND_URL') + '/api/ski-areas/*', {
      fixture: 'ski-area.json',
    });
  });

  it('loads sidebar succesfully', () => {
    cy.visit('http://localhost:5555');
    cy.get('#guide-content').should('exist');
  });

  it('should have a legend', () => {
    cy.visit('http://localhost:5555');
    cy.get('#legend-content').should('exist');
  });

  it('should show the step-by-step guide when best route has been generated successfully', () => {
    cy.visit('http://localhost:5555');
    cy.intercept('POST', Cypress.env('BACKEND_URL') + '/api/routes/generate-route', {
      fixture: 'best-route.json',
      statusCode: 200,
    }).as('generateRouteSuccess');
  
    cy.get('.leaflet-container').click(100, 100);
    cy.get('.leaflet-container').click(200, 200);
    cy.get('#generate-route-button').click();

    cy.wait('@generateRouteSuccess');
  
    const valuesToCheck = ["31", "63", "H2 Høgegga"];
    valuesToCheck.forEach(value => {
      cy.get('.flex-grow.overflow-y-auto').contains(value).should('exist');
    });
  });
});
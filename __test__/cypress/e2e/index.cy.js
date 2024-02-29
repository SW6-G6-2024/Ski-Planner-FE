describe('Ski map', () => {
  beforeEach(() => {
    cy.intercept('GET', /http:\/\/localhost:8888\/api\/ski-area.*/, {
      fixture: 'ski-area.json',
    });
    cy.intercept('POST', /http:\/\/localhost:8888\/api\/routes\/generate-route.*/, {
      fixture: 'best-route.json',
    });
  });

  it('loads succesfully', () => {
    cy.visit('http://localhost:5555');
    cy.get('.leaflet-container').should('exist');

    cy.get('.leaflet-interactive').first()
      .should('exist')
      .should('have.attr', 'stroke', 'black')
      .should('have.attr', 'stroke-width', '3');
  });

  it('should have a legend', () => {
    cy.visit('http://localhost:5555');
    cy.get('#legend').should('exist');
  });

  it('should have popups with piste name for each piste', () => {
    cy.visit('http://localhost:5555');
    cy.get('.leaflet-interactive').first().click({ force: true});
    cy.get('.leaflet-popup').should('exist');
    cy.get('.leaflet-popup-content').should('contain', '75');

    cy.get('.leaflet-interactive').eq(58).click({ force: true});
    cy.get('.leaflet-popup').should('exist');
    cy.get('.leaflet-popup-content').should('contain', '31');
  });

  it('should have a button to find the best route', () => {
    cy.visit('http://localhost:5555');
    cy.get('#generate-route-button').should('exist');
  });

  it('should find the best route at button click', () => {
    cy.visit('http://localhost:5555');
    cy.get('#best-route').should('not.exist');
    cy.get('#generate-route-button').click();
    cy.get('#best-route').should('exist');
  });
});
describe('Ski map', () => {
  beforeEach(() => {
    cy.intercept('GET', /http:\/\/localhost:8888\/api\/ski-area.*/, {
      fixture: 'ski-area.json',
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
    cy.get('[testId=legend]').should('exist');
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
});
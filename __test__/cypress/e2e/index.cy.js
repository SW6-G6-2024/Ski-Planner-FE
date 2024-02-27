describe('Front page', () => {
  beforeEach(() => {
    cy.intercept('GET', /http:\/\/localhost:8888\/api\/ski-area.*/, {
      fixture: 'ski-area.json',
    });
  });

  it('loads site succesfully', () => {
    cy.visit('http://localhost:5555');
    cy.get('.leaflet-container').should('exist');

    const pisteExample = cy.get('.leaflet-interactive').first();
    pisteExample.should('exist');
    pisteExample.should('have.attr', 'stroke', 'black');
    pisteExample.should('have.attr', 'stroke-width', '3');
  })

  it('should have a legend', () => {
    cy.visit('http://localhost:5555');
    cy.get('[testId=legend]').should('exist');
  });

  it('should have popups with piste name for each piste', () => {
    cy.visit('http://localhost:5555');
    let piste = cy.get('.leaflet-interactive').first();
    piste.click({ force: true});
    cy.get('.leaflet-popup').should('exist');
    cy.get('.leaflet-popup-content').should('contain', '75');

    piste = cy.get('.leaflet-interactive').eq(58);
    piste.click({ force: true});
    cy.get('.leaflet-popup').should('exist');
    cy.get('.leaflet-popup-content').should('contain', '31');
  });
})
describe('Ski map', () => {
  beforeEach(() => {
    cy.intercept('GET', /http:\/\/localhost:8888\/api\/ski-area.*/, {
      fixture: 'ski-area.json',
    });
    cy.intercept('POST', /http:\/\/localhost:8888\/api\/routes\/generate-route.*/, {
      fixture: 'best-route.json',
    });
    cy.intercept('POST', /http:\/\/localhost:8888\/api\/rate-piste.*/, {
      statusCode: 200,
      body: { message: "Successfully rated piste" },
    });
  });

  it('loads succesfully', () => {
    cy.visit('https://cypress-secure:5555');
    cy.get('.leaflet-container').should('exist');

    cy.get('.leaflet-interactive').first()
      .should('exist')
      .should('have.attr', 'stroke', 'black')
      .should('have.attr', 'stroke-width', '3');
  });

  it('should have a legend', () => {
    cy.visit('https://cypress-secure:5555');
    cy.get('#legend').should('exist');
  });

  it('should have popups with piste name for each piste', () => {
    cy.visit('https://cypress-secure:5555');
    // The number is 165 because the first 164 elements are pistes with colours but no popups
    cy.get('.leaflet-interactive').eq(167).click({ force: true});
    cy.get('.leaflet-popup').should('exist');
    cy.get('.leaflet-popup-content').should('contain', '75');

    cy.get('.leaflet-interactive').eq(225).click({ force: true});
    cy.get('.leaflet-popup').should('exist');
    cy.get('.leaflet-popup-content').should('contain', '31');
  });

  it('should have a button to find the best route', () => {
    cy.visit('https://cypress-secure:5555');
    cy.get('#generate-route-button').should('exist');
  });

  it('should enable the user to place two markers on the map', () => {
    cy.visit('https://cypress-secure:5555');
    cy.get('.leaflet-container').click(100, 100);
    cy.get('.leaflet-marker-icon').should('have.length', 1);
    cy.get('.leaflet-container').click(200, 200);
    cy.get('.leaflet-marker-icon').should('have.length', 2);
  });

  it('should find the best route at button click when two markers are placed', () => {
    cy.visit('https://cypress-secure:5555');
    cy.get('.leaflet-container').click(100, 100);
    cy.get('.leaflet-container').click(200, 200);
    cy.get('#generate-route-button').click();
    cy.get('.leaflet-interactive')
      .filter('path[stroke="grey"]')
      .should('exist');
  });

  it('should not find the best route at button click if not markers are placed', () => {
    cy.visit('https://cypress-secure:5555');
    cy.get('#generate-route-button').click();
    cy.get('.leaflet-interactive')
      .filter('path[stroke="grey"]')
      .should('not.exist');
  });

  it('displays an error message if the route generation fails', () => {
    // Intercept the POST request and force it to fail
    cy.intercept('POST', /http:\/\/localhost:8888\/api\/routes\/generate-route.*/, {
      statusCode: 500, // Simulate server error
    }).as('generateRouteFail');
  
    cy.visit('https://cypress-secure:5555');
    cy.get('.leaflet-container').click(100, 100);
    cy.get('.leaflet-container').click(200, 200);
    cy.get('#generate-route-button').click();
  
    // Wait for the intercepted request to resolve
    cy.wait('@generateRouteFail');
  
    // Check for the presence of an error toast
    cy.get('div[role="status"]').should('contain', 'Failed to generate route');
  });

  it('displays a success message when the route is generated successfully', () => {
    // Intercept the POST request and mock a successful response
    cy.intercept('POST', /http:\/\/localhost:8888\/api\/routes\/generate-route.*/, {
      fixture: 'best-route.json', // Assuming this fixture represents a successful route response
      statusCode: 200, // Simulate success
    }).as('generateRouteSuccess');
  
    cy.visit('https://cypress-secure:5555');
    cy.get('.leaflet-container').click(100, 100);
    cy.get('.leaflet-container').click(200, 200);
    cy.get('#generate-route-button').click();
  
    // Wait for the intercepted request to resolve
    cy.wait('@generateRouteSuccess');
  
    // Check for the presence of a success toast
    // Adjust the selector and message as needed based on how your application displays success notifications
    cy.get('div[role="status"]').should('contain', 'Successfully generated route');
  });

  it('should display the ratings div within a piste popup', () => {
    // Open the piste popup
    cy.visit('http://localhost:5555');
    cy.get('.leaflet-interactive').eq(167).click({ force: true});
    cy.get('.leaflet-popup').should('exist');

    cy.get('.leaflet-popup-content').find('div[id^="star-rating-container-"]').should('exist');

    cy.get('.leaflet-popup-content').find('div[id^="star-rating-container-"]')
      .find('button').should('have.length', 5);
  });

  it('should rate a piste when a star is clicked', () => {
    // Open the piste popup
    cy.visit('http://localhost:5555');
    cy.get('.leaflet-interactive').eq(167).click({ force: true});
    cy.get('.leaflet-popup').should('exist');

    // Click the first star
    cy.get('.leaflet-popup-content').find('div[id^="star-rating-container-"]')
      .find('button').first().click();

    // Check for the success message
    cy.get('div[role="status"]').should('contain', 'Successfully rated piste');
  });
});
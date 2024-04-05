beforeEach(() => {
	cy.intercept('GET', /http:\/\/localhost:8888\/api\/ski-area.*/, {
		fixture: 'ski-area.json',
	});
	cy.intercept('POST', /http:\/\/localhost:8888\/api\/routes\/generate-route.*/, {
		fixture: 'best-route.json',
	});
	cy.intercept('GET', 'https://dev-b8qw0pac72kuwxyk.eu.auth0.com/authorize', {
		statusCode: 200,
		body: 'OK',
	});
});

describe('Profile avatar', () => {
	it('should display the user avatar', () => {
		cy.visit('/');
		cy.get('#profile-avatar').should('exist');
	});

	it('should display the default profile avatar image', () => {
		cy.visit('https:///cypress-secure:5555');
		cy.get('#profile-avatar svg').should('exist');
	});

	it('should open the profile menu when the avatar is clicked', () => {
		cy.visit('https:///cypress-secure:5555');
		cy.get('#profile-avatar').click();
		cy.get('#profile-menu').should('exist');
		cy.get('#login-button').should('exist');
	});
});

describe('Profile menu', () => {
	it('should log the user in when the login button is clicked', () => {
		cy.visit('https:///cypress-secure:5555');
		cy.get('#profile-avatar').click();
		cy.get('#login-button').click();
		cy.origin('https://dev-b8qw0pac72kuwxyk.eu.auth0.com', () => {
			cy.url().then((url) => {
				cy.get('input[name="username"]').type('cypress@test.com');
				cy.get('input[name="password"]').type(Cypress.env('CYPRESS_PASSWORD'), { log: false });
				cy.get('.ca1220cdf button[type="submit"]').click();
			});
		})
		
		cy.get('#profile-avatar img').should('exist'); // Profile picture should be displayed
	});
});
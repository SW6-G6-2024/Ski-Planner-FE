beforeEach(() => {
	cy.intercept('GET', /http:\/\/localhost:8888\/api\/ski-area.*/, {
		fixture: 'ski-area.json',
	});
	cy.intercept('POST', /http:\/\/localhost:8888\/api\/routes\/generate-route.*/, {
		fixture: 'best-route.json',
	});
	cy.intercept('GET', /http:\/\/dev-b8qw0pac72kuwxyk\.eu\.auth0\.com\/authorize\?.*/, {
		statusCode: 200,
		body: 'OK',
	});
	cy.intercept('PATCH', 'http://localhost:8888/api/users/*', {
		statusCode: 200,
		body: {
			message: 'User updated',
		},
	});
});

describe('Profile avatar', () => {
	it('should display the user avatar', () => {
		cy.visit('/');
		cy.get('#profile-avatar').should('exist');
	});

	it('should display the default profile avatar image', () => {
		cy.visit('/');
		cy.get('#profile-avatar svg').should('exist');
	});

	it('should open the profile menu when the avatar is clicked', () => {
		cy.visit('/');
		cy.get('#profile-avatar').click();
		cy.get('#profile-menu').should('exist');
		cy.get('#login-button').should('exist');
	});
});

describe('Profile menu', () => {
	beforeEach(() => {
		login();
	});

	it('should log the user in when the login button is clicked', () => {
		cy.get('#profile-avatar img').should('exist'); // Profile picture should be displayed
	});

	it('should log the user out when the logout button is clicked', () => {
		cy.get('#profile-avatar').click();
		cy.get('#logout-button').click();
		cy.get('#profile-avatar').click();
		cy.get('#profile-avatar svg').should('exist'); // Default profile picture should be displayed
		cy.get('#login-button').should('exist');
	});

	it('should display the user\'s name and settings button when the user is logged in', () => {
		cy.get('#profile-avatar').click();
		cy.get('#profile-name').should('contain', 'Cypress');
		cy.get('#settings-button').should('exist');
	});

	it('should enable the user to change name', () => {
		cy.get('#profile-avatar').click();
		cy.get('#settings-button').click();
		cy.get('#profile-settings').should('exist');
		cy.get('#edit-profile-button').click();
		cy.get('#last-name-input').type('Test');
		cy.get('#save-profile-button').click();
		cy.get('div[role="status"]').should('contain', 'Successfully updated user');
	});
});

function login() {
	cy.visit('/');
	cy.get('#profile-avatar').click();
	cy.get('#login-button').click();
	cy.wait(10000);
	cy.origin('https://dev-b8qw0pac72kuwxyk.eu.auth0.com', () => {
		cy.get('input[name="username"]').type('cypress@test.com');
		cy.get('input[name="password"]').type(Cypress.env('CYPRESS_PASSWORD'), { log: false });
		cy.get('.ca1220cdf button[type="submit"]').click();
	});
}
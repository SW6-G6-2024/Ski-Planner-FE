const env = import.meta.env;

// Access the environment variables
const keys = {
	backendUrl: env.VITE_BACKEND_URL,
	auth0Domain: env.VITE_AUTH0_DOMAIN,
	auth0ClientId: env.VITE_AUTH0_CLIENT_ID,
	auth0ClientSecret: env.VITE_AUTH0_CLIENT_SECRET,
	cypressPassword: env.VITE_CYPRESS_PASSWORD,
};

export default keys;
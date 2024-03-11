const env = import.meta.env;

// Access the environment variables
const keys = {
	cookieKey: env.COOKIE_KEY,
	backendUrl: env.VITE_BACKEND_URL,
};

export default keys;
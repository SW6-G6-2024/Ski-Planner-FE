import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert({
		savePath: "./certs/",
		source: "github"
	})],
	base: "",
	envDir: "./config/",
	server: {
		host: true,
		port: 3000,
		watch: {
			usePolling: true,
		},
		chokidarWatchOptions: {
			usePolling: true,
		},
	},
});

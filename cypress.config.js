import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  projectId: "k24rot",
  supportFolder: "__test__/cypress/support",
  fixturesFolder: "__test__/cypress/fixtures",
  e2eFolder: "__test__/cypress/e2e",
  screenshotsFolder: "__test__/cypress/screenshots",
  
  e2e: {
    baseUrl: "https://cypress-secure:5555",
    specPattern: "__test__/cypress/e2e/**/*.cy.js",
    supportFile: "__test__/cypress/support/e2e.js",
  },
  env: {
    VITE_BACKEND_URL: "http://localhost:8888",
    CYPRESS_PASSWORD: process.env.CYPRESS_PASSWORD,
  },
  hosts: {
    "cypress-secure": "127.0.0.1",
  }
});

import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "k24rot",
  supportFolder: "__test__/cypress/support",
  fixturesFolder: "__test__/cypress/fixtures",
  e2eFolder: "__test__/cypress/e2e",
  
  e2e: {
    specPattern: "__test__/cypress/e2e/**/*.cy.js",
    supportFile: "__test__/cypress/support/e2e.js",
  },
});

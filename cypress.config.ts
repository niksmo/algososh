import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    viewportWidth: 1280,
    viewportHeight: 860,
    baseUrl: 'http://localhost:3000/algososh',
    video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});

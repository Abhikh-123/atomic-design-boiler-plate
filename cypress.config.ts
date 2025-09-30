// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },

//   component: {
//     devServer: {
//       framework: "react",
//       bundler: "vite",
//     },
//   },
// });
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
     baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    // Correct placement of the baseUrl inside the component configuration
    
  },
});

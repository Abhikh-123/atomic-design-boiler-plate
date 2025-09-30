# React + TypeScript + Vite

<!-- for project start -     -->

npm run dev

<!-- Start json server  -->

json-server --watch <file path >

e.g. json-server --watch src/assets/db.json

<!-- for unit testing (jest/react testing library)  -->

npm test
npm test -- watchAll

<!-- for cypress e2e testing -->

### Running Cypress E2E Tests

<!-- step 1. **Open Cypress Test Runner**   -->
   Run the following command in the project root to launch the Cypress Test Runner:
   ```bash
   npx cypress open
   ```

<!-- step 2. Select Testing Type -->
In the Cypress Test Runner window, choose E2E Testing.

<!-- step 3. Select Browser -->
Select the browser you want to run the tests on (e.g., Chrome).

<!-- step 4. Start Testing -->
Click Start E2E Testing in Chrome. The project will open in the selected browser.

<!-- step 5. Run Specific Test File -->
Navigate to the cypress/e2e folder in the Test Runner and select the test file you want to execute. The selected test will run in the chosen browser.

<!--  end cypress e2e testing-->

<!-- Start ESLint, Prettier, and Husky Setup -->

This project uses ESLint for linting, Prettier for code formatting, and Husky for Git hooks to enforce code quality. Here’s how to use them effectively.

<!-- Running ESLint and Prettier Locally -->

You can manually run ESLint and Prettier using the following npm scripts:

<!-- Run ESLint: To check for linting issues across your codebase, run: -->

npm run lint


<!-- Run Prettier: To automatically format your code, run: -->

npm run format

<!--for  Checking formatting... -->

npm run format:check

Automatic Code Quality Checks with Husky

When you add and commit files, Husky will automatically run the pre-commit hook and execute lint-staged. This ensures that only the staged files are formatted and linted before the commit goes through.

How It Works

Husky will trigger the pre-commit hook, which runs lint-staged.

lint-staged will then run ESLint to check for linting errors and Prettier to format the staged files.

Example of Making a Commit

<!-- When you are ready to commit your changes, follow these steps: -->

Stage your changes:

git add .


Commit your changes:

git commit -m "Your commit message"


During the commit process, Husky will automatically run lint-staged, which will format and lint the staged files. If there are any linting errors, the commit will be prevented until those are resolved.

<!-- End ESLint, Prettier, and Husky Setup -->


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

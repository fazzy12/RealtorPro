module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended', // Use recommended rules for React
    'airbnb', // Use Airbnb's JavaScript style guide
    'plugin:@typescript-eslint/recommended', // Use recommended rules for TypeScript
  ],
  parser: '@typescript-eslint/parser', // Use the TypeScript parser for ESLint
  overrides: [
    // Add any specific configuration for overrides if needed
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react', // Enable React-specific linting rules
    '@typescript-eslint', // Enable TypeScript-specific linting rules
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  root: true,
  rules: {
    'no-cycle': 'off', // Disable the rule that disallows cycles in module dependencies
    'react/no-unescaped-entities': 0, // Disable the rule that warns about unescaped entities in JSX
    'eslintreact/no-danger': 0, // Disable the rule that warns about using dangerous JSX properties
    'react/jsx-max-props-per-line': 0, // Disable the rule that enforces a maximum number of props per line in JSX
    'react/jsx-first-prop-new-line': 0, // Disable the rule that requires the first prop in JSX to be on a new line
    'no-console': 0, // Disable the rule that disallows the use of console statements
    'jsx-a11y/label-has-associated-control': 0, // Disable the rule that requires a label to be associated with a control
    'no-nested-ternary': 0, // Disable the rule that disallows nested ternary expressions
    'consistent-return': 0, // Disable the rule that requires a consistent return value
    'no-alert': 0, // Disable the rule that disallows the use of alert, confirm, and prompt
    'react/jsx-no-constructed-context-values': 0, // Disable the rule that disallows constructing context values
    'import/extensions': 0, // Disable the rule that enforces file extensions for imports
    'react/prop-types': 0, // Disable the rule that requires prop types to be defined
    'linebreak-style': 0, // Disable the rule that enforces consistent linebreak styles
    'react/state-in-constructor': 0, // Disable the rule that requires state initialization in the constructor
    'import/prefer-default-export': 0, // Disable the rule that prefers default exports
    'react/react-in-jsx-scope': 'off', // Disable the rule that requires importing React in JSX files
    'react/jsx-props-no-spreading': 'off', // Disable the rule that disallows spreading props in JSX
    'jsx-a11y/no-noninteractive-element-interactions': 'off', // Disable the rule that disallows interactive elements without event handlers
    'react/function-component-definition': [
      // Enable the rule that enforces arrow function syntax for function components
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'max-len': [
      // Enable the rule that enforces a maximum line length
      2, 1050,
    ],
    'no-multiple-empty-lines': [
      // Enable the rule that limits consecutive empty lines
      'error',
      {
        max: 1,
        maxEOF: 1,
      },
    ],
    'no-underscore-dangle': [
      // Enable the rule that allows specific underscore dangle
      'error',
      {
        allow: ['_d', '_dh', '_h', '_id', '_m', '_n', '_t', '_text'],
      },
    ],
    'object-curly-newline': 0, // Disable the rule that enforces a newline after opening curly brace in object literals
    'react/jsx-filename-extension': 0, // Disable the rule that enforces JSX files to have a .jsx extension
    'react/jsx-one-expression-per-line': 0, // Disable the rule that requires each JSX expression to be on a separate line
    'jsx-a11y/click-events-have-key-events': 0, // Disable the rule that requires click events to have corresponding key events
    'jsx-a11y/alt-text': 0, // Disable the rule that requires alt text for images
    'jsx-a11y/no-autofocus': 0, // Disable the rule that disallows autofocus attribute
    'jsx-a11y/no-static-element-interactions': 0, // Disable the rule that disallows static elements to be interactive
    'react/no-array-index-key': 0, // Disable the rule that requires keys for elements in arrays
    'jsx-a11y/anchor-is-valid': [
      // Enable the rule that enforces valid anchors
      'error',
      {
        components: ['Link'],
        specialLink: ['to', 'hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
  },
};

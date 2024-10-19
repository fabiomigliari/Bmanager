import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginImport from 'eslint-plugin-import';

const jsConfig = pluginJs.configs.recommended;
const reactConfig = pluginReact.configs.flat.recommended;

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Add Node.js globals
        Intl: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect', // Automatically picks the version you have installed
      },
    },
    plugins: {
      js: pluginJs,
      react: pluginReact,
      import: pluginImport,
    },
    rules: {
      'react/no-deprecated': 'warn', // Warn on deprecated React methods
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Ignore unused vars starting with "_"
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-absolute-path': 'error',
      'import/order': ['error', { 'groups': [['builtin', 'external', 'internal']] }],
      'import/newline-after-import': ['error', { 'count': 1 }],
    },
  },
  jsConfig,
  reactConfig,
];

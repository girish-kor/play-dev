// @ts-check
const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const prettierConfig = require('eslint-config-prettier');
const globals = require('globals');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  // Base configurations
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooksPlugin.configs.flat.recommended,

  // TypeScript-specific configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node, // For scripts and config files
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // Enforce unused variables to be marked with '_'
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // Additional quality rules
      'react/prop-types': 'off', // TypeScript handles prop validation
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Allow implicit returns
      '@typescript-eslint/no-explicit-any': 'warn', // Warn on 'any' type
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Prettier integration - ensures code style consistency
  prettierConfig,

  // Global ignores
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '*.test.ts',
      '*.test.tsx',
      '*.config.js', // Ignore JS config files if not needed
    ],
  },
];

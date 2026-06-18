import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

import js from '@eslint/js'

export default defineConfig([
  globalIgnores(['node_modules/**', 'dist']),
  {
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      jsxA11y.flatConfigs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    ignores: ['node_modules/**', 'dist', '**/*.d.ts'],
    plugins: { js, react },
    rules: {
      'react/display-name': 'off',
      'jsx-a11y/no-autofocus': 'off',
      // Relax some TypeScript strictness to avoid many build errors
      '@typescript-eslint/no-explicit-any': ['warn'],
      '@typescript-eslint/no-empty-object-type': ['warn'],
      '@typescript-eslint/no-wrapper-object-types': ['warn'],
      // Prefer-const and unused-expression/style rules as warnings
      'prefer-const': ['warn'],
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-expressions': ['warn'],
      'no-constant-binary-expression': 'off',
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
      parser: tseslint.parser,
      globals: { ...globals.browser, ...globals.node },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
])

import pluginJs from '@eslint/js';
import globals from 'globals';
import pluginTseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import pluginReact from 'eslint-plugin-react';
import pluginNext from '@next/eslint-plugin-next';
import pluginEslintPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      pluginJs,
      pluginTseslint,
      pluginReact,
      '@next/next': pluginNext,
      'react-hooks': pluginReactHooks,
    },
    extends: ['pluginJs/recommended', 'pluginTseslint/recommended'],
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
  pluginEslintPrettierRecommended,
]);

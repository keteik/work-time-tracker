export const rules = {
  'prettier/prettier': [
    'error',
    {
      endOfLine: 'auto',
    },
  ],
};

export const root = true;

export const configs = {
  recommended: {
    plugins: ['@next/next', '@typescript-eslint/eslint-plugin'],
    rules: {
      // warnings
      '@next/next/google-font-display': 'warn',
      '@next/next/google-font-preconnect': 'warn',
      // errors
      '@next/next/inline-script-id': 'error',
      '@next/next/no-assign-module-variable': 'error'
    }
  },
  'core-web-vitals': {
    plugins: ['@next/next'],
    extends: ['plugin:@next/next/recommended', 'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'prettier',],
    rules: {
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-sync-scripts': 'error',
    },
  },
};
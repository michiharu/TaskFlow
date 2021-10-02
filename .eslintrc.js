module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb-typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  settings: {
    react: { version: 'detect' },
    'import/resolver': { typescript: { alwaysTryTypes: true } },
  },
  rules: {},
  overrides: [
    {
      // TypeScript 用に設定を上書く
      files: ['*.ts', '*.tsx'],
      rules: {},
    },
    {
      // import を sort するため、AutoFix をかける範囲で設定を上書く
      files: ['src/**/*.{js,jsx,ts,tsx}'],
      rules: {
        'import/order': [
          'error',
          {
            // groups: default value is ["builtin", "external", "parent", "sibling", "index"]
            pathGroups: [
              {
                pattern: 'react',
                group: 'builtin',
              },
              {
                pattern: 'react-dom',
                group: 'builtin',
              },
              {
                pattern: '@mui/material',
                group: 'external',
                position: 'after',
              },
            ],
            pathGroupsExcludedImportTypes: ['react', 'react-dom'],
            'newlines-between': 'always',
          },
        ],
      },
    },
  ],
};

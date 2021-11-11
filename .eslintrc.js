module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb',
    'airbnb-typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  settings: {
    react: { version: 'detect' },
    'import/resolver': { typescript: { alwaysTryTypes: true } },
  },
  rules: {
    'max-len': ['error', { code: 120 }],
    'react/require-default-props': 'off', // defaultProps は使用しない
    'react/jsx-props-no-spreading': 'off', // propsのスプレッド構文の使用OK
    'import/no-extraneous-dependencies': 'off', // package.jsonに列挙されていないpkgからのimportはOK
    'import/prefer-default-export': 'off', // default exportは無くてもOK
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    {
      files: ['*slice.ts'],
      rules: {
        'no-param-reassign': 'off', // immerを使用しているので再代入OK
      },
    },
    {
      files: ['src/**/*.{js,jsx,ts,tsx}'],
      rules: {
        "sort-imports": ["error", { "ignoreDeclarationSort": true }],
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
              {
                pattern: '@mui/icons-material',
                group: 'parent',
                position: 'before',
              },
            ],
            pathGroupsExcludedImportTypes: ['react', 'react-dom'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
            },
          },
        ],
      },
    },
  ],
};

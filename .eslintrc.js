module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    'max-len': ['error', { code: 120 }],
    // # Components
    // componentはarrow関数で
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    // propsのスプレッド構文の使用OK
    'react/jsx-props-no-spreading': 'off',
    // defaultProps は使用しない
    'react/require-default-props': 'off',

    // # Modules
    // package.jsonに列挙されていなくてもimportはOK
    'import/no-extraneous-dependencies': 'off',
    // default exportは無くてもOK
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        'sort-imports': ['error', { ignoreDeclarationSort: true }],
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
    {
      files: ['*slice.ts'],
      rules: {
        'no-param-reassign': 'off', // immerを使用しているので再代入OK
      },
    },
  ],
};

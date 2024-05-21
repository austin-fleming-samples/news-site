/*
RULE SETS
*/
const generalRules = {
  'arrow-body-style': ['error', 'as-needed'],
  'import/no-default-export': 'error',
  'import/no-nodejs-modules': 'error',
  'import/no-useless-path-segments': [
    'error',
    {
      noUselessIndex: true,
    },
  ],
  'import/order': [
    'error',
    {
      alphabetize: {
        caseInsensitive: true,
        order: 'asc',
      },
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'never',
      pathGroups: [
        {
          group: 'external',
          pattern: 'react',
          position: 'before',
        },
      ],
      pathGroupsExcludedImportTypes: ['react'],
    },
  ],
  'import/prefer-default-export': 'off',
  'no-underscore-dangle': 'off',
  'prettier/prettier': 'error',
  'react/function-component-definition': [
    // force arrow functions
    'error',
    {
      namedComponents: 'arrow-function',
    },
  ],
  'react/jsx-no-useless-fragment': 'off',
  'react/jsx-props-no-spreading': 'off',
  'react/jsx-sort-props': [
    'error',
    {
      callbacksLast: true,
      ignoreCase: false,
      noSortAlphabetically: false,
      reservedFirst: true,
      shorthandFirst: true,
    },
  ],
  'react/prop-types': 'off',
  'react/react-in-jsx-scope': 'off',
  'react/require-default-props': 'off',
  'sonarjs/no-nested-template-literals': 'off',
  'sort-keys-fix/sort-keys-fix': ['error', 'asc', { caseSensitive: false, natural: true }],
  'unicorn/filename-case': 'off',
  'unicorn/no-array-callback-reference': 'off',
  'unicorn/no-array-for-each': 'off',
  'unicorn/no-keyword-prefix': [
    'error',
    {
      disallowedPrefixes: ['new', 'for'],
    },
  ],
  // chaos in NextJS
  'unicorn/prevent-abbreviations': 'off',
};

/*
EXTENDS
*/
const generalExtendStart = ['next/core-web-vitals', 'airbnb'];

const generalExtendEnd = [
  'airbnb/hooks',
  'plugin:jsx-a11y/recommended',
  'plugin:unicorn/all',
  'plugin:sonarjs/recommended',
  'plugin:security/recommended',
  'prettier',
  'plugin:prettier/recommended',
];

/*
OVERRIDES
*/
const jsOverrides = {
  extends: [...generalExtendStart, ...generalExtendEnd],
  files: ['**/*.js', '**/*.jsx'],
  plugins: ['jsx-a11y', 'unicorn', 'sort-keys-fix'],
  rules: {
    ...generalRules,
  },
};

const tsOverrides = {
  extends: [
    ...generalExtendStart,
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    'plugin:typescript-sort-keys/recommended',
    ...generalExtendEnd,
  ],
  files: ['**/*.ts', '**/*.tsx'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'jsx-a11y', 'unicorn', 'sort-keys-fix'],
  rules: {
    ...generalRules,
  },
};

const reactOverrides = {
  files: ['**/*.tsx', '**/*.jsx'],
  rules: {
    'unicorn/no-null': 'off',
  },
};

const jsonOverrides = {
  extends: ['plugin:jsonc/base'],
  files: ['**/*.json'],
};

const markdownOverrides = {
  files: ['**/*.md'],
  processor: 'markdown/markdown',
  rules: {
    'no-undef': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
  },
};

const pagesOverrides = {
  files: ['**/pages/**'],
  rules: {
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'error',
  },
};

const configFileOverrides = {
  files: ['./*.js', './*.config.js'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'unicorn/prefer-module': 'off',
  },
};

/*
CONFIG
*/
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  ignorePatterns: ['*/types/codegen*'],
  overrides: [
    jsOverrides,
    tsOverrides,
    reactOverrides,
    jsonOverrides,
    markdownOverrides,
    configFileOverrides,
    pagesOverrides,
  ],
  plugins: ['markdown', 'no-secrets', 'prettier'],
  root: true,
};

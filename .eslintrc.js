const restrictedGlobals = require('confusing-browser-globals')
const level = process.env['NODE_ENV'] === 'production' ? 'error' : 'warn'

/** @typedef { import('eslint').Linter.BaseConfig } eslintConfig */
const eslintConfig = {
  /**
   * Common sets of recommended rules included for all linted files
   */
  extends: [
    'eslint:recommended',
    /** For ESLint directive comments e.g. //eslint-disable-line */
    'plugin:eslint-comments/recommended',
    /** Linting of ES2015+/ES6+ import/export syntax, verify file paths and import names */
    'plugin:import/recommended',
    /** Recommended warnings for JSDoc linter */
    'plugin:jsdoc/recommended',
    /** ESLint's rules for Node.js */
    'plugin:node/recommended',
    /** Helps identify potential security hotspots but suffers a lot of false positives */
    'plugin:security/recommended',
    /** Runs Prettier as ESLint rule and reports differences as ESLint issues */
    'prettier', // must be last
  ],
  /**
   * Plugins used in common for all linted files
   */
  plugins: ['babel-eslint', 'import', 'jsdoc', 'no-null', 'security'],
  /** No globals are enabled for ESLint by default: 'writable', 'readonly', or 'off'. */
  globals: {
    NodeJS: 'readonly',
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  /**
   * The 'project' and 'tsconfigRootDir' key/values could be moved into overrides,
   * so that a separate tsconfig.eslint.json file isn't necessary. The issue is
   * that eslint will exit on an error that the '.eslintrc.js' file isn't included
   * in projects, and so either '.eslintrc.js' has to be excluded or explicitly included.
   */
  parserOptions: {
    ecmaVersion: 2020,
    requireConfigFile: false,
    resolvePluginsRelativeTo: __dirname,
    sourceType: 'module',
  },
  /**
   * Common rule settings for all linted files
   */
  rules: {
    /** Issue with Prettier https://github.com/prettier/eslint-plugin-prettier/issues/65: */
    'arrow-body-style': 'off',
    camelcase: [level],
    curly: [level, 'all'],
    /** enable eslint-comments plugin */
    'eslint-comments/no-unused-disable': level,
    'import/no-unresolved': level,
    'import/no-webpack-loader-syntax': level,
    /** Recommending VS Code extension amatiasq.sort-imports */
    'import/order': 'off',
    /**
     * JSDoc Rules
     */
    'jsdoc/check-examples': 'off', // not supported yet in ESLint v8
    'jsdoc/check-indentation': level,
    'jsdoc/check-line-alignment': level,
    'jsdoc/check-syntax': level,
    'jsdoc/check-tag-names': [
      level,
      {
        definedTags: ['NOTE:', 'TODO:'],
      },
    ],
    /** Applies a regex to description so that it's text-only starting with a capital */
    'jsdoc/match-description': 'off',
    'jsdoc/no-bad-blocks': level,
    'jsdoc/no-defaults': level,
    'jsdoc/no-types': 'off',
    'jsdoc/require-param': 'off',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-returns-type': 'off',
    /** JSDoc does not support import() for typedefs */
    'jsdoc/valid-types': 'off',
    'new-cap': [level, { newIsCap: true, capIsNew: false }],
    /** Doesn't seem to work with Yarn PnP, it resolves packages on disk to check import */
    'node/no-extraneous-import': 'off',
    'node/no-unpublished-import': [
      level,
      {
        allowModules: ['electron'],
      },
    ],
    /** Set to off because this package is not published as a library */
    'node/no-unpublished-require': 'off',
    'no-new': level,
    /** Plugin that disallows null literals to encourage using undefined instead: */
    'no-null/no-null': level,
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
    'no-unused-expressions': [level, { allowShortCircuit: true, allowTernary: true }],
    'no-unused-vars': [level, { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    'no-useless-escape': 'off',
    /** Issue with Prettier https://github.com/prettier/eslint-plugin-prettier/issues/65: */
    'prefer-arrow-callback': 'off',
    'prefer-object-spread': level,
    'prefer-spread': level,
    /** Getting false positives on HTMLElement.classList.add/.remove methods */
    'security/detect-non-literal-fs-filename': 'off',
    'security/detect-object-injection': 'off',
    'security/detect-unsafe-regex': 'off',
  },

  /**
   * Over-rides based on glob patterns for the common configuration above.
   * The last override block has highest precedence. All config options are
   * valid except `root` and `ignorePatterns`.
   */
  overrides: [
    /**
     * Settings for Javascript Jest files only
     */
    {
      files: ['**/*.spec.js', '**/__tests__/**/*.js', '**/__mocks__/**/*.js', '**/__fixtures__/**/*.js'],
      extends: [
        /** DOM testing library */
        'plugin:testing-library/dom',
        /** Best practices and anticipate common mistakes when writing tests with jest-dom */
        'plugin:jest-dom/recommended',
      ],
      plugins: ['testing-library', 'jest', 'jest-dom', 'jsdoc'],
      rules: {
        'jest/no-disabled-tests': 'off',
        'jest/no-focused-tests': level,
        'jest/no-identical-title': level,
        'jest/prefer-to-have-length': level,
        'jest/valid-expect': level,
        'jsdoc/check-examples': 'off', // not supported yet in ESLint v8
        'jsdoc/check-indentation': level,
        'jsdoc/check-line-alignment': level,
        'jsdoc/check-syntax': level,
        /** Applies a regex to description so that it's text-only starting with a capital */
        'jsdoc/match-description': 'off',
        'jsdoc/no-bad-blocks': level,
        'jsdoc/no-defaults': level,
        'jsdoc/no-types': 'off',
        /** JSDoc does not support import() for typedefs */
        'jsdoc/valid-types': 'off',
        'testing-library/prefer-screen-queries': 'off',
      },
      env: {
        browser: true,
        commonjs: true,
        es6: true,
        jest: true,
        'jest/globals': true,
        node: true,
      },
    },
    /**
     * Settings for configuration files only
     */
    {
      files: ['.eslintrc.js', '*.config.*', 'jest.setup.*', 'gulpfile.ts'],
      env: {
        commonjs: true,
        jest: true,
        node: true,
      },
    },
  ],
}

module.exports = eslintConfig

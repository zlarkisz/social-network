module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "complexity": ["error", { "max": 10 }],
    "max-lines-per-function": ["error", { "max": 100 }],
    "@typescript-eslint/member-ordering": [
      "error",
      {
        "default": [
          // Fields
          "public-static-field",
          "protected-static-field",
          "private-static-field",
          "public-instance-field",
          "protected-instance-field",
          "private-instance-field",

          // Constructors
          "public-constructor",
          "protected-constructor",
          "private-constructor",

          // Methods
          "public-static-method",
          "protected-static-method",
          "private-static-method",
          "public-instance-method",
          "protected-instance-method",
          "private-instance-method"
        ]
      }
    ],
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",     // Node.js built-in modules
          "external",    // npm packages (e.g., lodash, react)
          "internal",    // Custom internal imports (e.g., '@/**')
          ["parent", "sibling", "index"] // Parent, sibling, index imports
        ],
        "pathGroups": [
          {
            "pattern": "@nestjs/**",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "@/**",
            "group": "internal",
            "position": "after"
          }
        ],
        "pathGroupsExcludedImportTypes": ["builtin"],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
  },
};
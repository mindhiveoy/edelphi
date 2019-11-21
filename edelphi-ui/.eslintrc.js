module.exports = {
  env: {
    browser: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "@typescript-eslint/tslint"],
  rules: {
    "@typescript-eslint/adjacent-overload-signatures": "warn",
    "@typescript-eslint/array-type": "warn",
    "@typescript-eslint/ban-types": "warn",
    "@typescript-eslint/class-name-casing": "warn",
    "@typescript-eslint/consistent-type-assertions": "warn",
    "@typescript-eslint/consistent-type-definitions": "warn",
    "@typescript-eslint/explicit-member-accessibility": [
      "warn",
      {
        accessibility: "explicit"
      }
    ],
    "@typescript-eslint/indent": [
      "warn",
      4,
      {
        FunctionDeclaration: {
          parameters: "first"
        },
        FunctionExpression: {
          parameters: "first"
        }
      }
    ],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/member-delimiter-style": [
      "warn",
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true
        },
        singleline: {
          delimiter: "semi",
          requireLast: false
        }
      }
    ],
    "@typescript-eslint/member-ordering": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-misused-new": "warn",
    "@typescript-eslint/no-namespace": "warn",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-use-before-declare": "off",
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-function-type": "warn",
    "@typescript-eslint/prefer-namespace-keyword": "warn",
    "@typescript-eslint/quotes": [
      "warn",
      "double",
      {
        avoidEscape: true
      }
    ],
    "@typescript-eslint/semi": ["warn", "always"],
    "@typescript-eslint/triple-slash-reference": "warn",
    "@typescript-eslint/type-annotation-spacing": "warn",
    "@typescript-eslint/unified-signatures": "warn",
    "arrow-body-style": "warn",
    "arrow-parens": ["off", "as-needed"],
    camelcase: "warn",
    "capitalized-comments": "warn",
    "comma-dangle": "warn",
    complexity: "off",
    "constructor-super": "warn",
    curly: "warn",
    "dot-notation": "warn",
    "eol-last": "off",
    eqeqeq: ["warn", "smart"],
    "guard-for-in": "warn",
    "id-blacklist": [
      "warn",
      "any",
      "Number",
      "number",
      "String",
      "string",
      "Boolean",
      "boolean",
      "Undefined",
      "undefined"
    ],
    "id-match": "warn",
    "import/order": "off",
    "max-classes-per-file": ["warn", 1],
    "max-len": [
      "warn",
      {
        code: 160
      }
    ],
    "new-parens": "warn",
    "no-bitwise": "warn",
    "no-caller": "warn",
    "no-cond-assign": "warn",
    "no-console": "warn",
    "no-debugger": "warn",
    "no-empty": "warn",
    "no-eval": "warn",
    "no-fallthrough": "off",
    "no-invalid-this": "off",
    "no-multiple-empty-lines": "warn",
    "no-new-wrappers": "warn",
    "no-shadow": [
      "warn",
      {
        hoist: "all"
      }
    ],
    "no-throw-literal": "warn",
    "no-trailing-spaces": "warn",
    "no-undef-init": "warn",
    "no-underscore-dangle": "warn",
    "no-unsafe-finally": "warn",
    "no-unused-expressions": "warn",
    "no-unused-labels": "warn",
    "no-var": "warn",
    "object-shorthand": "warn",
    "one-var": ["warn", "never"],
    "prefer-arrow/prefer-arrow-functions": "warn",
    "prefer-const": "warn",
    "quote-props": ["warn", "consistent-as-needed"],
    radix: "warn",
    "space-before-function-paren": [
      "warn",
      {
        anonymous: "never",
        asyncArrow: "always",
        constructor: "never",
        method: "never",
        named: "never"
      }
    ],
    "spaced-comment": "warn",
    "use-isnan": "warn",
    "valid-typeof": "off",
    "@typescript-eslint/tslint/config": [
      "error",
      {
        rules: {
          "import-sources-order": true,
          "import-spacing": true,
          "jsdoc-format": true,
          "no-reference-import": true,
          "no-unused-vars": true,
          "one-line": [
            true,
            "check-catch",
            "check-else",
            "check-finally",
            "check-open-brace",
            "check-whitespace"
          ],
          whitespace: [
            true,
            "check-branch",
            "check-decl",
            "check-operator",
            "check-separator",
            "check-type",
            "check-typecast"
          ]
        }
      }
    ]
  },
  overrides: [
    {
      files: ["src/generated/**"],
      rules: {
        "@typescript-eslint/no-unused-vars": false
      }
    }
  ]
};

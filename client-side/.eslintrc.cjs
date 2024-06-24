const { eslint } = require('@evgen4ikk/eslint')

module.exports = {
  ...eslint.react,
  extends: [
    ...eslint.react.extends,
    'next',
    'next/core-web-vitals',
    'eslint:recommended'
  ],
  overrides: [
    ...eslint.react.overrides,
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        tsconfigRootDir: __dirname
      },
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        'no-restricted-syntax': 'off',
        'promise/always-return': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react/no-array-index-key': 'off',
        'react/function-component-definition': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off'
      }
    }
  ]
}

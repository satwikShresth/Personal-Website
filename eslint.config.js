// @ts-check
import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    files: ['./src/**/*.mdx'],
    parser: 'eslint-mdx',
    settings: {
      'mdx/code-blocks': true,
      'mdx/language-mapper': {},
    },
    rules: {
      'react/jsx-no-undef': 'off',
      'no-unused-expressions': 'off',
      'react/display-name': 'off',
      'import/no-anonymous-default-export': 'off',
    },
  },
]

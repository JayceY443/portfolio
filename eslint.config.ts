import love from 'eslint-config-love'
import prettierPlugin from 'eslint-plugin-prettier'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import prettierConfig from './prettier.config'

export default [
  {
    ...love,
    files: ['src/**/*.ts(x)'],
    ignores: ['**/types/**'],
    rules: {
      ...love.rules,
      'prettier/prettier': ['error', prettierConfig],
      '@typescript-eslint/no-magic-numbers': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { args: 'after-used', argsIgnorePattern: '^_' }
      ]
    },
    plugins: {
      ...love.plugins,
      'unused-imports': unusedImportsPlugin,
      prettier: prettierPlugin,
    }
  },
  {
    files: ['src/components/ui/**/*.ts(x)', 'src/hooks/**/*.ts(x)'],
    rules: {
      ...love.rules,
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off'
    },
  },
];
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  globalIgnores([
    'build/**',
    'dist/**',
    'out/**',
  ]),
])

export default eslintConfig

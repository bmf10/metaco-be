const tsconfig = require('./tsconfig.json')
const tsconfigPaths = require('tsconfig-paths')

tsconfigPaths.register({
  baseUrl: './build',
  paths: tsconfig.compilerOptions.paths,
})

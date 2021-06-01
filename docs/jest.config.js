const { resolve } = require('path')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  rootDir: resolve(__dirname),
  testEnvironment: "node",
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      tsconfig: {
        ...compilerOptions,
        sourceMap: true,
      },
    },
    __VERSION__: "",
    __DEV__: false,
    __SSR__: false,
  },
  snapshotSerializers: [require.resolve("jest-serializer-vue")],
  coverageDirectory: "coverage",
};
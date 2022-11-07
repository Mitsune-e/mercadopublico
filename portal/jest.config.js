const { compilerOptions } = require("./tsconfig.paths.json");
const { pathsToModuleNameMapper } = require("ts-jest/utils");

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/client"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>" }),
  modulePathIgnorePatterns: ["<rootDir>/client"],
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 200000,
};

// jest.config.cjs
module.exports = {
  preset: "ts-jest/presets/js-with-ts-esm", // Use ESM preset for TypeScript
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test-utils.tsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { useESM: true }],
  },
  testMatch: ["<rootDir>/src/__tests__/**/*.[jt]s?(x)"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
};

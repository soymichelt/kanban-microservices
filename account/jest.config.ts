/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    'tests/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\', '\\\\cypress\\\\'],
  coverageProvider: 'v8',
  maxWorkers: '50%',
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    // Read more on: https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping
    '@di/(.*)$': ['<rootDir>/src/di/$1'],
    '@services/(.*)$': ['<rootDir>/src/services/$1'],
    '@shared/(.*)$': ['<rootDir>/src/shared/$1'],
    '@tests/(.*)$': ['<rootDir>/tests/$1'],
  },
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
  preset: 'ts-jest',
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.+(ts)', '**/?(*.)+(spec|test).+(ts)'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\', '\\\\cypress\\\\'],
  transform: {
    '^.+\\.(ts)$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
        isolatedModules: true,
      },
    ],
  },
  transformIgnorePatterns: ['\\\\node_modules\\\\', '\\\\cypress\\\\', '\\.pnp\\.[^\\\\]+$'],
}

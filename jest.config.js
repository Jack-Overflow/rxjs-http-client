module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: "<rootDir>/tsconfig.spec.json"
      },
    ],
  }
};

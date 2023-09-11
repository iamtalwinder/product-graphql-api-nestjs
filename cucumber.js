const args = [
  '--format progress',
  '--parallel 1',
  '--require-module ts-node/register/transpile-only',
  '--require-module tsconfig-paths/register',
  '--require features/setup/**/*.ts',
  '--exit',
];

module.exports = {
  default: args.join(' '),
};

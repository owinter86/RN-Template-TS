module.exports = {
  root: true,
  extends: '@lightbase/eslint-config-lightbase/rn',
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['src', './src'],
          ['assets', './src/assets'],
          ['components', './src/components'],
          ['context', './src/context'],
          ['hooks', './src/hooks'],
          ['navigation', './src/navigation'],
          ['screens', './src/screens'],
          ['services', './src/services'],
          ['utils', './src/utils*'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json', '.tsx', '.native.js'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.native.js'],
      },
    },
  },
};

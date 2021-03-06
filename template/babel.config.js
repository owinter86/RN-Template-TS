module.exports = function (api) {
  api.cache(true);
  if (process.env.NODE_ENV === 'production' || process.env.BABEL_ENV === 'production') {
    return {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: [
        ['transform-remove-console', { exclude: ['error', 'info'] }],
        'react-native-reanimated/plugin',
      ],
    };
  } else {
    return {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: ['react-native-reanimated/plugin'],
    };
  }
};

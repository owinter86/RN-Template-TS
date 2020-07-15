module.exports = {
  preset: '@testing-library/react-native',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./__mocks__/setup.js', './node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-markdown-display|@ptomasroos/react-native-multi-slider|reactotron-react-native|react-native-flipper|react-native-reanimated|react-native-redash|react-native-screens/native-stack|@react-navigation|@react-native-community|react-native-safari-view|react-native-code-push|react-native-iphone-x-helper|react-native-keyboard-aware-scroll-view|react-native-gesture-handler|@sentry/react-native)/)',
  ],
};

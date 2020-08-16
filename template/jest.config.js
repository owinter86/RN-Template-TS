module.exports = {
  preset: 'react-native',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: ['./jest.mocks.js', './node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|rn-async-storage-flipper|react-native-markdown-display|@ptomasroos/react-native-multi-slider|reactotron-react-native|react-native-flipper|react-native-reanimated|react-native-redash|react-native-screens/native-stack|@react-navigation|@react-native-community|react-native-safari-view|react-native-code-push|react-native-iphone-x-helper|react-native-keyboard-aware-scroll-view|react-native-gesture-handler|@sentry/react-native)/)',
  ],
};

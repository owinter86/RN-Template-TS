jest.useFakeTimers();

jest.mock('react-native-reanimated', () => {
  const animatedMock = require('react-native-reanimated/mock');
  animatedMock.default.addWhitelistedNativeProps = jest.fn();
  return animatedMock;
});

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
}));

jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
  screensEnabled: () => true,
}));

jest.mock('react-native-maps', () => 'AirGoogleMaps');

jest.mock('react-native-modal', () => 'Modal');

jest.mock('@react-native-community/netinfo', () => {
  const netInfoMock = require('@react-native-community/netinfo/jest/netinfo-mock.js');
  return netInfoMock;
});

jest.mock('react-native-linear-gradient', () => 'BVLinearGradient');

jest.mock('react-native-device-info', () => {
  return {
    getModel: jest.fn(),
    getVersion: jest.fn(),
  };
});

jest.mock('react-native-config', () => ({
  API_ENDPOINT: 'https://api.tst.amstel-services.net',
}));

jest.mock('react-native-keychain', () => ({
  SECURITY_LEVEL_ANY: 'MOCK_SECURITY_LEVEL_ANY',
  SECURITY_LEVEL_SECURE_SOFTWARE: 'MOCK_SECURITY_LEVEL_SECURE_SOFTWARE',
  SECURITY_LEVEL_SECURE_HARDWARE: 'MOCK_SECURITY_LEVEL_SECURE_HARDWARE',
  setGenericPassword: jest.fn().mockResolvedValue(),
  getGenericPassword: jest.fn().mockResolvedValue(),
  resetGenericPassword: jest.fn().mockResolvedValue(),
}));

jest.mock('@react-native-community/async-storage', () => {
  const mockAsyncStorage = require('@react-native-community/async-storage/jest/async-storage-mock');
  return mockAsyncStorage;
});

jest.mock('react-native-code-push', () => {
  const codePush = {
    InstallMode: { ON_NEXT_RESTART: 'ON_APP_RESTART' },
    CheckFrequency: { ON_APP_RESUME: 'ON_APP_RESUME' },
  };
  const cb = (_) => (app) => app;
  Object.assign(cb, codePush);
  return cb;
});

jest.mock('react-native-background-timer', () => ({
  setTimeout: jest.fn(),
  clearTimeout: jest.fn(),
}));

jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn(),
}));

jest.mock('expo-calendar', () => ({
  createEventAsync: jest.fn(),
  openEventInCalendar: jest.fn(),
}));

jest.mock('react-native-notifications', () => 'Notifications');
jest.mock('react-native-snap-carousel', () => 'Caro');
jest.mock('react-native-store-review', () => 'StoreReview');

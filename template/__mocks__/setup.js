global.navigator = { geolocation: { getCurrentPosition: jest.fn() } };
global.console.warn = jest.fn();

jest.mock('react-native-gesture-handler', () => {
  const { View, TouchableWithoutFeedback } = require('react-native');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    TouchableWithoutFeedback,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

jest.mock('react-native-device-info', () => {
  return {
    getVersion: () => '',
    getUniqueId: () => '',
  };
});

jest.mock('@react-native-community/async-storage', () => {
  const mockAsyncStorage = require('@react-native-community/async-storage/jest/async-storage-mock');
  return mockAsyncStorage;
});

jest.mock('react-native-reanimated', () => {
  const animatedMock = require('react-native-reanimated/mock');
  return animatedMock;
});

jest.mock('react-native-config', () => ({
  API_ENDPOINT: 'string',
}));

jest.mock('react-native-code-push', () => {
  const cp = () => (app) => app;
  Object.assign(cp, {
    InstallMode: {},
    CheckFrequency: {},
    SyncStatus: {},
    UpdateState: {},
    DeploymentStatus: {},
    DEFAULT_UPDATE_DIALOG: {},

    allowRestart: jest.fn(),
    checkForUpdate: jest.fn(() => Promise.resolve(null)),
    disallowRestart: jest.fn(),
    getCurrentPackage: jest.fn(() => Promise.resolve(null)),
    getUpdateMetadata: jest.fn(() => Promise.resolve(null)),
    notifyAppReady: jest.fn(() => Promise.resolve()),
    restartApp: jest.fn(),
    sync: jest.fn(() => Promise.resolve(1)),
    clearUpdates: jest.fn(),
  });
  return cp;
});

jest.mock('@react-native-community/netinfo', () => {
  const netInfoMock = require('@react-native-community/netinfo/jest/netinfo-mock.js');
  return netInfoMock;
});

jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
  show: jest.fn(),
}));

jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
  screensEnabled: () => true,
}));

jest.mock('bugsnag-react-native', () => ({
  Configuration: jest.fn(),
  Client: jest.fn(() => ({ leaveBreadcrumb: jest.fn() })),
}));

jest.mock('reactotron-react-native', () => {
  const reactotron = {
    configure: jest.fn(() => reactotron),
    useReactNative: jest.fn(() => reactotron),
    use: jest.fn(() => reactotron),
    connect: jest.fn(() => reactotron),
    clear: jest.fn(() => reactotron),
    createEnhancer: jest.fn(() => reactotron),
    setAsyncStorageHandler: jest.fn(() => reactotron),
  };
  return reactotron;
});

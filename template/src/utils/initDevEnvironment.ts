import { setConsole, queryCache } from 'react-query';
import { hijackEffects } from 'stop-runaway-react-effects';
const oldConsoleLog = console.log;
import Reactotron from 'reactotron-react-native';

export default function initDevEnvironment() {
  if (__DEV__) {
    const ReactotronFlipper = require('reactotron-react-native/dist/flipper');
    const AsyncStorage = require('@react-native-community/async-storage').default;
    const RNAsyncStorageFlipper = require('rn-async-storage-flipper').default;
    const devTool = require('react-query-native-devtools');

    RNAsyncStorageFlipper(AsyncStorage);
    devTool.addPlugin(queryCache);

    Reactotron.configure({
      name: 'React Native App',
      createSocket: (path) => new ReactotronFlipper(path),
    })
      .setAsyncStorageHandler?.(AsyncStorage)
      .useReactNative()
      .connect?.()
      .clear?.();

    hijackEffects();

    console.log = (...args: any) => {
      oldConsoleLog(...args);
      Reactotron?.log?.(...args);
    };
  } else {
    setConsole({
      log: () => {},
      warn: () => {},
      error: () => {},
    });
  }
}

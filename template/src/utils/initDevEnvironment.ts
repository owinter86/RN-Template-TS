import { setConsole } from 'react-query';
import { hijackEffects } from 'stop-runaway-react-effects';
const oldConsoleLog = console.log;

export default function initDevEnvironment() {
  if (__DEV__) {
    hijackEffects();
    const ReactotronFlipper = require('reactotron-react-native/dist/flipper');
    const Reactotron = require('reactotron-react-native').default;
    const AsyncStorage = require('@react-native-community/async-storage').default;

    console.log = (...args) => {
      oldConsoleLog(...args);
      Reactotron.log(...args);
    };

    Reactotron.setAsyncStorageHandler(AsyncStorage);
    Reactotron.configure({
      name: 'Etos+',
      createSocket: (path) => new ReactotronFlipper(path),
    }); // controls connection & communication settings

    Reactotron.useReactNative(); // add all built-in react native plugins
    Reactotron.connect(); // let's connect!
    Reactotron.clear(); // let's connect!
    // const snoopy = require('./app/utils/snoopy');
    // snoopy.ReanimatedModule();
    // snoopy.logCteateViews();
    // snoopy.logUpdateViews();
  } else {
    setConsole({
      log: () => {},
      warn: () => {},
      error: () => {},
    });
  }
}

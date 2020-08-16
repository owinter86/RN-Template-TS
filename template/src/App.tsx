import React from 'react';
import { View, Text, StatusBar, Platform, AppState, AppStateStatus } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ReactQueryConfigProvider } from 'react-query';
import { enableScreens } from 'react-native-screens';
import RNBootSplash from 'react-native-bootsplash';
import codepush from 'react-native-code-push';

import initDevEnvironment from './utils/initDevEnvironment';
import { globalReactQueryConfig } from './api';
import { ThemeProvider } from './hooks/useCustomTheme';
import Animated from 'react-native-reanimated';

enableScreens();
initDevEnvironment();
const B = Animated.createAnimatedComponent(View);
const App = () => {
  React.useEffect(() => {
    // THis fixes bug with android that resets to the default status bar after backgrounding the app
    const handleAppStateChange = (state: AppStateStatus) => {
      if (state === 'active') {
        if (Platform.OS === 'android') {
          StatusBar.setTranslucent(true);
          StatusBar.setBackgroundColor('transparent');
        }
      }
    };
    AppState.addEventListener('change', handleAppStateChange);
    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, []);

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    RNBootSplash.hide({ duration: 250 });
    StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <ReactQueryConfigProvider config={globalReactQueryConfig}>
      <SafeAreaProvider>
        <ThemeProvider>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>WELCOME</Text>
          </View>
        </ThemeProvider>
      </SafeAreaProvider>
    </ReactQueryConfigProvider>
  );
};

const codepushonfig = {
  checkFrequency: codepush.CheckFrequency.MANUAL,
};

export default codepush(codepushonfig)(App);

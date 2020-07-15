import React from 'react';
import { View, Text, AppState, AppStateStatus, StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ReactQueryConfigProvider } from 'react-query';
import { enableScreens } from 'react-native-screens';
import RNBootSplash from 'react-native-bootsplash';
import codepush from 'react-native-code-push';
import Config from 'react-native-config';

import initDevEnvironment from './utils/initDevEnvironment';
import { globalReactQueryConfig } from './api';
import bugsnag from './services/bugsnag';
import { ThemeProvider } from './hooks/useCustomTheme';

enableScreens();
initDevEnvironment();

const App = () => {
  const checkCodepush = React.useCallback(async () => {
    const update = await codepush.checkForUpdate();
    if (update?.isMandatory) {
      await codepush.sync({ installMode: codepush.InstallMode.IMMEDIATE });
      RNBootSplash.show({ duration: 250 });
    }
  }, []);

  React.useEffect(() => {
    const handleAppStateChange = (state: AppStateStatus) => {
      if (state === 'active') {
        checkCodepush();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);
    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, [checkCodepush]);

  React.useEffect(() => {
    RNBootSplash.hide({ duration: 250 });
    console.log({ Config });
  }, []);

  React.useEffect(() => {
    codepush.getUpdateMetadata().then((update) => {
      if (update) {
        bugsnag.config.codeBundleId = `codepush:${update.label}`;
      }
    });
  }, []);

  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
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

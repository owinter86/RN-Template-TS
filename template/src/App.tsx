import React from 'react';
import { View, Text, AppState, AppStateStatus } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ReactQueryConfigProvider } from 'react-query';
import { enableScreens } from 'react-native-screens';
import RNBootSplash from 'react-native-bootsplash';
import codepush from 'react-native-code-push';
import initDevEnvironment from './utils/initDevEnvironment';
import { queryConfig } from './hooks/useQueries';

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
  }, []);

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <SafeAreaProvider>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>WELCOME</Text>
        </View>
      </SafeAreaProvider>
    </ReactQueryConfigProvider>
  );
};

const codepushonfig = {
  checkFrequency: codepush.CheckFrequency.MANUAL,
};

export default codepush(codepushonfig)(App);

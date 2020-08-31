import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ReactQueryConfigProvider } from 'react-query';
import { enableScreens } from 'react-native-screens';
import codepush from 'react-native-code-push';

import { globalReactQueryConfig, useSetupFocusHandling } from 'utils/api';
import { ThemeProvider } from 'hooks/useCustomTheme';
// import useCodepushCheck from 'hooks/useCodepush';
import Home from 'screens/Home';
import RNBootSplash from 'react-native-bootsplash';
import initDevEnvironment from 'utils/initDevEnvironment';

enableScreens();
initDevEnvironment();

const App = () => {
  // const [setupCodepush] = useCodepushCheck();
  const setupQueryRefetch = useSetupFocusHandling();

  React.useEffect(() => {
    RNBootSplash.hide({ duration: 250 });
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
  }, []);

  React.useEffect(() => {
    setupQueryRefetch();
  }, [setupQueryRefetch]);

  return (
    <ReactQueryConfigProvider config={globalReactQueryConfig}>
      <SafeAreaProvider>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </SafeAreaProvider>
    </ReactQueryConfigProvider>
  );
};

const codepushonfig = {
  checkFrequency: codepush.CheckFrequency.MANUAL,
};

export default codepush(codepushonfig)(App);

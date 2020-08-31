import React from 'react';
import { AppState, AppStateStatus } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import codepush from 'react-native-code-push';
import bugsnag from 'src/services/bugsnag';

export default function useCodepushCheck() {
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
    codepush.getUpdateMetadata().then((update) => {
      if (update) {
        bugsnag.config.codeBundleId = `codepush:${update.label}`;
      }
    });
  }, []);

  return [checkCodepush];
}

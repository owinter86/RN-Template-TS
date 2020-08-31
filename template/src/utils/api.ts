import React from 'react';
import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';

import { setFocusHandler, ReactQueryConfig } from 'react-query';
import bugsnag from 'services/bugsnag';

import { AppState, AppStateStatus } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

export function useSetupFocusHandling() {
  const netInfo = useNetInfo();
  const setupQueryRefetch = React.useCallback(() => {
    setFocusHandler((handleFocus) => {
      // this doesnt not reconnect on simulator, test on device
      if (netInfo.isConnected) {
        console.log('ONLINE');
        handleFocus();
      }
      const handleAppStateChange = (appState: AppStateStatus) => {
        if (appState === 'active') {
          console.log('ACTIVE');
          handleFocus();
        }
      };

      AppState.addEventListener('change', handleAppStateChange);
      return () => {
        AppState.removeEventListener('change', handleAppStateChange);
      };
    });
  }, [netInfo.isConnected]);

  return setupQueryRefetch;
}

export const errorReporting = (error: AxiosError) => {
  // only send 4XX status code errors to bugsnag
  if (error?.response && error?.response?.status > 399 && error?.response?.status < 400) {
    bugsnag.notify(error, (report) => {
      const errorData = error.response?.data;
      report.errorClass = `[${error.response?.status} ${error.response?.config.method}] - ${error.response?.config.url}`;
      if (typeof errorData === 'string') {
        report.errorMessage = errorData;
        report.groupingHash = errorData;
      } else {
        report.errorMessage = JSON.stringify(errorData);
        report.groupingHash = JSON.stringify(errorData);
      }
      report.metadata = {
        api: {
          type: 'error',
          data: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        },
      };
    });
  }
};

export const globalReactQueryConfig = {
  queries: {
    onError: errorReporting,
    // cacheTime: 60000,
    // staleTime: 10000,
    retry: (failureCount, error: AxiosError) => {
      if (error?.response?.status) {
        if (error?.response?.status > 399 && error?.response?.status < 400) {
          return false;
        }
      }
      if (failureCount > 3) {
        return false;
      }
      return true;
    },
  },
  mutations: {
    onError: errorReporting,
    throwOnError: true,
  },
} as ReactQueryConfig;

export const api = axios.create({
  baseURL: Config.API_URL,
});

export const authApi = axios.create({
  baseURL: Config.AUTH_URL,
});

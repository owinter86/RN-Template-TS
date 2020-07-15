import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';

import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import { ReactQueryProviderConfig, BaseQueryOptions } from 'react-query';
import bugsnag from './services/bugsnag';

const errorReporting = (error: AxiosError) => {
  if (error.response) {
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
        type: 'error',
        data: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      };
    });
  } else if (error.request) {
    bugsnag.notify(error, (report) => {
      report.errorClass = 'API No Response';
      report.metadata = {
        type: 'error',
        request: error.request,
      };
    });
  }
};

export const globalReactQueryConfig = {
  queries: {
    cacheTime: 60000,
    onError: errorReporting,
  } as BaseQueryOptions<AxiosError>,
  mutations: {
    onError: errorReporting,
    throwOnError: true,
  },
} as ReactQueryProviderConfig<AxiosError>;

export const api = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'x-app-version': DeviceInfo.getVersion(),
    'x-app-platform': Platform.OS,
  },
});

export default api;

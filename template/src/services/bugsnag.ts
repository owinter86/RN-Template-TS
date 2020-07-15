import { Client, Configuration } from 'bugsnag-react-native';
import Config from 'react-native-config';

const configuration = new Configuration();
configuration.apiKey = Config.BUGSNAG_API;
configuration.codeBundleId = Config.BUILD_NUMBER;
configuration.notifyReleaseStages = ['production', 'testflight'];

const bugsnag = new Client(configuration);

export default bugsnag;

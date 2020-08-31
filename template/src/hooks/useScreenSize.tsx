import { Dimensions, Platform } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

export default function useScreenSize() {
  const { height, width } = Dimensions.get('window');
  const insets = useSafeArea();
  const cannotShowiosModal =
    Platform.OS === 'ios' &&
    typeof Platform.Version === 'string' &&
    Number(Platform.Version.split('.')[0]) < 13;
  return {
    height,
    width,
    insets,
    cannotShowiosModal,
  };
}

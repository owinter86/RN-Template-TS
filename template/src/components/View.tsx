import React, { PropsWithChildren } from 'react';
import { ViewProps, View } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useCustomTheme } from 'hooks/useCustomTheme';
import useScreenSize from 'hooks/useScreenSize';

type Props = PropsWithChildren<ViewProps>;

export default {
  Base,
  Row,
  Screen,
  Spacer,
  LineSpacer,
};

function Base({ style, ...props }: Props) {
  return <View style={style} {...props} />;
}

function Spacer({ height }: { height: number }) {
  return <View style={{ height }} />;
}

function LineSpacer({ height }: { height: number }) {
  const theme = useCustomTheme();
  return (
    <View
      style={[
        { height: 1, backgroundColor: theme.borderColorFaded, width: '100%', marginVertical: height / 2 },
      ]}
    />
  );
}

function Row({ style, ...props }: Props) {
  return <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]} {...props} />;
}

function Screen({ style, children, type, ...props }: Props & { type?: 'fullScreen' | 'iosModal' }) {
  const { cannotShowiosModal } = useScreenSize();
  let edges = ['left', 'right'] as Edge[];
  if (type === 'fullScreen') {
    edges = ['top', 'bottom', 'left', 'right'] as Edge[];
  }
  if (type === 'iosModal' && !cannotShowiosModal) {
    edges = ['left', 'right', 'bottom'] as Edge[];
  }
  return (
    <SafeAreaView style={[{ flex: 1, paddingHorizontal: 15 }, style]} edges={edges} {...props}>
      {children}
    </SafeAreaView>
  );
}

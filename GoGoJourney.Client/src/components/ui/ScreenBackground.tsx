import { colors } from '@/theme';
import type { ReactNode } from 'react';
import { ImageBackground, type ImageSourcePropType, StyleSheet, View } from 'react-native';

type Props = {
  source: ImageSourcePropType;
  children: ReactNode;
};

export function ScreenBackground({ source, children }: Props) {
  return (
    <View style={styles.screen}>
      <ImageBackground source={source} resizeMode="cover" style={styles.background}>
        <View style={styles.scrim} />
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  background: { flex: 1, justifyContent: 'space-between' },
  scrim: { ...StyleSheet.absoluteFill, backgroundColor: colors.scrim },
});
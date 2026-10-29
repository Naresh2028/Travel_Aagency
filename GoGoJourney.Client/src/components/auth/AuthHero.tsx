import { Image, StyleSheet, Text, View } from 'react-native';

import { images } from '@/constants/images';
import { colors } from '@/theme';

export function AuthHero() {
  return (
    <View style={styles.container}>
      <Image
        source={images.logo}
        resizeMode="contain"
        style={styles.logo}
        accessible
        accessibilityLabel="SkyLimit logo"
      />
      <Text style={styles.title}>Welcome SkyLimit</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 106 },
  logo: { width: '47%', height: 130 },
  title: {
    color: colors.brandPink,
    fontSize: 30,
    fontWeight: '400',
    letterSpacing: -1.1,
    marginTop: 19,
  },
});
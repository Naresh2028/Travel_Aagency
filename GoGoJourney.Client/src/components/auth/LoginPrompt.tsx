import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/theme';

type Props = {
  onPress?: () => void;
};

export function LoginPrompt({ onPress }: Props) {
  return (
    <Pressable
      style={styles.row}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Already have an account? Log in"
    >
      <Text style={styles.prompt}>Already have an account?</Text>
      <Text style={styles.link}>Log in</Text>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 12 },
  prompt: { color: colors.whiteSoft, fontSize: 20 },
  link: { color: colors.link, fontSize: 20, fontWeight: '500' },
  arrow: { color: colors.linkArrow, fontSize: 39, fontWeight: '200', lineHeight: 33 },
});
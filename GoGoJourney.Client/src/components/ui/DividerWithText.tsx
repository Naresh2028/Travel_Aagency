import { colors } from '@/theme';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  text: string;
};

export function DividerWithText({ text }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.rule} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.rule} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { alignItems: 'center', flexDirection: 'row', gap: 20, marginTop: 15, marginBottom: 13 },
  rule: { backgroundColor: colors.rule, height: 1, flex: 1 },
  text: { color: colors.whiteFaint, fontSize: 21, fontWeight: '600' },
});
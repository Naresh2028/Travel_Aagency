import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';

type AccessOption = {
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  primary?: boolean;
};

function AccessCard({ description, icon, label, onPress, primary }: AccessOption) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Open ${label}`} onPress={onPress} style={({ pressed }) => [styles.accessCard, primary && styles.primaryCard, pressed && styles.pressed]}>
      <View style={[styles.iconWrap, primary && styles.primaryIconWrap]}><Ionicons color={primary ? '#FFFFFF' : '#2868E9'} name={icon} size={38} /></View>
      <View style={[styles.cardDivider, primary && styles.primaryDivider]} />
      <View style={styles.copy}><Text style={[styles.cardTitle, primary && styles.primaryText]}>{label}</Text><Text style={[styles.cardDescription, primary && styles.primaryTextMuted]}>{description}</Text></View>
      <Ionicons color={primary ? '#FFFFFF' : '#7C8BA4'} name="chevron-forward" size={35} />
    </Pressable>
  );
}

export default function ProfileSelectionScreen() {
  const options: AccessOption[] = [
    { label: 'Admin Portal', description: 'Manage fleet, team & operations', icon: 'business', primary: true, onPress: () => router.replace('../(agency)/home') },
    { label: 'Driver App', description: 'View jobs & manage dispatches', icon: 'car-sport', onPress: () => router.replace('../(driver)/home') },
    { label: 'Traveller App', description: 'Request trips & track your ride', icon: 'people', onPress: () => router.replace('../(traveller)/home') },
  ];

  return <ImageBackground resizeMode="cover" source={images.profileSelectionBackground} style={styles.background}>
    <StatusBar style="dark" />
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <ScrollView bounces contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}><View style={styles.globe}><Ionicons color="#FFFFFF" name="globe-outline" size={63} /></View><Text style={styles.title}>Guruvayur Travel</Text><Text style={styles.subtitle}>Select your access mode to continue</Text></View>
        <View style={styles.options}>{options.map((option) => <AccessCard key={option.label} {...option} />)}</View>
      </ScrollView>
    </SafeAreaView>
  </ImageBackground>;
}

const styles = StyleSheet.create({
  background: { flex: 1 }, safeArea: { flex: 1 }, content: { flexGrow: 1, paddingBottom: 32 }, hero: { alignItems: 'center', paddingTop: 92 }, globe: { alignItems: 'center', backgroundColor: '#2769EB', borderRadius: 28, elevation: 6, height: 116, justifyContent: 'center', shadowColor: '#1F58C8', shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.24, shadowRadius: 12, width: 116 }, title: { color: '#07133C', fontSize: 39, fontWeight: '800', letterSpacing: -1.2, marginTop: 28 }, subtitle: { color: '#62728E', fontSize: 20, fontWeight: '500', marginTop: 12, textAlign: 'center' },
  options: { gap: 18, marginTop: 38, paddingHorizontal: 18 }, accessCard: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.95)', borderColor: '#E4EBF5', borderRadius: 28, borderWidth: 1, flexDirection: 'row', minHeight: 132, paddingHorizontal: 18, shadowColor: '#5A6B85', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 14 }, primaryCard: { backgroundColor: '#2A67E9', borderColor: '#2A67E9', shadowColor: '#1D55CA', shadowOpacity: 0.2 }, iconWrap: { alignItems: 'center', backgroundColor: '#F0F6FF', borderRadius: 32, height: 64, justifyContent: 'center', width: 64 }, primaryIconWrap: { backgroundColor: 'rgba(255,255,255,0.12)' }, cardDivider: { backgroundColor: '#D7E2F1', height: 62, marginHorizontal: 12, width: 2 }, primaryDivider: { backgroundColor: 'rgba(255,255,255,0.42)' }, copy: { flex: 1, flexShrink: 1, minWidth: 0 }, cardTitle: { color: '#07133C', fontSize: 23, fontWeight: '800', letterSpacing: -0.5 }, cardDescription: { color: '#697996', fontSize: 15, lineHeight: 21, marginTop: 5 }, primaryText: { color: '#FFFFFF' }, primaryTextMuted: { color: 'rgba(255,255,255,0.86)' }, pressed: { opacity: 0.84, transform: [{ scale: 0.985 }] },
});

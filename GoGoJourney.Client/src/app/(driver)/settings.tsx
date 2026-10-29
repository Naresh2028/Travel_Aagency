import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const driverPhoto = require('../../../assets/images/driver-ramesh-kumar.png');

type SettingItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  subtitle: string;
  title: string;
};

function SettingItem({ icon, onPress, subtitle, title }: SettingItemProps) {
  return (
    <Pressable accessibilityLabel={title} accessibilityRole="button" onPress={onPress ?? (() => Alert.alert(title, `${title} can be connected here.`))} style={({ pressed }) => [styles.settingItem, pressed && styles.pressed]}>
      <View style={styles.settingIcon}><Ionicons color="#1769F5" name={icon} size={29} /></View>
      <View style={styles.settingCopy}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons color="#7B8BA4" name="chevron-forward" size={27} />
    </Pressable>
  );
}

function BottomNavigation() {
  return (
    <View accessibilityRole="tablist" style={styles.navigation}>
      <Pressable accessibilityRole="tab" onPress={() => router.replace('./home')} style={styles.navigationItem}>
        <Ionicons color="#8494AB" name="home-outline" size={27} />
        <Text style={styles.navigationLabel}>Home</Text>
      </Pressable>
      <Pressable accessibilityRole="tab" onPress={() => router.replace('./trip-history')} style={styles.navigationItem}>
        <Ionicons color="#8494AB" name="car-outline" size={28} />
        <Text style={styles.navigationLabel}>My Trips</Text>
      </Pressable>
      <View accessibilityRole="tab" accessibilityState={{ selected: true }} style={styles.navigationItem}>
        <Ionicons color="#1769F5" name="settings" size={29} />
        <Text style={[styles.navigationLabel, styles.navigationLabelSelected]}>Settings</Text>
      </View>
    </View>
  );
}

export default function DriverSettingsScreen() {
  const handleSignOut = () => router.replace('/signup');

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.cardArcLarge} />
          <View style={styles.cardArcSmall} />
          <Image accessibilityLabel="Ramesh Kumar" source={driverPhoto} style={styles.driverPhoto} />
          <View style={styles.profileCopy}>
            <Text style={styles.driverName}>Ramesh Kumar</Text>
            <Text style={styles.phoneNumber}>+91 98472 63018</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <View style={styles.settingList}>
          <SettingItem icon="person-outline" onPress={() => router.push('./profile')} subtitle="Manage your personal details" title="Profile" />
          <SettingItem icon="car-sport-outline" subtitle="View and manage your vehicle" title="Vehicle Details" />
          <SettingItem icon="wallet-outline" subtitle="View your earnings and payout details" title="Earnings" />
          <SettingItem icon="shield-checkmark-outline" onPress={() => router.push('/forgot-password')} subtitle="Update your account password" title="Change Password" />
          <SettingItem icon="headset-outline" subtitle="FAQs and assistance" title="Help & Support" />
        </View>

        <Pressable accessibilityRole="button" onPress={handleSignOut} style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}>
          <Ionicons color="#F12A50" name="log-out-outline" size={29} />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFFFF', flex: 1 },
  scrollContent: { paddingBottom: 22, paddingHorizontal: 17, paddingTop: 17 },
  profileCard: { backgroundColor: '#DCEEFF', borderRadius: 23, height: 166, overflow: 'hidden', position: 'relative' },
  cardArcLarge: { borderColor: 'rgba(107, 166, 255, 0.24)', borderRadius: 170, borderWidth: 44, height: 280, position: 'absolute', right: -95, top: -64, width: 280 },
  cardArcSmall: { borderColor: 'rgba(255,255,255,0.38)', borderRadius: 116, borderWidth: 37, height: 198, position: 'absolute', right: -93, top: 52, width: 198 },
  driverPhoto: { borderColor: '#FFFFFF', borderRadius: 56, borderWidth: 3, height: 108, left: 18, position: 'absolute', top: 28, width: 108 },
  profileCopy: { left: 145, position: 'absolute', top: 59 },
  driverName: { color: '#07134B', fontSize: 23, fontWeight: '800', letterSpacing: -0.6 },
  phoneNumber: { color: '#6B7F9E', fontSize: 16, fontWeight: '500', marginTop: 9 },
  sectionTitle: { color: '#65738B', fontSize: 15, fontWeight: '800', letterSpacing: 0.45, marginLeft: 4, marginTop: 20 },
  settingList: { gap: 7, marginTop: 10 },
  settingItem: { alignItems: 'center', borderColor: '#E0E7F0', borderRadius: 16, borderWidth: 1, flexDirection: 'row', minHeight: 78, paddingHorizontal: 18 },
  settingIcon: { alignItems: 'center', backgroundColor: '#EFF6FF', borderRadius: 13, height: 55, justifyContent: 'center', width: 55 },
  settingCopy: { flex: 1, marginLeft: 15 },
  settingTitle: { color: '#07134B', fontSize: 17, fontWeight: '800', letterSpacing: -0.4 },
  settingSubtitle: { color: '#71819B', fontSize: 13, marginTop: 4 },
  logoutButton: { alignItems: 'center', backgroundColor: '#FFF8F9', borderColor: '#FFD3DB', borderRadius: 13, borderWidth: 1, flexDirection: 'row', height: 60, justifyContent: 'center', marginTop: 13 },
  logoutText: { color: '#F12A50', fontSize: 18, fontWeight: '700', marginLeft: 13 },
  navigation: { alignItems: 'center', backgroundColor: '#FFFFFF', borderTopColor: '#E3E7ED', borderTopWidth: 1, flexDirection: 'row', height: 78, justifyContent: 'space-around', paddingHorizontal: 18 },
  navigationItem: { alignItems: 'center', gap: 4, justifyContent: 'center', minWidth: 68 },
  navigationLabel: { color: '#71829B', fontSize: 12, fontWeight: '600' },
  navigationLabelSelected: { color: '#1769F5', fontWeight: '800' },
  pressed: { opacity: 0.82 },
});

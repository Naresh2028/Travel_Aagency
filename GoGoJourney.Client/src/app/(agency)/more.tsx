import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAgencyData } from '@/providers/AgencyDataProvider';

type MenuItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  subtitle: string;
  title: string;
};

function MenuItem({ icon, onPress, subtitle, title }: MenuItemProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress} style={({ pressed }) => [styles.menuItem, pressed && styles.pressed]}>
      <View style={styles.menuIcon}><Ionicons color="#1769F2" name={icon} size={29} /></View>
      <View style={styles.menuCopy}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons color="#8C9AAF" name="chevron-forward" size={28} />
    </Pressable>
  );
}

function BottomNavigation() {
  const items: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress?: () => void; selected?: boolean }[] = [
    { icon: 'home-outline', label: 'Home', onPress: () => router.replace('./home') },
    { icon: 'car-sport', label: 'Fleet', onPress: () => router.replace('./driver-list') },
    { icon: 'pricetag-outline', label: 'Pricing', onPress: () => router.replace('./trip-pricing') },
    { icon: 'settings-outline', label: 'Settings', selected: true },
  ];

  return (
    <View style={styles.bottomNavigation}>
      {items.map((item) => (
        <Pressable key={item.label} accessibilityRole="tab" accessibilityState={{ selected: item.selected }} onPress={item.onPress} style={styles.navigationItem}>
          <Ionicons color={item.selected ? '#1769F2' : '#8492A6'} name={item.icon} size={29} />
          <Text style={[styles.navigationLabel, item.selected && styles.navigationLabelSelected]}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function MoreScreen() {
  const { resetDemoData } = useAgencyData();

  const confirmLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: () => {
          resetDemoData();
          router.replace('/signup');
        },
      },
    ]);
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.agencyCard}>
          <View style={styles.largeCircle} />
          <View style={styles.smallCircle} />
          <View style={styles.initials}><Text style={styles.initialsLabel}>GT</Text></View>
          <Text style={styles.agencyName}>Guruvayur Travels</Text>
          <Text style={styles.agencyDetails}>Thrissur, Kerala · Agency ID GT-0831</Text>
        </View>

        <Text style={styles.sectionTitle}>AGENCY</Text>
        <View style={styles.menuGroup}>
          <MenuItem icon="create-outline" onPress={() => router.push('./profile')} subtitle="Business and contact details" title="Agency Profile" />
          <View style={styles.menuDivider} />
          <MenuItem icon="headset-outline" onPress={() => Alert.alert('Help & Support', 'Agency support and FAQs will be available here.')} subtitle="FAQs and agency assistance" title="Help & Support" />
        </View>

        <View style={styles.passwordAction}>
          <MenuItem icon="shield-checkmark-outline" onPress={() => router.push('/forgot-password')} subtitle="Update your account password" title="Change Password" />
        </View>

        <Pressable accessibilityRole="button" accessibilityLabel="Log out" onPress={confirmLogout} style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}>
          <Ionicons color="#DE2449" name="log-out-outline" size={30} />
          <Text style={styles.logoutLabel}>Log out</Text>
        </Pressable>
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F9FBFE', flex: 1 },
  content: { flex: 1, paddingHorizontal: 15, paddingTop: 34 },
  agencyCard: { backgroundColor: '#1769F2', borderRadius: 16, height: 160, overflow: 'hidden', paddingHorizontal: 19, paddingTop: 26 },
  largeCircle: { backgroundColor: 'rgba(255,255,255,0.09)', borderRadius: 128, height: 256, position: 'absolute', right: -155, top: 22, width: 256 },
  smallCircle: { backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 81, height: 162, position: 'absolute', right: -28, top: 83, width: 162 },
  initials: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.17)', borderRadius: 27, height: 54, justifyContent: 'center', width: 54 },
  initialsLabel: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  agencyName: { color: '#FFFFFF', fontSize: 25, fontWeight: '800', letterSpacing: -0.55, marginTop: 16 },
  agencyDetails: { color: 'rgba(255,255,255,0.86)', fontSize: 16, marginTop: 7 },
  sectionTitle: { color: '#7B899D', fontSize: 17, fontWeight: '800', letterSpacing: 0.2, marginLeft: 3, marginTop: 19 },
  menuGroup: { backgroundColor: '#FFFFFF', borderColor: '#E2E8EF', borderRadius: 20, borderWidth: 1, marginTop: 8, overflow: 'hidden' }, passwordAction: { backgroundColor: '#FFFFFF', borderColor: '#E2E8EF', borderRadius: 20, borderWidth: 1, marginTop: 12, overflow: 'hidden' },
  menuItem: { alignItems: 'center', flexDirection: 'row', height: 74, paddingHorizontal: 15 },
  menuIcon: { alignItems: 'center', backgroundColor: '#F0F6FF', borderRadius: 15, height: 48, justifyContent: 'center', width: 50 },
  menuCopy: { flex: 1, marginLeft: 16 },
  menuTitle: { color: '#071234', fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
  menuSubtitle: { color: '#7889A5', fontSize: 16, marginTop: 3 },
  menuDivider: { backgroundColor: '#E9EEF3', height: 1, marginLeft: 81 },
  logoutButton: { alignItems: 'center', backgroundColor: '#FFF7F8', borderColor: '#FFC9D2', borderRadius: 16, borderWidth: 1, flexDirection: 'row', height: 54, justifyContent: 'center', marginTop: 16 },
  logoutLabel: { color: '#DE2449', fontSize: 20, fontWeight: '800', marginLeft: 12 },
  pressed: { opacity: 0.8 },
  bottomNavigation: { alignItems: 'flex-start', backgroundColor: '#FFFFFF', borderTopColor: '#E2E7EC', borderTopWidth: 1, flexDirection: 'row', height: 75, paddingTop: 10 },
  navigationItem: { alignItems: 'center', flex: 1, gap: 3 },
  navigationLabel: { color: '#7E8DA4', fontSize: 13, fontWeight: '600' },
  navigationLabelSelected: { color: '#1769F2' },
});

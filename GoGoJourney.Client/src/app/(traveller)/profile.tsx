import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SettingItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  subtitle: string;
  title: string;
};

function SettingItem({ icon, onPress, subtitle, title }: SettingItemProps) {
  return (
    <Pressable accessibilityLabel={title} accessibilityRole="button" onPress={onPress ?? (() => Alert.alert(title, `${title} can be connected here.`))} style={({ pressed }) => [styles.settingItem, pressed && styles.pressed]}>
      <View style={styles.settingIcon}><Ionicons color="#1967F1" name={icon} size={29} /></View>
      <View style={styles.settingCopy}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons color="#7A8BA4" name="chevron-forward" size={27} />
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
      <Pressable accessibilityRole="tab" onPress={() => router.replace('./trip-track')} style={styles.navigationItem}>
        <Ionicons color="#8494AB" name="car-outline" size={28} />
        <Text style={styles.navigationLabel}>My Trips</Text>
      </Pressable>
      <Pressable accessibilityRole="tab" accessibilityState={{ selected: true }} style={styles.navigationItem}>
        <Ionicons color="#1967F1" name="settings" size={29} />
        <Text style={[styles.navigationLabel, styles.navigationLabelSelected]}>Settings</Text>
      </Pressable>
    </View>
  );
}

export default function TravellerProfileScreen() {
  const handleSignOut = () => router.replace('/signup');

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileGlow} />
          <View style={styles.avatar}><Text style={styles.avatarText}>NN</Text></View>
          <View style={styles.profileDetails}>
            <Text style={styles.name}>Naresh Nagaraj</Text>
            <Text style={styles.role}>Traveller</Text>
            <View style={styles.detailRow}>
              <Ionicons color="#FFFFFF" name="call" size={19} />
              <Text style={styles.detailText}>+91 98472 63018</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons color="#FFFFFF" name="location" size={20} />
              <Text style={styles.detailText}>Thrissur, Kerala</Text>
            </View>
          </View>
          <Pressable accessibilityLabel="Edit profile" accessibilityRole="button" onPress={() => router.push('./edit-profile')} style={styles.editButton}>
            <Ionicons color="#FFFFFF" name="pencil" size={22} />
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <View style={styles.settingsCard}>
          <SettingItem icon="person-outline" onPress={() => router.push('./edit-profile')} subtitle="View and update your profile" title="Profile" />
          <View style={styles.divider} />
          <SettingItem icon="key-outline" onPress={() => router.push('/forgot-password')} subtitle="Update your account password" title="Change Password" />
          <View style={styles.divider} />
          <SettingItem icon="headset-outline" subtitle="FAQs and agency assistance" title="Help & Support" />
        </View>

        <Pressable accessibilityRole="button" onPress={handleSignOut} style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}>
          <Ionicons color="#F12A50" name="log-out-outline" size={30} />
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </View>
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFFFF', flex: 1 },
  content: { flex: 1, paddingHorizontal: 17, paddingTop: 18 },
  profileCard: { backgroundColor: '#2078F4', borderRadius: 23, height: 164, overflow: 'hidden', padding: 17, position: 'relative' },
  profileGlow: { backgroundColor: 'rgba(255,255,255,0.11)', borderRadius: 150, bottom: -100, height: 230, position: 'absolute', right: -80, width: 230 },
  avatar: { alignItems: 'center', backgroundColor: '#EAF2FF', borderColor: '#FFFFFF', borderRadius: 49, borderWidth: 3, height: 94, justifyContent: 'center', marginTop: 14, width: 94 },
  avatarText: { color: '#1967F1', fontSize: 28, fontWeight: '800', letterSpacing: -1 },
  profileDetails: { left: 129, position: 'absolute', top: 30 },
  name: { color: '#FFFFFF', fontSize: 22, fontWeight: '800', letterSpacing: -0.6 },
  role: { color: '#E8F1FF', fontSize: 18, fontWeight: '500', marginTop: 6 },
  detailRow: { alignItems: 'center', flexDirection: 'row', marginTop: 10 },
  detailText: { color: '#FFFFFF', fontSize: 14.5, fontWeight: '500', marginLeft: 10 },
  editButton: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.13)', borderRadius: 22, height: 48, justifyContent: 'center', position: 'absolute', right: 17, top: 17, width: 48 },
  sectionTitle: { color: '#50617B', fontSize: 16, fontWeight: '800', letterSpacing: 0.5, marginLeft: 3, marginTop: 24 },
  settingsCard: { borderColor: '#DFE7F1', borderRadius: 17, borderWidth: 1, marginTop: 12, overflow: 'hidden' },
  settingItem: { alignItems: 'center', flexDirection: 'row', height: 92, paddingHorizontal: 16 },
  settingIcon: { alignItems: 'center', backgroundColor: '#EFF6FF', borderRadius: 14, height: 55, justifyContent: 'center', width: 55 },
  settingCopy: { flex: 1, marginLeft: 15 },
  settingTitle: { color: '#08173E', fontSize: 18, fontWeight: '800', letterSpacing: -0.4 },
  settingSubtitle: { color: '#71839F', fontSize: 14, marginTop: 5 },
  divider: { backgroundColor: '#E4EAF2', height: 1, marginLeft: 16 },
  logoutButton: { alignItems: 'center', backgroundColor: '#FFF8F9', borderColor: '#FFD2DA', borderRadius: 14, borderWidth: 1, flexDirection: 'row', height: 62, justifyContent: 'center', marginTop: 18 },
  logoutText: { color: '#F12A50', fontSize: 18, fontWeight: '700', marginLeft: 14 },
  navigation: { alignItems: 'center', backgroundColor: '#FFFFFF', borderTopColor: '#E3E7ED', borderTopWidth: 1, flexDirection: 'row', height: 78, justifyContent: 'space-around', paddingHorizontal: 18 },
  navigationItem: { alignItems: 'center', gap: 4, justifyContent: 'center', minWidth: 68 },
  navigationLabel: { color: '#71829B', fontSize: 12, fontWeight: '600' },
  navigationLabelSelected: { color: '#1967F1', fontWeight: '800' },
  pressed: { opacity: 0.82 },
});

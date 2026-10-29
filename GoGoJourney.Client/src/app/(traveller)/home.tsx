import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Activity = {
  destination: string;
  details: string;
};

const recentActivity: Activity[] = [
  { destination: 'Guruvayur Temple', details: 'Today · 2 Passengers' },
  { destination: 'Thrissur Railway Station', details: 'Oct 24, 2026 · 1 Passenger' },
];

function ActivityCard({ destination, details }: Activity) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`View trip to ${destination}`} onPress={() => router.push('./trip-track')} style={({ pressed }) => [styles.activityCard, pressed && styles.pressed]}>
      <View style={styles.tripIcon}>
        <Ionicons color="#2F6BFF" name="car-sport" size={17} />
      </View>
      <View style={styles.activityCopy}>
        <Text numberOfLines={1} style={styles.destination}>{destination}</Text>
        <Text style={styles.tripDetails}>{details}</Text>
      </View>
      <View style={styles.doneBadge}><Text style={styles.doneText}>DONE</Text></View>
    </Pressable>
  );
}

function NavigationItem({ icon, label, onPress, selected }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress?: () => void; selected?: boolean }) {
  return (
    <Pressable accessibilityRole="tab" accessibilityState={{ selected }} disabled={!onPress} onPress={onPress} style={styles.navigationItem}>
      <Ionicons color={selected ? '#2F6BFF' : '#90A4C0'} name={icon} size={19} />
      <Text style={[styles.navigationLabel, selected && styles.navigationLabelSelected]}>{label}</Text>
    </Pressable>
  );
}

export default function TravellerHomeScreen() {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.globeBadge}>
          <Ionicons color="#FFFFFF" name="globe-outline" size={19} />
        </View>
        <View>
          <Text style={styles.linkedLabel}>Linked Organization</Text>
          <Text style={styles.organizationName}>Guruvayur Travels</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.requestCard}>
          <Text style={styles.requestTitle}>Where are you heading?</Text>
          <Text style={styles.requestDescription}>Request standard or luxury airport transfer,{`\n`}business transit, and special event rides{`\n`}instantly.</Text>
          <Pressable accessibilityRole="button" onPress={() => router.push('./search-location')} style={({ pressed }) => [styles.requestButton, pressed && styles.pressed]}>
            <Text style={styles.requestButtonLabel}>Request a Trip</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
        <View style={styles.activityList}>
          {recentActivity.map((trip) => <ActivityCard key={trip.destination} {...trip} />)}
        </View>
      </View>

      <View accessibilityRole="tablist" style={styles.navigation}>
        <NavigationItem icon="home" label="Home" selected />
        <NavigationItem icon="car-outline" label="My Trips" onPress={() => router.push('./trip-track')} />
        <NavigationItem icon="settings-outline" label="Profile" onPress={() => router.push('./profile')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFFFF', flex: 1 },
  header: {
    alignItems: 'center',
    backgroundColor: '#2E62E8',
    flexDirection: 'row',
    gap: 10,
    height: 70,
    paddingHorizontal: 21,
    paddingTop: 4,
  },
  globeBadge: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, height: 37, justifyContent: 'center', width: 37 },
  linkedLabel: { color: '#DCE8FF', fontSize: 10, fontWeight: '500', lineHeight: 13 },
  organizationName: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', lineHeight: 20 },
  body: { backgroundColor: '#F7F9FC', flex: 1, paddingHorizontal: 21, paddingTop: 16 },
  requestCard: { backgroundColor: '#FFFFFF', borderColor: '#DCE4EF', borderRadius: 13, borderWidth: 1, paddingHorizontal: 16, paddingTop: 17, shadowColor: '#243B61', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.025, shadowRadius: 4 },
  requestTitle: { color: '#061638', fontSize: 15, fontWeight: '800', letterSpacing: -0.15 },
  requestDescription: { color: '#335483', fontSize: 11.5, lineHeight: 17, marginTop: 11 },
  requestButton: { alignItems: 'center', backgroundColor: '#2E62E8', borderRadius: 9, height: 40, justifyContent: 'center', marginTop: 10, marginBottom: 16 },
  requestButtonLabel: { color: '#FFFFFF', fontSize: 12.5, fontWeight: '700' },
  sectionTitle: { color: '#1B3458', fontSize: 10.5, fontWeight: '800', marginTop: 18 },
  activityList: { gap: 9, marginTop: 11 },
  activityCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#DCE4EF', borderRadius: 9, borderWidth: 1, flexDirection: 'row', height: 56, paddingHorizontal: 11 },
  tripIcon: { alignItems: 'center', backgroundColor: '#EFF5FF', borderRadius: 7, height: 32, justifyContent: 'center', width: 32 },
  activityCopy: { flex: 1, marginLeft: 10 },
  destination: { color: '#10234B', fontSize: 11.5, fontWeight: '700' },
  tripDetails: { color: '#49658B', fontSize: 9.5, marginTop: 4 },
  doneBadge: { alignItems: 'center', backgroundColor: '#DDF8E9', borderRadius: 10, justifyContent: 'center', minWidth: 40, paddingHorizontal: 7, paddingVertical: 4 },
  doneText: { color: '#0D9263', fontSize: 8, fontWeight: '800' },
  navigation: { alignItems: 'center', backgroundColor: '#FFFFFF', borderTopColor: '#D9E2ED', borderTopWidth: 1, flexDirection: 'row', height: 74, justifyContent: 'space-around', paddingHorizontal: 15 },
  navigationItem: { alignItems: 'center', gap: 3, justifyContent: 'center', minWidth: 60, paddingVertical: 6 },
  navigationLabel: { color: '#24405F', fontSize: 8, fontWeight: '500' },
  navigationLabelSelected: { color: '#2F6BFF', fontWeight: '700' },
  pressed: { opacity: 0.8 },
});

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const jobs = [
  { id: '208', day: 'TODAY', pickup: 'Westin Bonaventure Hotel', dropoff: 'LAX Airport Terminal 2', traveller: 'David Kimani', time: '14:30' },
  { id: '209', day: 'TOMORROW', pickup: 'Beverly Hills Hotel', dropoff: 'LAX Private Suite Terminal', traveller: 'Elena Rostova', time: '09:00' },
];

export default function DriverHomeScreen() {
  return <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
    <StatusBar style="dark" />
    <View style={styles.heading}><Text style={styles.title}>Assigned Jobs</Text><Text style={styles.subtitle}>Your upcoming scheduled dispatches</Text></View>
    <View style={styles.list}>{jobs.map((job, index) => <Pressable key={job.id} accessibilityRole="button" accessibilityLabel={`Open trip ${job.id}`} style={({ pressed }) => [styles.jobCard, index === 0 && styles.activeJobCard, pressed && styles.pressed]}><View style={styles.jobTop}><Text style={styles.tripLabel}>TRIP #{job.id} · {job.day}</Text><View style={styles.assignedBadge}><Text style={styles.assignedText}>ASSIGNED</Text></View></View><View style={styles.line} /><Text style={styles.location}><Text style={styles.locationStrong}>Pickup: </Text>{job.pickup}</Text><Text style={styles.location}><Text style={styles.dropoff}>Dropoff: </Text>{job.dropoff}</Text><View style={styles.jobBottom}><Text style={styles.traveller}>Traveller: {job.traveller}</Text><Text style={styles.time}>{job.time}</Text></View></Pressable>)}</View>
    <View accessibilityRole="tablist" style={styles.navigation}><View accessibilityRole="tab" accessibilityState={{ selected: true }} style={styles.navigationItem}><Ionicons color="#2468ED" name="home" size={26} /><Text style={[styles.navigationLabel, styles.navigationLabelSelected]}>Home</Text></View><Pressable accessibilityRole="tab" onPress={() => router.replace('./trip-history')} style={styles.navigationItem}><Ionicons color="#8494AB" name="car-outline" size={27} /><Text style={styles.navigationLabel}>Trips</Text></Pressable><Pressable accessibilityRole="tab" onPress={() => router.replace('./settings')} style={styles.navigationItem}><Ionicons color="#8494AB" name="settings-outline" size={26} /><Text style={styles.navigationLabel}>Settings</Text></Pressable></View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8FAFE', flex: 1 }, heading: { backgroundColor: '#FFFFFF', paddingBottom: 20, paddingHorizontal: 22, paddingTop: 15 }, title: { color: '#07163A', fontSize: 27, fontWeight: '800', letterSpacing: -0.65 }, subtitle: { color: '#6E7F98', fontSize: 13, marginTop: 4 }, list: { gap: 11, paddingHorizontal: 22, paddingTop: 18 }, jobCard: { backgroundColor: '#FFFFFF', borderColor: '#D9E2EF', borderRadius: 11, borderWidth: 1, minHeight: 151, padding: 15 }, activeJobCard: { borderColor: '#286CE1', borderWidth: 1.5 }, jobTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, tripLabel: { color: '#286CE1', fontSize: 12, fontWeight: '800' }, assignedBadge: { backgroundColor: '#FFF1C6', borderRadius: 14, paddingHorizontal: 11, paddingVertical: 5 }, assignedText: { color: '#A35D09', fontSize: 10, fontWeight: '800' }, line: { backgroundColor: '#DFE6F0', height: 1, marginVertical: 12 }, location: { color: '#385578', fontSize: 13, marginBottom: 8 }, locationStrong: { color: '#07163A', fontWeight: '800' }, dropoff: { color: '#536F94', fontWeight: '700' }, jobBottom: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 1 }, traveller: { color: '#91A1BA', fontSize: 11 }, time: { color: '#07163A', fontSize: 13, fontWeight: '800' }, navigation: { alignItems: 'center', backgroundColor: '#FFFFFF', borderTopColor: '#E1E7EF', borderTopWidth: 1, flexDirection: 'row', height: 78, justifyContent: 'space-around', marginTop: 'auto' }, navigationItem: { alignItems: 'center', gap: 3, minWidth: 68 }, navigationLabel: { color: '#8494AB', fontSize: 11, fontWeight: '600' }, navigationLabelSelected: { color: '#2468ED' }, pressed: { opacity: 0.8 },
});

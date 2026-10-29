import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type CompletedTrip = {
  date: string;
  dropoff: string;
  fare: string;
  id: string;
  passenger: string;
  pickup: string;
  distance: string;
};

const completedTrips: CompletedTrip[] = [
  { id: '208', date: 'Oct 12, 2026', pickup: 'Westin Bonaventure Hotel', dropoff: 'LAX Airport Terminal 2', passenger: 'David Kimani', distance: '12.4 mi', fare: '$42.50' },
  { id: '207', date: 'Oct 08, 2026', pickup: 'Beverly Hills Hotel', dropoff: 'LAX Private Suite Terminal', passenger: 'Elena Rostova', distance: '18.3 mi', fare: '$67.20' },
  { id: '206', date: 'Oct 05, 2026', pickup: 'The Ritz-Carlton, Downtown', dropoff: 'Burbank Airport', passenger: 'James Okafor', distance: '10.8 mi', fare: '$38.90' },
];

function TripCard({ date, distance, dropoff, fare, id, passenger, pickup }: CompletedTrip) {
  return <Pressable accessibilityRole="button" accessibilityLabel={`View completed trip ${id}`} style={({ pressed }) => [styles.tripCard, pressed && styles.pressed]}>
    <View style={styles.tripHeading}><Text style={styles.tripId}>TRIP #{id} · {date}</Text><View style={styles.doneBadge}><Text style={styles.doneText}>DONE</Text></View></View>
    <View style={styles.divider} />
    <View style={styles.routeRow}><View style={styles.pickupDot} /><Text numberOfLines={1} style={styles.routeText}>{pickup}</Text></View>
    <View style={styles.routeRow}><View style={styles.dropoffDot} /><Text numberOfLines={1} style={styles.routeText}>{dropoff}</Text></View>
    <View style={styles.tripFooter}><Text style={styles.passenger}>{passenger} · {distance}</Text><Text style={styles.fare}>{fare}</Text></View>
  </Pressable>;
}

export default function DriverTripHistoryScreen() {
  return <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
    <StatusBar style="dark" />
    <View style={styles.header}><Text style={styles.title}>My Trips</Text><Text style={styles.subtitle}>Your completed trip history</Text></View>
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>{completedTrips.map((trip) => <TripCard key={trip.id} {...trip} />)}</ScrollView>
    <View accessibilityRole="tablist" style={styles.navigation}>
      <Pressable accessibilityRole="tab" onPress={() => router.replace('./home')} style={styles.navigationItem}><Ionicons color="#8494AB" name="home-outline" size={27} /><Text style={styles.navigationLabel}>Home</Text></Pressable>
      <View accessibilityRole="tab" accessibilityState={{ selected: true }} style={[styles.navigationItem, styles.activeNavigationItem]}><Ionicons color="#2468ED" name="car" size={27} /><Text style={[styles.navigationLabel, styles.navigationLabelSelected]}>Trips</Text></View>
      <Pressable accessibilityRole="tab" onPress={() => router.replace('./settings')} style={styles.navigationItem}><Ionicons color="#8494AB" name="settings-outline" size={27} /><Text style={styles.navigationLabel}>Settings</Text></Pressable>
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8FAFE', flex: 1 }, header: { backgroundColor: '#FFFFFF', paddingBottom: 18, paddingHorizontal: 22, paddingTop: 11 }, title: { color: '#07163A', fontSize: 27, fontWeight: '800', letterSpacing: -0.65 }, subtitle: { color: '#6E7F98', fontSize: 13, marginTop: 4 }, content: { gap: 11, paddingHorizontal: 20, paddingTop: 16 }, tripCard: { backgroundColor: '#FFFFFF', borderColor: '#D9E2EF', borderRadius: 10, borderWidth: 1, minHeight: 130, padding: 13 }, tripHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }, tripId: { color: '#203C67', fontSize: 11.5, fontWeight: '800' }, doneBadge: { alignItems: 'center', backgroundColor: '#D8F8E8', borderRadius: 14, justifyContent: 'center', minWidth: 44, paddingHorizontal: 9, paddingVertical: 5 }, doneText: { color: '#128759', fontSize: 9.5, fontWeight: '800' }, divider: { backgroundColor: '#DCE5EF', height: 1, marginVertical: 10 }, routeRow: { alignItems: 'center', flexDirection: 'row', marginBottom: 8 }, pickupDot: { backgroundColor: '#2468ED', borderRadius: 4, height: 7, marginRight: 9, width: 7 }, dropoffDot: { backgroundColor: '#F2364D', borderRadius: 4, height: 7, marginRight: 9, width: 7 }, routeText: { color: '#18365E', flex: 1, fontSize: 12.5, fontWeight: '500' }, tripFooter: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }, passenger: { color: '#8797B1', fontSize: 10.5 }, fare: { color: '#205FEE', fontSize: 15, fontWeight: '800' }, navigation: { alignItems: 'center', backgroundColor: '#FFFFFF', borderTopColor: '#E1E7EF', borderTopWidth: 1, flexDirection: 'row', height: 78, justifyContent: 'space-around', paddingHorizontal: 18 }, navigationItem: { alignItems: 'center', gap: 3, justifyContent: 'center', minWidth: 68 }, activeNavigationItem: { borderColor: '#07163A', borderRadius: 5, borderWidth: 2, height: 58, marginTop: -20, width: 66 }, navigationLabel: { color: '#8494AB', fontSize: 11, fontWeight: '600' }, navigationLabelSelected: { color: '#2468ED' }, pressed: { opacity: 0.8 },
});

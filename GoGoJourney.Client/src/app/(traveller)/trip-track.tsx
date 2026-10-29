import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TripStage = {
  label: string;
  time: string;
  state: 'complete' | 'current' | 'upcoming';
};

const stages: TripStage[] = [
  { label: 'Requested', time: '2:30 PM', state: 'complete' },
  { label: 'Driver\nAssigned', time: '3:00 PM', state: 'current' },
  { label: 'On Trip', time: '-', state: 'upcoming' },
  { label: 'Arrived &\nCompleted', time: '-', state: 'upcoming' },
];

function Stage({ label, state, time }: TripStage) {
  return (
    <View style={styles.stage}>
      <View style={[styles.stageDot, state === 'upcoming' && styles.stageDotUpcoming]}>
        {state === 'complete' ? <Ionicons color="#FFFFFF" name="checkmark" size={22} /> : state === 'current' ? <View style={styles.currentDot} /> : null}
      </View>
      <Text style={[styles.stageLabel, state === 'upcoming' && styles.stageLabelUpcoming]}>{label}</Text>
      <Text style={[styles.stageTime, state === 'upcoming' && styles.stageLabelUpcoming]}>{time}</Text>
    </View>
  );
}

function BottomNavigation() {
  return (
    <View accessibilityRole="tablist" style={styles.navigation}>
      <Pressable accessibilityRole="tab" onPress={() => router.replace('./home')} style={styles.navigationItem}>
        <Ionicons color="#8494AB" name="home-outline" size={27} />
        <Text style={styles.navigationLabel}>Home</Text>
      </Pressable>
      <Pressable accessibilityRole="tab" accessibilityState={{ selected: true }} style={styles.navigationItem}>
        <Ionicons color="#2866EE" name="car-sport" size={29} />
        <Text style={[styles.navigationLabel, styles.navigationLabelSelected]}>My Trips</Text>
      </Pressable>
      <Pressable accessibilityRole="tab" onPress={() => router.push('./profile')} style={styles.navigationItem}>
        <Ionicons color="#8494AB" name="settings-outline" size={27} />
        <Text style={styles.navigationLabel}>Profile</Text>
      </Pressable>
    </View>
  );
}

export default function TripTrackScreen() {
  const { departureTime, dropoff, passengers, pickup } = useLocalSearchParams<{ departureTime?: string; dropoff?: string; passengers?: string; pickup?: string }>();
  const tripPickup = pickup || 'Thrissur, Kerala';
  const tripDropoff = dropoff || 'Guruvayur, Kerala';
  const tripTime = departureTime || 'Today, 14:30';
  const tripPassengers = passengers || '2';

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable accessibilityLabel="Go back" hitSlop={8} onPress={() => router.back()} style={styles.backButton}>
          <Ionicons color="#091B42" name="arrow-back" size={27} />
        </Pressable>
        <Text style={styles.title}>Trip #GT-208</Text>
        <View style={styles.statusBadge}><Text style={styles.statusLabel}>In Progress</Text></View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.progressCard}>
          <View style={styles.timelineTrack}>
            <View style={styles.timelineActiveTrack} />
          </View>
          <View style={styles.stages}>{stages.map((stage) => <Stage key={stage.label} {...stage} />)}</View>
        </View>

        <View style={styles.driverCard}>
          <View style={styles.driverSummary}>
            <View style={styles.avatar}><Text style={styles.avatarText}>MV</Text></View>
            <View style={styles.driverCopy}>
              <Text style={styles.driverName}>Ramesh Kumar (Driver)</Text>
              <Text style={styles.vehicleText}>Toyota Innova Crysta · KL-08-BY-4420</Text>
            </View>
          </View>
          <Pressable accessibilityRole="button" onPress={() => Alert.alert('Call Driver', 'Driver calling can be connected here.')} style={({ pressed }) => [styles.callButton, pressed && styles.pressed]}>
            <Ionicons color="#2866EE" name="call-outline" size={25} />
            <Text style={styles.callButtonText}>Call Driver</Text>
          </Pressable>
        </View>

        <View style={styles.routeCard}>
          <View style={styles.routeIconColumn}>
            <View style={[styles.routeIcon, styles.pickupIcon]}><Ionicons color="#FFFFFF" name="ellipse" size={12} /></View>
            <View style={styles.routeLine} />
            <View style={[styles.routeIcon, styles.dropoffIcon]}><Ionicons color="#FFFFFF" name="ellipse" size={12} /></View>
          </View>
          <View style={styles.routeCopy}>
            <View>
              <Text style={styles.routeLabel}>From</Text>
              <Text style={styles.routeTitle}>{tripPickup}</Text>
              <Text style={styles.routeAddress}>{tripTime} · {tripPassengers} passenger{tripPassengers === '1' ? '' : 's'}</Text>
            </View>
            <View style={styles.dropoffCopy}>
              <Text style={styles.routeLabel}>To</Text>
              <Text style={styles.routeTitle}>{tripDropoff}</Text>
              <Text style={styles.routeAddress}>{tripDropoff}, India</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFFFF', flex: 1 },
  header: { alignItems: 'center', flexDirection: 'row', paddingHorizontal: 22, paddingTop: 18 },
  backButton: { alignItems: 'center', backgroundColor: '#EFF4FD', borderRadius: 31, height: 58, justifyContent: 'center', width: 58 },
  title: { color: '#07143A', fontSize: 25, fontWeight: '800', letterSpacing: -0.7, marginLeft: 17 },
  statusBadge: { backgroundColor: '#E8F0FF', borderRadius: 24, marginLeft: 'auto', paddingHorizontal: 16, paddingVertical: 10 },
  statusLabel: { color: '#2866EE', fontSize: 14, fontWeight: '700' },
  scrollContent: { paddingBottom: 24, paddingHorizontal: 22, paddingTop: 22 },
  progressCard: { borderColor: '#E1E7F0', borderRadius: 19, borderWidth: 1, height: 150, overflow: 'hidden', paddingTop: 22 },
  timelineTrack: { backgroundColor: '#D8DFE9', height: 2, left: '12.5%', position: 'absolute', right: '12.5%', top: 52 },
  timelineActiveTrack: { backgroundColor: '#2866EE', height: 2, width: '34%' },
  stages: { flexDirection: 'row', justifyContent: 'space-between' },
  stage: { alignItems: 'center', width: '25%' },
  stageDot: { alignItems: 'center', backgroundColor: '#2866EE', borderRadius: 24, height: 48, justifyContent: 'center', width: 48 },
  stageDotUpcoming: { backgroundColor: '#D6DEE9' },
  currentDot: { backgroundColor: '#FFFFFF', borderRadius: 9, height: 18, width: 18 },
  stageLabel: { color: '#0A173A', fontSize: 12.5, fontWeight: '800', lineHeight: 17, marginTop: 10, textAlign: 'center' },
  stageLabelUpcoming: { color: '#6C7E99' },
  stageTime: { color: '#6A7D9A', fontSize: 12, marginTop: 3 },
  driverCard: { borderColor: '#E1E7F0', borderRadius: 19, borderWidth: 1, marginTop: 17, padding: 17 },
  driverSummary: { alignItems: 'center', flexDirection: 'row' },
  avatar: { alignItems: 'center', backgroundColor: '#EDF4FF', borderRadius: 43, height: 78, justifyContent: 'center', width: 78 },
  avatarText: { color: '#2866EE', fontSize: 24, fontWeight: '700' },
  driverCopy: { flex: 1, marginLeft: 16 },
  driverName: { color: '#07143A', fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
  vehicleText: { color: '#7486A2', fontSize: 14, marginTop: 7 },
  callButton: { alignItems: 'center', borderColor: '#2866EE', borderRadius: 10, borderWidth: 1.5, flexDirection: 'row', height: 58, justifyContent: 'center', marginTop: 17 },
  callButtonText: { color: '#2866EE', fontSize: 17, fontWeight: '700', marginLeft: 11 },
  routeCard: { borderColor: '#E1E7F0', borderRadius: 19, borderWidth: 1, flexDirection: 'row', marginTop: 17, minHeight: 202, padding: 20 },
  routeIconColumn: { alignItems: 'center', width: 40 },
  routeIcon: { alignItems: 'center', borderRadius: 17, height: 34, justifyContent: 'center', width: 34 },
  pickupIcon: { backgroundColor: '#2866EE' },
  dropoffIcon: { backgroundColor: '#FA5059' },
  routeLine: { borderColor: '#9CADC5', borderLeftWidth: 2, borderStyle: 'dashed', flex: 1, marginVertical: 5 },
  routeCopy: { flex: 1, paddingLeft: 6 },
  routeLabel: { color: '#6E819D', fontSize: 14 },
  routeTitle: { color: '#07143A', fontSize: 17, fontWeight: '800', letterSpacing: -0.3, marginTop: 3 },
  routeAddress: { color: '#70829D', fontSize: 13.5, lineHeight: 19, marginTop: 5 },
  dropoffCopy: { marginTop: 27 },
  navigation: { alignItems: 'center', backgroundColor: '#FFFFFF', borderTopColor: '#E3E7ED', borderTopWidth: 1, flexDirection: 'row', height: 78, justifyContent: 'space-around', paddingHorizontal: 18 },
  navigationItem: { alignItems: 'center', gap: 4, justifyContent: 'center', minWidth: 68 },
  navigationLabel: { color: '#71829B', fontSize: 12, fontWeight: '600' },
  navigationLabelSelected: { color: '#2866EE', fontWeight: '800' },
  pressed: { opacity: 0.82 },
});

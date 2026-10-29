import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const requestFilters = ['New', 'In Progress', 'Completed', 'Rejected'] as const;
type RequestFilter = (typeof requestFilters)[number];

const requests = [
  { initials: 'MN', name: 'Meera Nair', trip: 'GT-2048 · Today, 5:30 PM', pickup: 'Punkunnam', dropoff: 'Guruvayur Temple', vehicle: 'Cab', tone: '#EAF1FF', initialsColor: '#2169E8' },
  { initials: 'AR', name: 'Arjun Ramesh', trip: 'GT-2049 · Today, 7:15 PM', pickup: 'Thrissur', dropoff: 'Kochi Airport', vehicle: 'Car', tone: '#E6FAF0', initialsColor: '#0BA968' },
  { initials: 'SS', name: 'Sneha Suresh', trip: 'GT-2050 · Tomorrow, 9:00 AM', pickup: 'Guruvayur Temple', dropoff: 'Calicut', vehicle: 'Van', tone: '#F0E9FF', initialsColor: '#6C27DC' },
  { initials: 'VK', name: 'Vishnu K', trip: 'GT-2051 · Tomorrow, 11:30 AM', pickup: 'Thrissur', dropoff: 'Athirappilly', vehicle: 'Car', tone: '#FFE8EC', initialsColor: '#E0324C' },
];

type MetricProps = {
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

function MetricCard({ color, icon, label, value }: MetricProps) {
  return (
    <View style={[styles.metricCard, { backgroundColor: color }]}>
      <View style={styles.metricIcon}><Ionicons color="#1D67EE" name={icon} size={21} /></View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function RequestCard({ request }: { request: (typeof requests)[number] }) {
  return (
    <Pressable accessibilityLabel={`Open ${request.name}'s request`} accessibilityRole="button" onPress={() => Alert.alert('Trip Request', `${request.name}'s request can be opened here.`)} style={({ pressed }) => [styles.requestCard, pressed && styles.pressed]}>
      <View style={[styles.initials, { backgroundColor: request.tone }]}><Text style={[styles.initialsText, { color: request.initialsColor }]}>{request.initials}</Text></View>
      <View style={styles.requestBody}>
        <Text style={styles.requestName}>{request.name}</Text>
        <Text style={styles.requestMeta}>{request.trip}</Text>
        <View style={styles.routeRow}><View style={styles.pickupDot} /><Text style={styles.routeText}>{request.pickup}</Text></View>
        <View style={styles.routeRow}><View style={styles.dropoffDot} /><Text style={styles.routeText}>{request.dropoff}</Text></View>
        <View style={styles.vehicleBadge}><Text style={styles.vehicleLabel}>{request.vehicle}</Text></View>
      </View>
      <View style={styles.requestRight}>
        <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>
        <Ionicons color="#7588A4" name="chevron-forward" size={25} />
      </View>
    </Pressable>
  );
}

function BottomNavigation() {
  return (
    <View accessibilityRole="tablist" style={styles.navigation}>
      <View accessibilityRole="tab" accessibilityState={{ selected: true }} style={styles.navigationItem}>
        <Ionicons color="#1D67EE" name="home" size={28} />
        <Text style={[styles.navigationLabel, styles.navigationLabelSelected]}>Home</Text>
      </View>
      <Pressable accessibilityRole="tab" onPress={() => router.replace('./driver-list')} style={styles.navigationItem}>
        <Ionicons color="#7A8AA1" name="car-sport-outline" size={29} />
        <Text style={styles.navigationLabel}>Fleet</Text>
      </Pressable>
      <Pressable accessibilityRole="tab" onPress={() => router.replace('./trip-pricing')} style={styles.navigationItem}>
        <Ionicons color="#7A8AA1" name="pricetag-outline" size={29} />
        <Text style={styles.navigationLabel}>Pricing</Text>
      </Pressable>
      <Pressable accessibilityRole="tab" onPress={() => router.replace('./more')} style={styles.navigationItem}>
        <Ionicons color="#7A8AA1" name="settings-outline" size={29} />
        <Text style={styles.navigationLabel}>Settings</Text>
      </Pressable>
    </View>
  );
}

export default function AgencyHomeScreen() {
  const [filter, setFilter] = useState<RequestFilter>('New');

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.agencyAvatar}><Text style={styles.agencyAvatarText}>GT</Text></View>
          <View style={styles.agencyCopy}>
            <Text style={styles.agencyName}>Guruvayur Travels</Text>
            <Text style={styles.agencyMeta}>Thrissur, Kerala · Agency ID GT-0831</Text>
          </View>
          <Pressable accessibilityLabel="Notifications" onPress={() => Alert.alert('Notifications', 'You are all caught up.')} style={styles.headerButton}>
            <Ionicons color="#07163A" name="notifications-outline" size={25} />
            <View style={styles.notificationDot} />
          </Pressable>
          <View style={styles.userAvatar}><Text style={styles.userAvatarText}>GT</Text></View>
          <Ionicons color="#667A96" name="chevron-down" size={21} />
        </View>

        <View style={styles.earningsCard}>
          <View style={styles.earningsCopy}>
            <Text style={styles.earningsTitle}>Total Earnings</Text>
            <Text style={styles.earningsValue}>₹48,650</Text>
            <View style={styles.growthRow}>
              <Ionicons color="#0CAF66" name="arrow-up" size={16} />
              <Text style={styles.growthText}>12%</Text>
              <Text style={styles.growthDescription}>vs last month</Text>
            </View>
          </View>
          <View style={styles.chartArea}>
            <View style={styles.periodSelector}>
              <View style={styles.activePeriod}><Text style={styles.activePeriodText}>Week</Text></View>
              <Text style={styles.periodText}>Month</Text>
              <Text style={styles.periodText}>Year</Text>
            </View>
            <View style={styles.bars}>
              {[46, 35, 68, 46, 22, 57, 78].map((height, index) => (
                <View key={index} style={styles.barColumn}>
                  <View style={[styles.bar, { height, opacity: index === 6 ? 1 : 0.46 }]} />
                  <Text style={styles.dayLabel}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <MetricCard color="#EEF5FF" icon="document-text-outline" label="New Requests" value="12" />
          <MetricCard color="#FFF8E8" icon="time-outline" label="In Progress" value="5" />
          <MetricCard color="#EAFBF1" icon="checkmark-circle" label="Completed" value="28" />
          <MetricCard color="#FFF0F2" icon="close-circle" label="Rejected" value="3" />
        </View>

        <View style={styles.filterRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroller}>
            {requestFilters.map((item) => (
              <Pressable key={item} onPress={() => setFilter(item)} style={[styles.filterButton, filter === item && styles.filterButtonActive]}>
                <Text style={[styles.filterLabel, filter === item && styles.filterLabelActive]}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
          <Pressable accessibilityLabel="Search requests" style={styles.utilityButton}><Ionicons color="#061638" name="search-outline" size={25} /></Pressable>
          <Pressable accessibilityLabel="Filter requests" style={styles.utilityButton}><Ionicons color="#061638" name="filter-outline" size={24} /></Pressable>
        </View>

        <View style={styles.requestList}>{requests.map((request) => <RequestCard key={request.trip} request={request} />)}</View>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFFFF', flex: 1 },
  scrollContent: { paddingBottom: 20, paddingHorizontal: 18, paddingTop: 10 },
  header: { alignItems: 'center', flexDirection: 'row', minHeight: 63 },
  agencyAvatar: { alignItems: 'center', backgroundColor: '#236BF0', borderRadius: 28, height: 54, justifyContent: 'center', width: 54 },
  agencyAvatarText: { color: '#FFFFFF', fontSize: 20, fontWeight: '700' },
  agencyCopy: { flex: 1, marginLeft: 11 },
  agencyName: { color: '#06133A', fontSize: 19, fontWeight: '800', letterSpacing: -0.5 },
  agencyMeta: { color: '#607493', fontSize: 12, marginTop: 3 },
  headerButton: { alignItems: 'center', backgroundColor: '#F4F7FB', borderRadius: 25, height: 50, justifyContent: 'center', position: 'relative', width: 50 },
  notificationDot: { backgroundColor: '#F22645', borderColor: '#FFFFFF', borderRadius: 6, borderWidth: 1, height: 11, position: 'absolute', right: 8, top: 7, width: 11 },
  userAvatar: { alignItems: 'center', backgroundColor: '#236BF0', borderRadius: 22, height: 45, justifyContent: 'center', marginLeft: 10, marginRight: 9, width: 45 },
  userAvatarText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  earningsCard: { backgroundColor: '#EDF5FF', borderRadius: 19, flexDirection: 'row', height: 177, marginTop: 13, overflow: 'hidden', padding: 16 },
  earningsCopy: { paddingTop: 3, width: '43%' },
  earningsTitle: { color: '#405879', fontSize: 15, fontWeight: '700' },
  earningsValue: { color: '#06133A', fontSize: 30, fontWeight: '800', letterSpacing: -1, marginTop: 12 },
  growthRow: { alignItems: 'center', flexDirection: 'row', marginTop: 10 },
  growthText: { color: '#0BAF68', fontSize: 13, fontWeight: '700', marginLeft: 3 },
  growthDescription: { color: '#526988', fontSize: 12, marginLeft: 13 },
  chartArea: { flex: 1 },
  periodSelector: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.67)', borderRadius: 14, flexDirection: 'row', height: 42, justifyContent: 'space-around' },
  activePeriod: { alignItems: 'center', backgroundColor: '#2266E9', borderRadius: 13, height: '100%', justifyContent: 'center', width: 60 },
  activePeriodText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  periodText: { color: '#435B7D', fontSize: 12, fontWeight: '600' },
  bars: { alignItems: 'flex-end', flexDirection: 'row', height: 102, justifyContent: 'space-between', paddingHorizontal: 4, paddingTop: 15 },
  barColumn: { alignItems: 'center', height: 88, justifyContent: 'flex-end' },
  bar: { backgroundColor: '#2A6BEA', borderRadius: 5, width: 16 },
  dayLabel: { color: '#526987', fontSize: 9, marginTop: 6 },
  metricsRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
  metricCard: { borderRadius: 16, flex: 1, height: 126, padding: 11 },
  metricIcon: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.46)', borderRadius: 15, height: 32, justifyContent: 'center', width: 32 },
  metricValue: { color: '#07133A', fontSize: 24, fontWeight: '800', marginTop: 10 },
  metricLabel: { color: '#4B6281', fontSize: 11, fontWeight: '500', marginTop: 3 },
  filterRow: { alignItems: 'center', flexDirection: 'row', marginTop: 18 },
  filterScroller: { flex: 1 },
  filterButton: { alignItems: 'center', backgroundColor: '#F4F7FB', borderRadius: 25, height: 47, justifyContent: 'center', marginRight: 7, paddingHorizontal: 19 },
  filterButtonActive: { backgroundColor: '#236BF0' },
  filterLabel: { color: '#405878', fontSize: 12, fontWeight: '700' },
  filterLabelActive: { color: '#FFFFFF' },
  utilityButton: { alignItems: 'center', backgroundColor: '#F4F7FB', borderRadius: 17, height: 47, justifyContent: 'center', marginLeft: 7, width: 47 },
  requestList: { gap: 10, marginTop: 12 },
  requestCard: { borderColor: '#E1E7F0', borderRadius: 17, borderWidth: 1, flexDirection: 'row', minHeight: 124, padding: 14 },
  initials: { alignItems: 'center', borderRadius: 25, height: 50, justifyContent: 'center', width: 50 },
  initialsText: { fontSize: 17, fontWeight: '700' },
  requestBody: { flex: 1, marginLeft: 11 },
  requestName: { color: '#08143A', fontSize: 16, fontWeight: '800' },
  requestMeta: { color: '#667B99', fontSize: 12, marginTop: 3 },
  routeRow: { alignItems: 'center', flexDirection: 'row', marginTop: 7 },
  pickupDot: { backgroundColor: '#2169E8', borderRadius: 5, height: 10, marginRight: 11, width: 10 },
  dropoffDot: { backgroundColor: '#FF4055', borderRadius: 5, height: 10, marginRight: 11, width: 10 },
  routeText: { color: '#101C41', fontSize: 13, fontWeight: '600' },
  vehicleBadge: { alignSelf: 'flex-start', backgroundColor: '#F1F4F8', borderRadius: 10, marginTop: 7, paddingHorizontal: 10, paddingVertical: 3 },
  vehicleLabel: { color: '#536985', fontSize: 10, fontWeight: '600' },
  requestRight: { alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: 2 },
  newBadge: { alignItems: 'center', backgroundColor: '#EAF1FF', borderRadius: 18, justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 7 },
  newBadgeText: { color: '#2169E8', fontSize: 11, fontWeight: '800' },
  navigation: { alignItems: 'center', backgroundColor: '#FFFFFF', borderTopColor: '#E3E7ED', borderTopWidth: 1, flexDirection: 'row', height: 78, justifyContent: 'space-around', paddingHorizontal: 13 },
  navigationItem: { alignItems: 'center', gap: 3, justifyContent: 'center', minWidth: 56 },
  navigationLabel: { color: '#71829B', fontSize: 11, fontWeight: '600' },
  navigationLabelSelected: { color: '#1D67EE', fontWeight: '800' },
  pressed: { opacity: 0.82 },
});

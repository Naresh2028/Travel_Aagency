import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AgencyBottomNavigation } from '@/components/agency/AgencyBottomNavigation';
import { AgencyVehicle, useAgencyData } from '@/providers/AgencyDataProvider';

const filters = ['All', 'Two-wheeler', 'Three-wheeler', 'Four-wheeler'] as const;
type Filter = typeof filters[number];

function VehicleCard({ vehicle, onPress }: { vehicle: AgencyVehicle; onPress: () => void }) {
  const statusStyle = vehicle.status === 'Available' ? styles.available : vehicle.status === 'On trip' ? styles.onTrip : styles.service;
  const statusLabelStyle = vehicle.status === 'Available' ? styles.availableLabel : vehicle.status === 'On trip' ? styles.onTripLabel : styles.serviceLabel;
  return <Pressable accessibilityRole="button" accessibilityLabel={`View or edit ${vehicle.registration}`} onPress={onPress} style={({ pressed }) => [styles.vehicleCard, pressed && styles.cardPressed]}>
    <View style={styles.vehicleIcon}><Ionicons color="#286CE1" name={vehicle.type === 'Van' ? 'bus' : 'car-sport'} size={23} /></View><View style={styles.vehicleInfo}><Text style={styles.registration}>{vehicle.registration}</Text><Text style={styles.vehicleDescription}>{vehicle.type} · {vehicle.category}</Text></View><View style={[styles.statusPill, statusStyle]}><Text style={[styles.statusLabel, statusLabelStyle]}>{vehicle.status.toUpperCase()}</Text></View>
  </Pressable>;
}

export default function VehicleListScreen() {
  const { drivers, removeVehicle, vehicles } = useAgencyData();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('All');
  const filteredVehicles = useMemo(() => {
    const query = search.trim().toLowerCase();
    return vehicles.filter((vehicle) => (filter === 'All' || vehicle.category === filter) && (!query || `${vehicle.registration} ${vehicle.type} ${vehicle.category}`.toLowerCase().includes(query)));
  }, [filter, search, vehicles]);
  const openActions = (vehicle: AgencyVehicle) => Alert.alert(vehicle.registration, `${vehicle.type} · ${vehicle.category}\nStatus: ${vehicle.status}`, [
    { text: 'Edit', onPress: () => router.push({ pathname: './add-vehicle', params: { id: vehicle.id } }) },
    { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Delete vehicle?', `${vehicle.registration} will be removed from your fleet.`, [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: () => removeVehicle(vehicle.id) }]) },
    { text: 'Cancel', style: 'cancel' },
  ]);
  return <SafeAreaView edges={['bottom']} style={styles.safeArea}>
    <StatusBar style="dark" />
    <View style={styles.heading}><Text style={styles.headingTitle}>Fleet</Text><Text style={styles.headingSubtitle}>{vehicles.length} vehicles · {drivers.length} drivers</Text></View>
    <View style={styles.tabs}><Pressable accessibilityRole="tab" accessibilityState={{ selected: true }} style={[styles.tab, styles.selectedTab]}><Text style={[styles.tabLabel, styles.selectedTabLabel]}>Vehicles</Text></Pressable><Pressable accessibilityRole="tab" accessibilityState={{ selected: false }} onPress={() => router.replace('./driver-list')} style={styles.tab}><Text style={styles.tabLabel}>Drivers</Text></Pressable></View>
    <View style={styles.listArea}><View style={styles.searchBox}><Ionicons color="#46596D" name="search" size={23} /><TextInput accessibilityLabel="Search vehicles" autoCapitalize="characters" onChangeText={setSearch} placeholder="Search vehicles..." placeholderTextColor="#9AA6B5" style={styles.searchInput} value={search} /></View><View style={styles.filtersArea}><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterList}>{filters.map((item) => <Pressable key={item} accessibilityRole="button" accessibilityState={{ selected: filter === item }} onPress={() => setFilter(item)} style={({ pressed }) => [styles.filterPill, filter === item && styles.selectedFilter, pressed && styles.cardPressed]}><Text style={[styles.filterLabel, filter === item && styles.selectedFilterLabel]}>{item}</Text></Pressable>)}</ScrollView></View><FlatList contentContainerStyle={styles.listContent} data={filteredVehicles} keyExtractor={(vehicle) => vehicle.id} ListEmptyComponent={<Text style={styles.emptyLabel}>No vehicles found</Text>} renderItem={({ item }) => <VehicleCard vehicle={item} onPress={() => openActions(item)} />} showsVerticalScrollIndicator={false} /></View>
    <Pressable accessibilityRole="button" accessibilityLabel="Add vehicle" onPress={() => router.push('./add-vehicle')} style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}><Ionicons color="#FFFFFF" name="add" size={33} /></Pressable>
    <AgencyBottomNavigation activeTab="fleet" />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8F9FB', flex: 1 }, heading: { backgroundColor: '#FFFFFF', borderBottomColor: '#E8EBEF', borderBottomWidth: 1, height: 94, justifyContent: 'center', paddingHorizontal: 27 }, headingTitle: { color: '#151B2A', fontSize: 25, fontWeight: '700', letterSpacing: -0.45, lineHeight: 30 }, headingSubtitle: { color: '#687583', fontSize: 15, lineHeight: 20, marginTop: 1 },
  tabs: { backgroundColor: '#F8F9FB', borderBottomColor: '#E4E8ED', borderBottomWidth: 1, flexDirection: 'row', height: 56, paddingHorizontal: 20 }, tab: { alignItems: 'center', flex: 1, justifyContent: 'center' }, selectedTab: { borderBottomColor: '#286CE1', borderBottomWidth: 2.5 }, tabLabel: { color: '#738092', fontSize: 16, fontWeight: '600' }, selectedTabLabel: { color: '#286CE1' },
  listArea: { flex: 1, paddingTop: 17 }, searchBox: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#DFE4EA', borderRadius: 12, borderWidth: 1, flexDirection: 'row', height: 51, marginHorizontal: 25, paddingHorizontal: 16 }, searchInput: { color: '#172030', flex: 1, fontSize: 16, height: '100%', marginLeft: 12, padding: 0 }, filtersArea: { height: 52, marginTop: 14 }, filterList: { gap: 10, paddingHorizontal: 25 }, filterPill: { alignItems: 'center', backgroundColor: '#F0F3F7', borderRadius: 20, height: 38, justifyContent: 'center', paddingHorizontal: 15 }, selectedFilter: { backgroundColor: '#286CE1' }, filterLabel: { color: '#536172', fontSize: 14, fontWeight: '600' }, selectedFilterLabel: { color: '#FFFFFF' },
  listContent: { gap: 12, paddingBottom: 26, paddingHorizontal: 25, paddingTop: 1 }, vehicleCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E0E5EA', borderRadius: 14, borderWidth: 1, flexDirection: 'row', height: 84, paddingHorizontal: 17 }, cardPressed: { opacity: 0.8 }, vehicleIcon: { alignItems: 'center', backgroundColor: '#F0F6FF', borderRadius: 24, height: 48, justifyContent: 'center', width: 48 }, vehicleInfo: { flex: 1, marginLeft: 14 }, registration: { color: '#192131', fontSize: 17, fontWeight: '700', letterSpacing: -0.2 }, vehicleDescription: { color: '#768494', fontSize: 14, marginTop: 6 }, statusPill: { alignItems: 'center', borderRadius: 16, justifyContent: 'center', minHeight: 29, paddingHorizontal: 10 }, statusLabel: { fontSize: 12, fontWeight: '700' }, available: { backgroundColor: '#D9F8E8' }, availableLabel: { color: '#197553' }, onTrip: { backgroundColor: '#FFF0C8' }, onTripLabel: { color: '#A16519' }, service: { backgroundColor: '#F0F2F5' }, serviceLabel: { color: '#6F7C8C' },
  addButton: { alignItems: 'center', backgroundColor: '#286CE1', borderRadius: 31, bottom: 96, elevation: 4, height: 62, justifyContent: 'center', position: 'absolute', right: 21, shadowColor: '#16498F', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.22, shadowRadius: 7, width: 62, zIndex: 2 }, addButtonPressed: { opacity: 0.84, transform: [{ scale: 0.96 }] }, emptyLabel: { color: '#758293', fontSize: 15, paddingTop: 22, textAlign: 'center' },
});

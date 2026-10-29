import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AgencyBottomNavigation } from '@/components/agency/AgencyBottomNavigation';
import { AgencyDriver, useAgencyData } from '@/providers/AgencyDataProvider';

function DriverCard({ driver, onPress, onToggle }: { driver: AgencyDriver; onPress: () => void; onToggle: (value: boolean) => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={`View or edit ${driver.name}`} onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
    <View style={styles.cardTop}><View style={styles.avatar}><Text style={styles.avatarText}>{driver.initials}</Text></View><View style={styles.driverInfo}><View style={styles.nameRow}><Text numberOfLines={1} style={styles.driverName}>{driver.name}</Text><View style={styles.genderPill}><Text style={styles.genderLabel}>{driver.gender.toUpperCase()}</Text></View></View><Text style={styles.phone}>{driver.phone}</Text></View><Ionicons color="#98A6B6" name="chevron-forward" size={22} /></View>
    <View style={styles.cardDivider} />
    <View style={styles.cardBottom}><View style={styles.vehiclePills}>{driver.vehicles.map((vehicle) => <View key={vehicle} style={styles.vehiclePill}><Text style={styles.vehicleLabel}>{vehicle}</Text></View>)}</View><Switch accessibilityLabel={`${driver.enabled ? 'Disable' : 'Enable'} ${driver.name}`} ios_backgroundColor="#C7D2E0" onValueChange={onToggle} thumbColor="#FFFFFF" trackColor={{ false: '#C7D2E0', true: '#286CE1' }} value={driver.enabled} /></View>
  </Pressable>;
}

export default function DriverListScreen() {
  const { drivers, removeDriver, setDriverEnabled, vehicles } = useAgencyData();
  const [search, setSearch] = useState('');
  const filteredDrivers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? drivers.filter((driver) => `${driver.name} ${driver.phone} ${driver.vehicles.join(' ')}`.toLowerCase().includes(query)) : drivers;
  }, [drivers, search]);
  const openActions = (driver: AgencyDriver) => Alert.alert(driver.name, `${driver.phone}\n${driver.email}\nCan drive: ${driver.vehicles.join(', ')}`, [
    { text: 'Edit', onPress: () => router.push({ pathname: './add-driver', params: { id: driver.id } }) },
    { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Delete driver?', `${driver.name} will be removed from your fleet.`, [{ text: 'Cancel', style: 'cancel' }, { text: 'Delete', style: 'destructive', onPress: () => removeDriver(driver.id) }]) },
    { text: 'Cancel', style: 'cancel' },
  ]);

  return <SafeAreaView edges={['bottom']} style={styles.safeArea}>
    <StatusBar style="dark" />
    <View style={styles.heading}><Text style={styles.headingTitle}>Fleet</Text><Text style={styles.headingSubtitle}>{vehicles.length} vehicles · {drivers.length} drivers</Text></View>
    <View style={styles.tabs}><Pressable accessibilityRole="tab" accessibilityState={{ selected: false }} onPress={() => router.replace('./vehicle-list')} style={styles.tab}><Text style={styles.tabLabel}>Vehicles</Text></Pressable><Pressable accessibilityRole="tab" accessibilityState={{ selected: true }} style={[styles.tab, styles.selectedTab]}><Text style={[styles.tabLabel, styles.selectedTabLabel]}>Drivers</Text></Pressable></View>
    <View style={styles.listArea}><View style={styles.searchBox}><Ionicons color="#46596D" name="search" size={23} /><TextInput accessibilityLabel="Search drivers" autoCapitalize="none" onChangeText={setSearch} placeholder="Search drivers..." placeholderTextColor="#9AA6B5" style={styles.searchInput} value={search} /></View><FlatList contentContainerStyle={styles.listContent} data={filteredDrivers} keyExtractor={(driver) => driver.id} ListEmptyComponent={<Text style={styles.emptyLabel}>No drivers found</Text>} renderItem={({ item }) => <DriverCard driver={item} onPress={() => openActions(item)} onToggle={(enabled) => setDriverEnabled(item.id, enabled)} />} showsVerticalScrollIndicator={false} /></View>
    <Pressable accessibilityRole="button" accessibilityLabel="Add driver" onPress={() => router.push('./add-driver')} style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}><Ionicons color="#FFFFFF" name="add" size={33} /></Pressable>
    <AgencyBottomNavigation activeTab="fleet" />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8F9FB', flex: 1 }, heading: { backgroundColor: '#FFFFFF', borderBottomColor: '#E8EBEF', borderBottomWidth: 1, height: 94, justifyContent: 'center', paddingHorizontal: 27 }, headingTitle: { color: '#151B2A', fontSize: 25, fontWeight: '700', letterSpacing: -0.45, lineHeight: 30 }, headingSubtitle: { color: '#687583', fontSize: 15, lineHeight: 20, marginTop: 1 },
  tabs: { backgroundColor: '#F8F9FB', borderBottomColor: '#E4E8ED', borderBottomWidth: 1, flexDirection: 'row', height: 56, paddingHorizontal: 20 }, tab: { alignItems: 'center', flex: 1, justifyContent: 'center' }, selectedTab: { borderBottomColor: '#286CE1', borderBottomWidth: 2.5 }, tabLabel: { color: '#738092', fontSize: 16, fontWeight: '600' }, selectedTabLabel: { color: '#286CE1' },
  listArea: { flex: 1, paddingHorizontal: 27, paddingTop: 17 }, searchBox: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#DFE4EA', borderRadius: 12, borderWidth: 1, flexDirection: 'row', height: 51, paddingHorizontal: 16 }, searchInput: { color: '#172030', flex: 1, fontSize: 16, height: '100%', marginLeft: 12, padding: 0 }, listContent: { gap: 12, paddingBottom: 26, paddingTop: 17 },
  card: { backgroundColor: '#FFFFFF', borderColor: '#E0E5EA', borderRadius: 14, borderWidth: 1, height: 135, paddingHorizontal: 16, paddingTop: 16 }, cardPressed: { opacity: 0.82 }, cardTop: { alignItems: 'center', flexDirection: 'row' }, avatar: { alignItems: 'center', backgroundColor: '#F1F4F8', borderRadius: 24, height: 48, justifyContent: 'center', width: 48 }, avatarText: { color: '#536172', fontSize: 14, fontWeight: '700' }, driverInfo: { flex: 1, marginLeft: 12 }, nameRow: { alignItems: 'center', flexDirection: 'row', gap: 8 }, driverName: { color: '#192131', fontSize: 16, fontWeight: '700', maxWidth: 116 }, genderPill: { backgroundColor: '#F0F3F7', borderRadius: 10, paddingHorizontal: 7, paddingVertical: 3 }, genderLabel: { color: '#778495', fontSize: 10, fontWeight: '500' }, phone: { color: '#758293', fontSize: 14, marginTop: 5 }, cardDivider: { backgroundColor: '#EDF0F3', height: 1, marginTop: 13 }, cardBottom: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }, vehiclePills: { flexDirection: 'row', gap: 7 }, vehiclePill: { backgroundColor: '#F1F6FF', borderRadius: 13, paddingHorizontal: 9, paddingVertical: 5 }, vehicleLabel: { color: '#4B84D9', fontSize: 12, fontWeight: '500' },
  addButton: { alignItems: 'center', backgroundColor: '#286CE1', borderRadius: 31, bottom: 96, elevation: 4, height: 62, justifyContent: 'center', position: 'absolute', right: 21, shadowColor: '#16498F', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.22, shadowRadius: 7, width: 62, zIndex: 2 }, addButtonPressed: { opacity: 0.84, transform: [{ scale: 0.96 }] }, emptyLabel: { color: '#758293', fontSize: 15, paddingTop: 32, textAlign: 'center' },
});

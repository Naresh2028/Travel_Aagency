import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DriverVehicleType, VehicleCategory, VehicleStatus, useAgencyData } from '@/providers/AgencyDataProvider';

const categories: VehicleCategory[] = ['Two-wheeler', 'Three-wheeler', 'Four-wheeler'];
const vehicleTypes: Record<VehicleCategory, DriverVehicleType[]> = { 'Two-wheeler': ['Scooter', 'Motorbike'], 'Three-wheeler': ['Auto'], 'Four-wheeler': ['Cab', 'Car', 'Van'] };
const statuses: VehicleStatus[] = ['Available', 'On trip', 'Service'];

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={({ pressed }) => [styles.chip, selected && styles.selectedControl, pressed && styles.controlPressed]}><Text style={[styles.chipLabel, selected && styles.selectedLabel]}>{label}</Text></Pressable>;
}

export default function AddVehicleScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { addVehicle, updateVehicle, vehicles } = useAgencyData();
  const existingVehicle = vehicles.find((vehicle) => vehicle.id === id);
  const [category, setCategory] = useState<VehicleCategory>(() => existingVehicle?.category ?? 'Two-wheeler');
  const [vehicleType, setVehicleType] = useState<DriverVehicleType>(() => existingVehicle?.type ?? 'Scooter');
  const [registrationNumber, setRegistrationNumber] = useState(() => existingVehicle?.registration ?? '');
  const [status, setStatus] = useState<VehicleStatus>(() => existingVehicle?.status ?? 'Available');
  const canSubmit = useMemo(() => Boolean(registrationNumber.trim() && vehicleType), [registrationNumber, vehicleType]);
  const selectCategory = (nextCategory: VehicleCategory) => { setCategory(nextCategory); setVehicleType(vehicleTypes[nextCategory][0]); };
  const submit = () => {
    if (!canSubmit) return;
    const vehicle = { category, type: vehicleType, registration: registrationNumber.trim().toUpperCase(), status };
    if (existingVehicle) updateVehicle(existingVehicle.id, vehicle); else addVehicle(vehicle);
    router.back();
  };
  const editing = Boolean(existingVehicle);
  return <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
    <StatusBar style="dark" />
    <View style={styles.header}><Pressable accessibilityRole="button" accessibilityLabel="Go back" hitSlop={10} onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && styles.controlPressed]}><Ionicons color="#252D39" name="chevron-back" size={26} /></Pressable><View><Text style={styles.title}>{editing ? 'Edit Vehicle' : 'Add Vehicle'}</Text><Text style={styles.subtitle}>Fleet registration</Text></View></View>
    <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <View><Text style={styles.label}>Vehicle category</Text><View style={styles.categoryList}>{categories.map((item) => <Chip key={item} label={item} selected={category === item} onPress={() => selectCategory(item)} />)}</View></View>
      <View style={styles.typeSection}><Text style={styles.label}>Vehicle type</Text><View style={styles.typeList}>{vehicleTypes[category].map((item) => <Chip key={item} label={item} selected={vehicleType === item} onPress={() => setVehicleType(item)} />)}</View></View>
      <View style={styles.registrationSection}><Text style={styles.label}>Registration number</Text><TextInput accessibilityLabel="Vehicle registration number" autoCapitalize="characters" onChangeText={setRegistrationNumber} placeholder="KL-08-AB-1234" placeholderTextColor="#969BA3" style={styles.input} value={registrationNumber} /></View>
      <View style={styles.statusSection}><Text style={styles.label}>Vehicle status</Text><View style={styles.typeList}>{statuses.map((item) => <Chip key={item} label={item} selected={status === item} onPress={() => setStatus(item)} />)}</View></View>
    </ScrollView>
    <View style={styles.footer}><Pressable accessibilityRole="button" accessibilityState={{ disabled: !canSubmit }} disabled={!canSubmit} onPress={submit} style={({ pressed }) => [styles.submitButton, canSubmit && styles.submitButtonReady, pressed && canSubmit && styles.controlPressed]}><Text style={styles.submitLabel}>Save vehicle</Text></Pressable></View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8F9FB', flex: 1 }, header: { alignItems: 'center', backgroundColor: '#FFFFFF', borderBottomColor: '#E7E9EC', borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: 15, height: 72, paddingHorizontal: 23 }, backButton: { alignItems: 'center', backgroundColor: '#F2F4F7', borderRadius: 22, height: 44, justifyContent: 'center', width: 44 }, title: { color: '#151B2A', fontSize: 25, fontWeight: '700', letterSpacing: -0.45, lineHeight: 29 }, subtitle: { color: '#69717E', fontSize: 14, lineHeight: 20, marginTop: 2 },
  form: { flexGrow: 1, paddingHorizontal: 23, paddingTop: 24 }, label: { color: '#475361', fontSize: 16, fontWeight: '600', lineHeight: 21, marginBottom: 10 }, categoryList: { gap: 9 }, chip: { alignItems: 'center', backgroundColor: '#F1F3F7', borderRadius: 21, height: 38, justifyContent: 'center', paddingHorizontal: 16 }, chipLabel: { color: '#4E5C6B', fontSize: 14, fontWeight: '600' }, selectedControl: { backgroundColor: '#286CE1' }, selectedLabel: { color: '#FFFFFF' }, controlPressed: { opacity: 0.78 }, typeSection: { marginTop: 23 }, typeList: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, registrationSection: { marginTop: 23 }, statusSection: { marginTop: 23 }, input: { backgroundColor: '#FFFFFF', borderColor: '#CDD1D7', borderRadius: 11, borderWidth: 1, color: '#1B2330', fontSize: 16, height: 54, paddingHorizontal: 16 }, footer: { backgroundColor: '#FFFFFF', borderTopColor: '#E1E4E8', borderTopWidth: 1, paddingHorizontal: 19, paddingTop: 18 }, submitButton: { alignItems: 'center', backgroundColor: '#9DAEC3', borderRadius: 11, height: 57, justifyContent: 'center' }, submitButtonReady: { backgroundColor: '#286CE1' }, submitLabel: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});

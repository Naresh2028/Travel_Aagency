import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DriverGender, DriverVehicleType, useAgencyData } from '@/providers/AgencyDataProvider';

const vehicleTypes: DriverVehicleType[] = ['Scooter', 'Motorbike', 'Auto', 'Cab', 'Car', 'Van'];

function ChoiceChip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected }} onPress={onPress} style={({ pressed }) => [styles.chip, selected && styles.chipSelected, pressed && styles.chipPressed]}><Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>{label}</Text></Pressable>;
}

export default function AddDriverScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { addDriver, drivers, updateDriver } = useAgencyData();
  const existingDriver = drivers.find((driver) => driver.id === id);
  const [fullName, setFullName] = useState(() => existingDriver?.name ?? '');
  const [mobileNumber, setMobileNumber] = useState(() => existingDriver?.phone ?? '');
  const [email, setEmail] = useState(() => existingDriver?.email ?? '');
  const [gender, setGender] = useState<DriverGender>(() => existingDriver?.gender ?? 'Male');
  const [vehicles, setVehicles] = useState<DriverVehicleType[]>(() => existingDriver?.vehicles ?? ['Cab']);
  const canSubmit = useMemo(() => Boolean(fullName.trim() && mobileNumber.trim() && email.trim() && vehicles.length), [email, fullName, mobileNumber, vehicles.length]);
  const toggleVehicle = (vehicle: DriverVehicleType) => setVehicles((current) => current.includes(vehicle) ? current.filter((item) => item !== vehicle) : [...current, vehicle]);
  const submit = () => {
    if (!canSubmit) return;
    const driver = { name: fullName.trim(), phone: mobileNumber.trim(), email: email.trim(), gender, vehicles };
    if (existingDriver) updateDriver(existingDriver.id, driver); else addDriver(driver);
    router.back();
  };
  const editing = Boolean(existingDriver);
  return <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
    <StatusBar style="dark" />
    <View style={styles.header}><Pressable accessibilityRole="button" accessibilityLabel="Go back" hitSlop={10} onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}><Ionicons color="#252D39" name="chevron-back" size={26} /></Pressable><View><Text style={styles.title}>{editing ? 'Edit Driver' : 'Add Driver'}</Text><Text style={styles.subtitle}>Driver details and skills</Text></View></View>
    <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <View style={styles.fieldGroup}><Text style={styles.label}>Full name</Text><TextInput accessibilityLabel="Driver full name" autoCapitalize="words" onChangeText={setFullName} placeholder="Enter driver's name" placeholderTextColor="#969BA3" style={styles.input} value={fullName} /></View>
      <View style={styles.fieldGroup}><Text style={styles.label}>Mobile number</Text><TextInput accessibilityLabel="Driver mobile number" keyboardType="phone-pad" onChangeText={setMobileNumber} placeholder="+91 98765 43210" placeholderTextColor="#969BA3" style={styles.input} value={mobileNumber} /></View>
      <View style={styles.fieldGroup}><Text style={styles.label}>Email address</Text><TextInput accessibilityLabel="Driver email address" autoCapitalize="none" autoCorrect={false} keyboardType="email-address" onChangeText={setEmail} placeholder="driver@example.com" placeholderTextColor="#969BA3" style={styles.input} value={email} /></View>
      <View style={styles.selectionGroup}><Text style={styles.label}>Gender</Text><View style={styles.chipRow}>{(['Male', 'Female'] as DriverGender[]).map((option) => <ChoiceChip key={option} label={option} selected={gender === option} onPress={() => setGender(option)} />)}</View></View>
      <View style={styles.vehicleGroup}><Text style={styles.label}>Vehicle types this driver can drive</Text><View style={styles.vehicleChips}>{vehicleTypes.map((vehicle) => <ChoiceChip key={vehicle} label={vehicle} selected={vehicles.includes(vehicle)} onPress={() => toggleVehicle(vehicle)} />)}</View></View>
    </ScrollView>
    <View style={styles.footer}><Pressable accessibilityRole="button" accessibilityState={{ disabled: !canSubmit }} disabled={!canSubmit} onPress={submit} style={({ pressed }) => [styles.submitButton, canSubmit && styles.submitButtonReady, pressed && canSubmit && styles.submitButtonPressed]}><Text style={styles.submitLabel}>{editing ? 'Save driver' : 'Save driver'}</Text></Pressable></View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8F9FB', flex: 1 }, header: { alignItems: 'center', backgroundColor: '#FFFFFF', borderBottomColor: '#E7E9EC', borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: 15, height: 72, paddingHorizontal: 23 }, backButton: { alignItems: 'center', backgroundColor: '#F2F4F7', borderRadius: 22, height: 44, justifyContent: 'center', width: 44 }, backButtonPressed: { opacity: 0.7 }, title: { color: '#151B2A', fontSize: 25, fontWeight: '700', letterSpacing: -0.45, lineHeight: 29 }, subtitle: { color: '#69717E', fontSize: 14, lineHeight: 20, marginTop: 2 },
  form: { flexGrow: 1, paddingHorizontal: 23, paddingTop: 24 }, fieldGroup: { marginBottom: 20 }, label: { color: '#475361', fontSize: 16, fontWeight: '600', lineHeight: 21, marginBottom: 9 }, input: { backgroundColor: '#FFFFFF', borderColor: '#CDD1D7', borderRadius: 11, borderWidth: 1, color: '#1B2330', fontSize: 16, height: 54, paddingHorizontal: 16 }, selectionGroup: { marginTop: 2 }, chipRow: { flexDirection: 'row', gap: 10 }, vehicleGroup: { marginTop: 23 }, vehicleChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, rowGap: 10 }, chip: { alignItems: 'center', backgroundColor: '#F1F3F7', borderRadius: 21, justifyContent: 'center', minHeight: 38, paddingHorizontal: 16 }, chipSelected: { backgroundColor: '#286CE1' }, chipPressed: { opacity: 0.78 }, chipLabel: { color: '#4E5C6B', fontSize: 14, fontWeight: '600' }, chipLabelSelected: { color: '#FFFFFF' },
  footer: { backgroundColor: '#FFFFFF', borderTopColor: '#E1E4E8', borderTopWidth: 1, paddingHorizontal: 19, paddingTop: 18 }, submitButton: { alignItems: 'center', backgroundColor: '#9DAEC3', borderRadius: 11, height: 57, justifyContent: 'center' }, submitButtonReady: { backgroundColor: '#286CE1' }, submitButtonPressed: { opacity: 0.84 }, submitLabel: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});

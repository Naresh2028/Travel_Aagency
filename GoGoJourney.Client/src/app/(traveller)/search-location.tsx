import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const pickupOptions = ['Thrissur, Kerala', 'Thrissur Railway Station'];
const dropoffOptions = ['Guruvayur, Kerala', 'Guruvayur Temple'];
const departureTimes = ['Today, 14:30', 'Tomorrow, 09:00'];

function LocationField({ address, iconColor, label, onPress }: { address: string; iconColor: string; label: string; onPress: () => void }) {
  return (
    <Pressable accessibilityLabel={`Change ${label.toLowerCase()}`} accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.locationField, pressed && styles.pressed]}>
      <Ionicons color={iconColor} name="location-outline" size={18} />
      <Text numberOfLines={1} style={styles.locationText}>{address}</Text>
    </Pressable>
  );
}

export default function SearchLocationScreen() {
  const [passengers, setPassengers] = useState(2);
  const [pickupIndex, setPickupIndex] = useState(0);
  const [dropoffIndex, setDropoffIndex] = useState(0);
  const [departureIndex, setDepartureIndex] = useState(0);
  const pickup = pickupOptions[pickupIndex];
  const dropoff = dropoffOptions[dropoffIndex];
  const departureTime = departureTimes[departureIndex];
  const estimatedFare = 720 + Math.max(0, passengers - 2) * 120;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable accessibilityLabel="Go back" hitSlop={8} onPress={() => router.back()} style={styles.backButton}>
          <Ionicons color="#4F6581" name="chevron-back" size={20} />
        </Pressable>
        <View>
          <Text style={styles.title}>Request a Trip</Text>
          <Text style={styles.subtitle}>Enter details to calculate dispatch fares</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.fieldLabel}>PICKUP ADDRESS</Text>
        <LocationField address={pickup} iconColor="#2669FF" label="Pickup address" onPress={() => setPickupIndex((current) => (current + 1) % pickupOptions.length)} />

        <Text style={[styles.fieldLabel, styles.nextLabel]}>DROPOFF ADDRESS</Text>
        <LocationField address={dropoff} iconColor="#FF4E54" label="Dropoff address" onPress={() => setDropoffIndex((current) => (current + 1) % dropoffOptions.length)} />

        <View style={styles.detailsLabels}>
          <Text style={styles.fieldLabel}>DATE &amp; TIME</Text>
          <Text style={styles.fieldLabel}>PASSENGERS</Text>
        </View>
        <View style={styles.detailsRow}>
          <Pressable accessibilityRole="button" onPress={() => setDepartureIndex((current) => (current + 1) % departureTimes.length)} style={({ pressed }) => [styles.dateField, pressed && styles.pressed]}>
            <Ionicons color="#7A8FAE" name="calendar-outline" size={15} />
            <Text style={styles.dateText}>{departureTime}</Text>
          </Pressable>

          <View style={styles.passengerField}>
            <Pressable accessibilityLabel="Remove passenger" disabled={passengers === 1} onPress={() => setPassengers((current) => Math.max(1, current - 1))} style={styles.passengerControl}>
              <Ionicons color="#2F6BFF" name="remove" size={17} />
            </Pressable>
            <Text style={styles.passengerCount}>{passengers}</Text>
            <Pressable accessibilityLabel="Add passenger" onPress={() => setPassengers((current) => current + 1)} style={styles.passengerControl}>
              <Ionicons color="#2F6BFF" name="add" size={17} />
            </Pressable>
          </View>
        </View>

        <View style={styles.fareCard}>
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>STANDARD VAN RATE</Text>
            <Text style={styles.rateValue}>₹18 / km</Text>
          </View>
          <View style={styles.fareDivider} />
          <View style={styles.estimateRow}>
            <View>
              <Text style={styles.estimateLabel}>Estimated Fare</Text>
              <Text style={styles.distanceLabel}>Distance: ~28.5 kilometers</Text>
            </View>
            <Text style={styles.fareValue}>₹{estimatedFare}.00</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable accessibilityRole="button" onPress={() => router.push({ pathname: './trip-track', params: { pickup, dropoff, passengers: String(passengers), departureTime } })} style={({ pressed }) => [styles.continueButton, pressed && styles.pressed]}>
          <Text style={styles.continueLabel}>Confirm trip &amp; track</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8FAFC', flex: 1 },
  header: { alignItems: 'center', flexDirection: 'row', gap: 12, paddingHorizontal: 27, paddingTop: 6 },
  backButton: { alignItems: 'center', backgroundColor: '#F3F7FC', borderRadius: 17, height: 34, justifyContent: 'center', width: 34 },
  title: { color: '#071A3F', fontSize: 17, fontWeight: '800', letterSpacing: -0.3 },
  subtitle: { color: '#587097', fontSize: 10.5, marginTop: 3 },
  content: { flex: 1, paddingHorizontal: 27, paddingTop: 26 },
  fieldLabel: { color: '#25486F', fontSize: 9.5, fontWeight: '800' },
  locationField: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#D8E2EE', borderRadius: 7, borderWidth: 1, flexDirection: 'row', height: 38, marginTop: 7, paddingHorizontal: 10 },
  locationText: { color: '#18365E', flex: 1, fontSize: 11.5, fontWeight: '500', marginLeft: 9 },
  nextLabel: { marginTop: 16 },
  detailsLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingRight: 77 },
  detailsRow: { flexDirection: 'row', gap: 9, marginTop: 7 },
  dateField: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#D8E2EE', borderRadius: 7, borderWidth: 1, flex: 1, flexDirection: 'row', height: 37, paddingHorizontal: 10 },
  dateText: { color: '#2B4D76', fontSize: 10.5, fontWeight: '500', marginLeft: 8 },
  passengerField: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#D8E2EE', borderRadius: 7, borderWidth: 1, flexDirection: 'row', height: 37, justifyContent: 'space-between', width: 138 },
  passengerControl: { alignItems: 'center', height: '100%', justifyContent: 'center', width: 30 },
  passengerCount: { color: '#102D59', fontSize: 11.5, fontWeight: '700' },
  fareCard: { backgroundColor: '#EFF6FF', borderColor: '#9DC5FF', borderRadius: 8, borderWidth: 1, marginTop: 15, paddingHorizontal: 12, paddingVertical: 13 },
  rateRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  rateLabel: { color: '#3166D7', fontSize: 10, fontWeight: '800' },
  rateValue: { color: '#1C5CE5', fontSize: 10.5, fontWeight: '700' },
  fareDivider: { backgroundColor: '#C9DDFB', height: 1, marginVertical: 11 },
  estimateRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  estimateLabel: { color: '#071B42', fontSize: 12, fontWeight: '800' },
  distanceLabel: { color: '#4E6B97', fontSize: 9, marginTop: 3 },
  fareValue: { color: '#1D5DDD', fontSize: 20, fontWeight: '800', letterSpacing: -0.4 },
  footer: { backgroundColor: '#FFFFFF', borderTopColor: '#D9E1EC', borderTopWidth: 1, paddingHorizontal: 24, paddingTop: 16 },
  continueButton: { alignItems: 'center', backgroundColor: '#2F68E9', borderRadius: 6, height: 40, justifyContent: 'center' },
  continueLabel: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  pressed: { opacity: 0.82 },
});

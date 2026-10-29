import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAgencyData } from '@/providers/AgencyDataProvider';

function BottomNavigation() {
  const items: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress?: () => void; selected?: boolean }[] = [
    { icon: 'home-outline', label: 'Home', onPress: () => router.replace('./home') },
    { icon: 'car-sport', label: 'Fleet', onPress: () => router.replace('./driver-list') },
    { icon: 'pricetag-outline', label: 'Pricing', selected: true },
    { icon: 'settings-outline', label: 'Settings', onPress: () => router.replace('./more') },
  ];

  return (
    <View style={styles.bottomNavigation}>
      {items.map((item) => (
        <Pressable key={item.label} accessibilityRole="tab" accessibilityState={{ selected: item.selected }} onPress={item.onPress} style={styles.navigationItem}>
          <Ionicons color={item.selected ? '#1769F2' : '#8492A6'} name={item.icon} size={29} />
          <Text style={[styles.navigationLabel, item.selected && styles.navigationLabelSelected]}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function TripPricingScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const { rates, updateRate } = useAgencyData();

  const handlePricingAction = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setIsEditing(false);
    Alert.alert('Pricing updated', 'Your new per-kilometre rates are now active for this session.');
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <Text style={styles.title}>Trip Pricing</Text>
          <Text style={styles.subtitle}>Set your agency rate per kilometre</Text>
        </View>

        <View style={styles.infoBanner}>
          <Ionicons color="#1769F2" name="information-circle" size={41} />
          <Text style={styles.infoText}>These base rates are used to estimate fares. Toll{`\n`}and waiting charges can be added separately.</Text>
        </View>

        <View style={styles.rateList}>
          {rates.map((item) => (
            <View key={item.name} style={styles.rateCard}>
              <View style={styles.vehicleIcon}><Ionicons color="#1769F2" name={item.icon} size={37} /></View>
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleName}>{item.name}</Text>
                <Text style={styles.vehicleCategory}>{item.category}</Text>
              </View>
              <View style={styles.rateArea}>
                {isEditing ? (
                  <TextInput
                    accessibilityLabel={`${item.name} rate per kilometre`}
                    keyboardType="decimal-pad"
                    onChangeText={(value) => updateRate(item.name, value)}
                    selectTextOnFocus
                    style={styles.rateInput}
                    value={item.rate}
                  />
                ) : (
                  <Text style={styles.rate}>₹{item.rate}</Text>
                )}
                <Text style={styles.perKilometre}>/ km</Text>
                {!isEditing && <Ionicons color="#8391A5" name="chevron-forward" size={28} style={styles.chevron} />}
              </View>
            </View>
          ))}
        </View>

        <Pressable accessibilityRole="button" onPress={handlePricingAction} style={({ pressed }) => [styles.pricingButton, pressed && styles.pressed]}>
          <Text style={styles.pricingButtonLabel}>{isEditing ? 'Save pricing' : 'Edit pricing'}</Text>
          <Ionicons color="#FFFFFF" name={isEditing ? 'checkmark' : 'arrow-forward'} size={31} style={styles.actionIcon} />
        </Pressable>
      </ScrollView>
      <BottomNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFFFF', flex: 1 },
  content: { paddingBottom: 10, paddingHorizontal: 17, paddingTop: 20 },
  heading: { paddingHorizontal: 4 },
  title: { color: '#071234', fontSize: 34, fontWeight: '800', letterSpacing: -1.2, lineHeight: 40 },
  subtitle: { color: '#7487A6', fontSize: 20, lineHeight: 26, marginTop: 1 },
  infoBanner: { alignItems: 'center', backgroundColor: '#F4F9FF', borderColor: '#D7E9FF', borderRadius: 17, borderWidth: 1, flexDirection: 'row', marginTop: 5, minHeight: 60, paddingHorizontal: 12 },
  infoText: { color: '#2557A8', flex: 1, fontSize: 15.5, lineHeight: 21, marginLeft: 11 },
  rateList: { marginTop: 12 },
  rateCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E7ECF3', borderRadius: 14, borderWidth: 1, flexDirection: 'row', height: 68, paddingHorizontal: 12 },
  vehicleIcon: { alignItems: 'center', backgroundColor: '#F1F7FF', borderRadius: 27, height: 54, justifyContent: 'center', width: 54 },
  vehicleInfo: { flex: 1, marginLeft: 16 },
  vehicleName: { color: '#0A1535', fontSize: 20, fontWeight: '800', letterSpacing: -0.35 },
  vehicleCategory: { color: '#7889A5', fontSize: 16, marginTop: 2 },
  rateArea: { alignItems: 'center', flexDirection: 'row', minWidth: 103 },
  rate: { color: '#071234', fontSize: 20, fontWeight: '800' },
  rateInput: { borderBottomColor: '#1769F2', borderBottomWidth: 1, color: '#071234', fontSize: 20, fontWeight: '800', height: 35, minWidth: 35, padding: 0, textAlign: 'right' },
  perKilometre: { color: '#7889A5', fontSize: 16, marginLeft: 6 },
  chevron: { marginLeft: 12 },
  pricingButton: { alignItems: 'center', backgroundColor: '#1769F2', borderRadius: 13, flexDirection: 'row', height: 47, justifyContent: 'center', marginHorizontal: 1, marginTop: 14 },
  pricingButtonLabel: { color: '#FFFFFF', fontSize: 20, fontWeight: '800' },
  actionIcon: { position: 'absolute', right: 18 },
  pressed: { opacity: 0.84 },
  bottomNavigation: { alignItems: 'flex-start', backgroundColor: '#FFFFFF', borderTopColor: '#E2E7EC', borderTopWidth: 1, flexDirection: 'row', height: 75, paddingTop: 10 },
  navigationItem: { alignItems: 'center', flex: 1, gap: 3 },
  navigationLabel: { color: '#7E8DA4', fontSize: 13, fontWeight: '600' },
  navigationLabelSelected: { color: '#1769F2' },
});

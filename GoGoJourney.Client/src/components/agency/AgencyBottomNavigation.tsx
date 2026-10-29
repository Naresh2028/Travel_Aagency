import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type AgencyTab = 'home' | 'fleet' | 'pricing' | 'settings';

const items: { icon: keyof typeof Ionicons.glyphMap; label: string; route: './home' | './driver-list' | './trip-pricing' | './more'; tab: AgencyTab }[] = [
  { icon: 'home-outline', label: 'Home', route: './home', tab: 'home' },
  { icon: 'car-sport-outline', label: 'Fleet', route: './driver-list', tab: 'fleet' },
  { icon: 'pricetag-outline', label: 'Pricing', route: './trip-pricing', tab: 'pricing' },
  { icon: 'settings-outline', label: 'Settings', route: './more', tab: 'settings' },
];

export function AgencyBottomNavigation({ activeTab }: { activeTab: AgencyTab }) {
  return (
    <View accessibilityRole="tablist" style={styles.navigation}>
      {items.map((item) => {
        const selected = item.tab === activeTab;

        return (
          <Pressable
            key={item.tab}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => !selected && router.replace(item.route)}
            style={styles.navigationItem}
          >
            <Ionicons color={selected ? '#1769F2' : '#7A8AA1'} name={selected && item.tab === 'home' ? 'home' : item.icon} size={27} />
            <Text style={[styles.navigationLabel, selected && styles.navigationLabelSelected]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: { alignItems: 'center', backgroundColor: '#FFFFFF', borderTopColor: '#E3E7ED', borderTopWidth: 1, flexDirection: 'row', height: 78, justifyContent: 'space-around', paddingHorizontal: 13 },
  navigationItem: { alignItems: 'center', flex: 1, gap: 3, justifyContent: 'center', minWidth: 56 },
  navigationLabel: { color: '#71829B', fontSize: 11, fontWeight: '600' },
  navigationLabelSelected: { color: '#1D67EE', fontWeight: '800' },
});

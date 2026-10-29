import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/constants/images';

type RoleOptionProps = {
  icon: 'traveller' | 'driver';
  title: string;
  subtitle: string;
  onPress: () => void;
  selected: boolean;
};

function RoleOption({ icon, title, subtitle, onPress, selected }: RoleOptionProps) {
  const isTraveller = icon === 'traveller';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Continue as ${title}`}
      onPress={onPress}
      style={({ pressed }) => [styles.roleCard, selected && styles.roleCardSelected, pressed && styles.roleCardPressed]}
    >
      <View style={styles.iconCircle}>
        {isTraveller ? (
          <View style={styles.travellerIcon}>
            <Ionicons name="person" size={48} color="#1687F6" />
            <MaterialCommunityIcons name="bag-suitcase" size={33} color="#1687F6" style={styles.suitcase} />
          </View>
        ) : (
          <MaterialCommunityIcons name="car" size={58} color="#078D86" />
        )}
      </View>
      <View style={styles.copy}>
        <Text style={styles.roleTitle}>{title}</Text>
        <Text style={styles.roleSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={34} color="#102F5D" />
    </Pressable>
  );
}

const Role = () => {
  const [selectedRole, setSelectedRole] = useState<'traveller' | 'driver' | null>(null);

  return (
    <ImageBackground source={images.setupBackground} resizeMode="cover" style={styles.background}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={42} color="#061D4B" />
        </Pressable>

        <View style={styles.content}>
          <Image source={images.logo} resizeMode="contain" style={styles.logo} accessibilityLabel="SkyLimit" />
          <Text style={styles.heading}>I’m joining as</Text>
          <Text style={styles.description}>Choose your role to get started</Text>

          <View style={styles.roles}>
            <RoleOption
              icon="traveller"
              title="Traveller"
              subtitle="Book trips and travel with ease"
              selected={selectedRole === 'traveller'}
              onPress={() => setSelectedRole('traveller')}
            />
            <RoleOption
              icon="driver"
              title="Driver"
              subtitle="Manage assigned trips"
              selected={selectedRole === 'driver'}
              onPress={() => setSelectedRole('driver')}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Role;

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1 },
  backButton: { alignItems: 'center', height: 44, justifyContent: 'center', left: 14, position: 'absolute', top: 33, width: 44, zIndex: 1 },
  content: { alignItems: 'center', flex: 1, paddingTop: 69 },
  logo: { height: 117, width: 196 },
  heading: { color: '#061D4B', fontSize: 31, fontWeight: '800', letterSpacing: -0.7, marginTop: 24 },
  description: { color: '#50658D', fontSize: 19, fontWeight: '400', letterSpacing: -0.25, marginTop: 9 },
  roles: { gap: 17, marginTop: 27, width: '79%' },
  roleCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 252, 250, 0.72)',
    borderColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 24,
    borderWidth: 1.5,
    flexDirection: 'row',
    minHeight: 102,
    paddingHorizontal: 14,
    shadowColor: '#254365',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.11,
    shadowRadius: 10,
  },
  roleCardPressed: { opacity: 0.82, transform: [{ scale: 0.985 }] },
  roleCardSelected: { borderColor: '#1687F6', borderWidth: 2 },
  iconCircle: { alignItems: 'center', backgroundColor: 'rgba(241, 246, 252, 0.9)', borderRadius: 40, height: 80, justifyContent: 'center', width: 80 },
  travellerIcon: { height: 55, position: 'relative', width: 58 },
  suitcase: { bottom: 0, position: 'absolute', right: 0 },
  copy: { flex: 1, marginLeft: 16 },
  roleTitle: { color: '#061D4B', fontSize: 23, fontWeight: '800', letterSpacing: -0.5 },
  roleSubtitle: { color: '#50658D', fontSize: 15.5, letterSpacing: -0.15, marginTop: 4 },
});

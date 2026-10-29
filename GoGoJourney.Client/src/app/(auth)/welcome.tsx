import { AuthHero } from '@/components/auth/AuthHero';
import { LoginPrompt } from '@/components/auth/LoginPrompt';
import { ScreenBackground } from '@/components/ui/ScreenBackground';
import { images } from '@/constants/images';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
  return <><StatusBar style="light" /><ScreenBackground source={images.authBackground}><AuthHero /><View style={styles.actions}><Text style={styles.demoText}>Travel demo · no account or OTP required</Text><LoginPrompt onPress={() => router.replace('./login')} /></View></ScreenBackground></>;
}

const styles = StyleSheet.create({
  actions: { paddingBottom: 22, paddingHorizontal: 26 },
  demoText: { color: 'rgba(255,255,255,0.85)', fontSize: 14, marginBottom: 16, textAlign: 'center' },
});

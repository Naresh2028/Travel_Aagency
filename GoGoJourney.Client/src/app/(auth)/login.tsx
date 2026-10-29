import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const formatPhoneInput = (number: string) => `${number.slice(0, 5)}${number.length > 5 ? ` ${number.slice(5)}` : ''}`;

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const canContinue = phoneNumber.length === 10;

  return <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
    <StatusBar style="dark" />
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.keyboardView}>
      <View style={styles.header}><View style={styles.brand}><View style={styles.brandIcon}><Ionicons color="#FFFFFF" name="arrow-up" size={19} /></View><Text style={styles.brandName}>SkyLimit</Text></View><View style={styles.demoBadge}><Text style={styles.demoLabel}>Demo mode</Text></View></View>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>LET&apos;S GET YOU MOVING</Text><Text style={styles.title}>Create your account</Text><Text style={styles.subtitle}>Enter your mobile number to get started.</Text>
        <View style={styles.phoneSection}><Text style={styles.fieldLabel}>Mobile number</Text><View style={styles.phoneField}><View style={styles.countrySelector}><Text style={styles.countryCode}>IN +91</Text><Ionicons color="#64748B" name="chevron-down" size={14} /></View><View style={styles.divider} /><TextInput accessibilityLabel="Mobile number" autoComplete="tel" keyboardType="phone-pad" maxLength={11} onChangeText={(value) => setPhoneNumber(value.replace(/\D/g, '').slice(0, 10))} placeholder="98765 43210" placeholderTextColor="#94A3B8" style={styles.phoneInput} value={formatPhoneInput(phoneNumber)} /></View><Text style={styles.helperText}>Demo mode: enter any 10-digit Indian mobile number.</Text></View>
        <Pressable accessibilityRole="button" accessibilityState={{ disabled: !canContinue }} disabled={!canContinue} onPress={() => router.push({ pathname: './otp-verify', params: { phoneNumber } })} style={({ pressed }) => [styles.continueButton, !canContinue && styles.continueButtonDisabled, pressed && canContinue && styles.buttonPressed]}><Text style={[styles.continueLabel, !canContinue && styles.continueLabelDisabled]}>Continue</Text></Pressable>
      </View>
      <View style={styles.footer}><Text style={styles.footerText}>Already have an account? </Text><Pressable onPress={() => router.push('./signup')}><Text style={styles.footerLink}>Sign in</Text></Pressable></View>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFFFF', flex: 1 }, keyboardView: { flex: 1 }, header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 27, paddingTop: 9 }, brand: { alignItems: 'center', flexDirection: 'row', gap: 8 }, brandIcon: { alignItems: 'center', backgroundColor: '#2563EB', borderRadius: 11, height: 36, justifyContent: 'center', width: 36 }, brandName: { color: '#0F172A', fontSize: 16, fontWeight: '700', letterSpacing: -0.4 }, demoBadge: { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE', borderRadius: 10, borderWidth: 1, paddingHorizontal: 9, paddingVertical: 5 }, demoLabel: { color: '#2563EB', fontSize: 11, fontWeight: '700' },
  content: { flex: 1, paddingHorizontal: 27, paddingTop: 52 }, eyebrow: { color: '#2563EB', fontSize: 11, fontWeight: '700', letterSpacing: 1.1, marginBottom: 11 }, title: { color: '#0F172A', fontSize: 25, fontWeight: '700', letterSpacing: -0.7, lineHeight: 31 }, subtitle: { color: '#64748B', fontSize: 15, lineHeight: 22, marginTop: 8 }, phoneSection: { marginTop: 31 }, fieldLabel: { color: '#334155', fontSize: 13, fontWeight: '600', marginBottom: 8 }, phoneField: { alignItems: 'center', borderColor: '#CBD5E1', borderRadius: 9, borderWidth: 1, flexDirection: 'row', height: 52 }, countrySelector: { alignItems: 'center', flexDirection: 'row', gap: 5, height: '100%', justifyContent: 'center', paddingHorizontal: 11 }, countryCode: { color: '#334155', fontSize: 13, fontWeight: '600' }, divider: { backgroundColor: '#E2E8F0', height: 24, width: 1 }, phoneInput: { color: '#0F172A', flex: 1, fontSize: 15, height: '100%', paddingHorizontal: 13 }, helperText: { color: '#64748B', fontSize: 11, lineHeight: 16, marginTop: 8 },
  continueButton: { alignItems: 'center', backgroundColor: '#2563EB', borderRadius: 8, height: 46, justifyContent: 'center', marginTop: 21 }, continueButtonDisabled: { backgroundColor: '#E2E8F0' }, buttonPressed: { backgroundColor: '#1D4ED8' }, continueLabel: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' }, continueLabelDisabled: { color: '#94A3B8' }, footer: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingBottom: 16 }, footerText: { color: '#64748B', fontSize: 13 }, footerLink: { color: '#2563EB', fontSize: 13, fontWeight: '700' },
});

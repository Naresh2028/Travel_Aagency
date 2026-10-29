import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';

function LoginField({ children, icon, label }: { children: React.ReactNode; icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return <View style={styles.field}><View style={styles.fieldIcon}><Ionicons color="#1761EC" name={icon} size={30} /></View><View style={styles.fieldContent}><Text style={styles.fieldLabel}>{label}</Text>{children}</View></View>;
}

export default function SignInScreen() {
  const [username, setUsername] = useState('naresh96');
  const [password, setPassword] = useState('gogotravel');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const canSignIn = username.trim().length > 0 && password.length >= 6;

  return <ImageBackground resizeMode="cover" source={images.profileSelectionBackground} style={styles.background}>
    <StatusBar style="dark" />
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <View style={styles.globe}><Ionicons color="#FFFFFF" name="globe-outline" size={63} /></View>
            <Text style={styles.title}>Guruvayur Travel</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </View>

          <View style={styles.card}>
            <LoginField icon="person-outline" label="Username">
              <TextInput accessibilityLabel="Username" autoCapitalize="none" autoComplete="username" onChangeText={setUsername} placeholder="Enter username" placeholderTextColor="#94A3B8" style={styles.input} value={username} />
            </LoginField>
            <LoginField icon="lock-closed-outline" label="Password">
              <View style={styles.passwordRow}>
                <TextInput accessibilityLabel="Password" autoComplete="current-password" onChangeText={setPassword} placeholder="Enter password" placeholderTextColor="#94A3B8" secureTextEntry={!passwordVisible} style={styles.input} value={password} />
                <Pressable accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'} hitSlop={10} onPress={() => setPasswordVisible((visible) => !visible)} style={styles.visibilityButton}>
                  <Ionicons color="#71809A" name={passwordVisible ? 'eye-outline' : 'eye-off-outline'} size={29} />
                </Pressable>
              </View>
            </LoginField>
            <Pressable accessibilityRole="button" onPress={() => Alert.alert('Forgot password?', 'Password recovery can be connected here.')} style={styles.forgotButton}><Text style={styles.forgotLabel}>Forgot password?</Text></Pressable>
            <Pressable accessibilityRole="button" accessibilityState={{ disabled: !canSignIn }} disabled={!canSignIn} onPress={() => router.push('./profile-selection')} style={({ pressed }) => [styles.signInButton, !canSignIn && styles.disabledButton, pressed && canSignIn && styles.pressed]}>
              <Text style={styles.signInLabel}>Sign in</Text><Ionicons color="#FFFFFF" name="arrow-forward" size={31} />
            </Pressable>
            <View style={styles.orRow}><View style={styles.orLine} /><Text style={styles.orLabel}>OR</Text><View style={styles.orLine} /></View>
            <Pressable accessibilityRole="button" onPress={() => router.replace('./login')} style={({ pressed }) => [styles.accountButton, pressed && styles.pressed]}>
              <Ionicons color="#1761EC" name="people-outline" size={30} /><Text style={styles.accountLabel}>Select a different account</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </ImageBackground>;
}

const styles = StyleSheet.create({
  background: { flex: 1 }, safeArea: { flex: 1 }, keyboardView: { flex: 1 }, content: { flexGrow: 1, paddingBottom: 28 }, hero: { alignItems: 'center', paddingTop: 88 }, globe: { alignItems: 'center', backgroundColor: '#2769EB', borderRadius: 28, elevation: 6, height: 116, justifyContent: 'center', shadowColor: '#1F58C8', shadowOffset: { width: 0, height: 7 }, shadowOpacity: 0.24, shadowRadius: 12, width: 116 }, title: { color: '#07133C', fontSize: 39, fontWeight: '800', letterSpacing: -1.2, marginTop: 28 }, subtitle: { color: '#62728E', fontSize: 21, fontWeight: '500', marginTop: 13 },
  card: { backgroundColor: 'rgba(255,255,255,0.94)', borderColor: 'rgba(255,255,255,0.75)', borderRadius: 28, borderWidth: 1, marginHorizontal: 22, marginTop: 48, padding: 18, shadowColor: '#4E6388', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 18 }, field: { alignItems: 'center', borderColor: '#DDE5F0', borderRadius: 19, borderWidth: 1.5, flexDirection: 'row', minHeight: 92, paddingHorizontal: 14 }, fieldIcon: { alignItems: 'center', backgroundColor: '#EDF4FF', borderRadius: 14, height: 64, justifyContent: 'center', width: 64 }, fieldContent: { flex: 1, marginLeft: 16, minWidth: 0 }, fieldLabel: { color: '#71809A', fontSize: 16, marginBottom: 4 }, input: { color: '#07133C', flex: 1, fontSize: 21, fontWeight: '500', height: 36, padding: 0 }, passwordRow: { alignItems: 'center', flexDirection: 'row' }, visibilityButton: { alignItems: 'center', height: 40, justifyContent: 'center', width: 42 }, forgotButton: { alignSelf: 'flex-end', marginTop: 14, paddingVertical: 4 }, forgotLabel: { color: '#1761EC', fontSize: 16, fontWeight: '700' }, signInButton: { alignItems: 'center', backgroundColor: '#2467EE', borderRadius: 17, flexDirection: 'row', height: 76, justifyContent: 'center', marginTop: 28 }, disabledButton: { backgroundColor: '#9DB8ED' }, signInLabel: { color: '#FFFFFF', fontSize: 23, fontWeight: '800', marginRight: 16 }, orRow: { alignItems: 'center', flexDirection: 'row', gap: 14, marginVertical: 28 }, orLine: { backgroundColor: '#DCE4EF', flex: 1, height: 1 }, orLabel: { color: '#71809A', fontSize: 14, fontWeight: '700' }, accountButton: { alignItems: 'center', borderColor: '#ADC7FF', borderRadius: 17, borderWidth: 1.5, flexDirection: 'row', height: 74, justifyContent: 'center' }, accountLabel: { color: '#1761EC', fontSize: 18, fontWeight: '700', marginLeft: 14 }, pressed: { opacity: 0.84, transform: [{ scale: 0.99 }] },
});

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type PasswordFieldProps = {
  label: string;
  onChangeText: (value: string) => void;
  value: string;
};

function PasswordField({ label, onChangeText, value }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return <View style={styles.fieldGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.field}>
      <Ionicons color="#2369EA" name="lock-closed-outline" size={23} />
      <TextInput accessibilityLabel={label} autoComplete="new-password" onChangeText={onChangeText} placeholder="Enter password" placeholderTextColor="#9AA9BF" secureTextEntry={!visible} style={styles.input} value={value} />
      <Pressable accessibilityLabel={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`} hitSlop={10} onPress={() => setVisible((current) => !current)} style={styles.visibilityButton}>
        <Ionicons color="#71819B" name={visible ? 'eye-outline' : 'eye-off-outline'} size={24} />
      </Pressable>
    </View>
  </View>;
}

export default function ForgotPasswordScreen() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordsMatch = password.length >= 6 && password === confirmPassword;

  const leaveScreen = () => router.back();
  const savePassword = () => {
    if (!passwordsMatch) return;
    Alert.alert('Password updated', 'Your new password has been saved.', [{ text: 'Done', onPress: leaveScreen }]);
  };

  return <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
    <StatusBar style="dark" />
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.keyboardView}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable accessibilityLabel="Go back" hitSlop={10} onPress={leaveScreen} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}><Ionicons color="#15254A" name="chevron-back" size={27} /></Pressable>
          <Text style={styles.headerTitle}>Change Password</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.iconCircle}><Ionicons color="#2169EF" name="shield-checkmark-outline" size={45} /></View>
        <Text style={styles.title}>Set a new password</Text>
        <Text style={styles.subtitle}>Create a strong password for your account. It must contain at least 6 characters.</Text>

        <View style={styles.formCard}>
          <PasswordField label="New password" onChangeText={setPassword} value={password} />
          <PasswordField label="Confirm password" onChangeText={setConfirmPassword} value={confirmPassword} />
          {confirmPassword.length > 0 && !passwordsMatch ? <Text style={styles.errorText}>Passwords must match and contain at least 6 characters.</Text> : null}
        </View>

        <View style={styles.actions}>
          <Pressable accessibilityRole="button" onPress={leaveScreen} style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}><Text style={styles.cancelLabel}>Cancel</Text></Pressable>
          <Pressable accessibilityRole="button" accessibilityState={{ disabled: !passwordsMatch }} disabled={!passwordsMatch} onPress={savePassword} style={({ pressed }) => [styles.saveButton, !passwordsMatch && styles.saveButtonDisabled, pressed && passwordsMatch && styles.pressed]}><Text style={styles.saveLabel}>Save</Text></Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8FAFD', flex: 1 }, keyboardView: { flex: 1 }, content: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 28 }, header: { alignItems: 'center', flexDirection: 'row', height: 66, justifyContent: 'space-between' }, backButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E0E7F0', borderRadius: 20, borderWidth: 1, height: 42, justifyContent: 'center', width: 42 }, headerTitle: { color: '#0B1A3E', fontSize: 19, fontWeight: '800' }, headerSpacer: { width: 42 }, iconCircle: { alignItems: 'center', alignSelf: 'center', backgroundColor: '#EAF2FF', borderRadius: 42, height: 84, justifyContent: 'center', marginTop: 48, width: 84 }, title: { color: '#0B1A3E', fontSize: 27, fontWeight: '800', letterSpacing: -0.6, marginTop: 24, textAlign: 'center' }, subtitle: { color: '#667993', fontSize: 15, lineHeight: 22, marginHorizontal: 20, marginTop: 10, textAlign: 'center' }, formCard: { backgroundColor: '#FFFFFF', borderColor: '#E1E8F1', borderRadius: 20, borderWidth: 1, marginTop: 38, padding: 18, shadowColor: '#3B5070', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.06, shadowRadius: 12 }, fieldGroup: { marginBottom: 20 }, label: { color: '#213555', fontSize: 14, fontWeight: '700', marginBottom: 9 }, field: { alignItems: 'center', backgroundColor: '#FBFCFE', borderColor: '#D9E2EE', borderRadius: 12, borderWidth: 1, flexDirection: 'row', height: 56, paddingLeft: 15 }, input: { color: '#102349', flex: 1, fontSize: 16, height: '100%', marginLeft: 12, padding: 0 }, visibilityButton: { alignItems: 'center', height: 48, justifyContent: 'center', width: 47 }, errorText: { color: '#D83B58', fontSize: 12, lineHeight: 17, marginTop: -5 }, actions: { flexDirection: 'row', gap: 13, marginTop: 22 }, cancelButton: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#BFD0E8', borderRadius: 13, borderWidth: 1, flex: 1, height: 56, justifyContent: 'center' }, cancelLabel: { color: '#2867DB', fontSize: 16, fontWeight: '800' }, saveButton: { alignItems: 'center', backgroundColor: '#2169EF', borderRadius: 13, flex: 1, height: 56, justifyContent: 'center' }, saveButtonDisabled: { backgroundColor: '#A9C2F2' }, saveLabel: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' }, pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
});

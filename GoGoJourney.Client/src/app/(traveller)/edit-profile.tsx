import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TravellerProfile = { address: string; email: string; firstName: string; lastName: string; phone: string };

const initialProfile: TravellerProfile = {
  address: 'Thrissur, Kerala 680001', email: 'naresh.nagaraj@example.com', firstName: 'Naresh', lastName: 'Nagaraj', phone: '9847263018',
};

function ProfileValue({ label, value }: { label: string; value: string }) {
  return <View style={styles.valueRow}><Text style={styles.valueLabel}>{label}</Text><Text style={styles.valueText}>{value}</Text></View>;
}

function Field({ label, multiline, onChangeText, optional, value }: { label: string; multiline?: boolean; onChangeText: (value: string) => void; optional?: boolean; value: string }) {
  return <View style={styles.fieldGroup}><Text style={styles.fieldLabel}>{label}{optional ? <Text style={styles.optional}> (Optional)</Text> : null}</Text><TextInput accessibilityLabel={label} autoCapitalize={label === 'Email address' ? 'none' : 'words'} autoComplete={label === 'Email address' ? 'email' : undefined} keyboardType={label === 'Email address' ? 'email-address' : 'default'} multiline={multiline} onChangeText={onChangeText} placeholder={`Enter ${label.toLowerCase()}`} placeholderTextColor="#9AA8BD" style={[styles.input, multiline && styles.addressInput]} textAlignVertical={multiline ? 'top' : 'center'} value={value} /></View>;
}

export default function TravellerEditProfileScreen() {
  const [profile, setProfile] = useState<TravellerProfile>(initialProfile);
  const [draft, setDraft] = useState<TravellerProfile>(initialProfile);
  const [editing, setEditing] = useState(false);
  const update = <K extends keyof TravellerProfile>(key: K, value: TravellerProfile[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const canSave = draft.firstName.trim().length > 0 && draft.phone.length === 10 && draft.email.includes('@') && draft.address.trim().length > 0;
  const beginEdit = () => { setDraft(profile); setEditing(true); };
  const cancelEdit = () => { setDraft(profile); setEditing(false); };
  const save = () => { if (!canSave) return; setProfile(draft); setEditing(false); };

  return <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
    <StatusBar style="dark" />
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.screen}>
      <View style={styles.header}>
        <Pressable accessibilityLabel="Go back" hitSlop={10} onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}><Ionicons color="#52647C" name="chevron-back" size={29} /></Pressable>
        <Text style={styles.headerTitle}>{editing ? 'Edit Profile' : 'My Profile'}</Text>
        {editing ? <Pressable accessibilityRole="button" onPress={cancelEdit} style={styles.headerAction}><Text style={styles.cancelText}>Cancel</Text></Pressable> : <Pressable accessibilityRole="button" onPress={beginEdit} style={styles.headerAction}><Text style={styles.editText}>Edit</Text></Pressable>}
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.hero}><View style={styles.avatar}><Text style={styles.avatarText}>{profile.firstName.charAt(0)}{profile.lastName.charAt(0)}</Text></View><Text style={styles.name}>{profile.firstName} {profile.lastName}</Text><Text style={styles.role}>Traveller</Text></View>
        {editing ? <EditForm draft={draft} update={update} /> : <ViewProfile profile={profile} />}
      </ScrollView>

      <View style={styles.footer}>
        {editing ? <View style={styles.editActions}><Pressable accessibilityRole="button" onPress={cancelEdit} style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}><Text style={styles.cancelButtonLabel}>Cancel</Text></Pressable><Pressable accessibilityRole="button" accessibilityState={{ disabled: !canSave }} disabled={!canSave} onPress={save} style={({ pressed }) => [styles.saveButton, !canSave && styles.saveButtonDisabled, pressed && canSave && styles.pressed]}><Text style={styles.saveButtonLabel}>Save Changes</Text></Pressable></View> : <Pressable accessibilityRole="button" onPress={beginEdit} style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}><Text style={styles.editButtonLabel}>Edit Profile</Text></Pressable>}
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}

function ViewProfile({ profile }: { profile: TravellerProfile }) {
  return <View><Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text><View style={styles.card}><ProfileValue label="FIRST NAME" value={profile.firstName} /><ProfileValue label="LAST NAME" value={profile.lastName || '—'} /><ProfileValue label="PHONE NUMBER" value={`+91 ${profile.phone.slice(0, 5)} ${profile.phone.slice(5)}`} /><ProfileValue label="EMAIL ADDRESS" value={profile.email} /><ProfileValue label="ADDRESS" value={profile.address} /></View></View>;
}

function EditForm({ draft, update }: { draft: TravellerProfile; update: <K extends keyof TravellerProfile>(key: K, value: TravellerProfile[K]) => void }) {
  return <View><Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text><View style={styles.card}><Field label="First name" onChangeText={(value) => update('firstName', value)} value={draft.firstName} /><Field label="Last name" onChangeText={(value) => update('lastName', value)} optional value={draft.lastName} /><Text style={styles.fieldLabel}>Phone number</Text><View style={styles.phoneRow}><Text style={styles.countryCode}>+91</Text><TextInput accessibilityLabel="Phone number" keyboardType="phone-pad" maxLength={10} onChangeText={(value) => update('phone', value.replace(/\D/g, '').slice(0, 10))} placeholder="98765 43210" placeholderTextColor="#9AA8BD" style={styles.phoneInput} value={draft.phone} /></View><Field label="Email address" onChangeText={(value) => update('email', value)} value={draft.email} /><Field label="Address" multiline onChangeText={(value) => update('address', value)} value={draft.address} /></View></View>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8FAFD', flex: 1 }, screen: { flex: 1 }, header: { alignItems: 'center', flexDirection: 'row', height: 72, justifyContent: 'space-between', paddingHorizontal: 20 }, backButton: { alignItems: 'center', backgroundColor: '#F0F3F8', borderRadius: 22, height: 45, justifyContent: 'center', width: 45 }, headerTitle: { color: '#0B1B42', fontSize: 23, fontWeight: '800', letterSpacing: -0.5 }, headerAction: { minWidth: 45, paddingVertical: 10 }, editText: { color: '#2369E8', fontSize: 16, fontWeight: '800', textAlign: 'right' }, cancelText: { color: '#687A92', fontSize: 15, fontWeight: '700', textAlign: 'right' }, content: { paddingBottom: 22, paddingHorizontal: 20 }, hero: { alignItems: 'center', paddingTop: 18 }, avatar: { alignItems: 'center', backgroundColor: '#E8F1FF', borderColor: '#FFFFFF', borderRadius: 61, borderWidth: 3, elevation: 3, height: 122, justifyContent: 'center', shadowColor: '#4269A4', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.16, shadowRadius: 8, width: 122 }, avatarText: { color: '#2369E8', fontSize: 37, fontWeight: '800', letterSpacing: -1.5 }, name: { color: '#09183B', fontSize: 28, fontWeight: '800', letterSpacing: -0.7, marginTop: 16 }, role: { color: '#70829A', fontSize: 16, marginTop: 5 }, sectionTitle: { color: '#8492A4', fontSize: 14, fontWeight: '800', letterSpacing: 0.35, marginLeft: 7, marginTop: 31 }, card: { backgroundColor: '#FFFFFF', borderColor: '#DFE6EF', borderRadius: 20, borderWidth: 1, marginTop: 10, paddingHorizontal: 18 }, valueRow: { borderBottomColor: '#E5EAF0', borderBottomWidth: StyleSheet.hairlineWidth, paddingVertical: 16 }, valueLabel: { color: '#95A1B0', fontSize: 13, fontWeight: '600' }, valueText: { color: '#101D35', fontSize: 18, fontWeight: '500', lineHeight: 25, marginTop: 7 }, fieldGroup: { borderBottomColor: '#E5EAF0', borderBottomWidth: StyleSheet.hairlineWidth, paddingBottom: 15, paddingTop: 15 }, fieldLabel: { color: '#708098', fontSize: 13, fontWeight: '700', marginBottom: 8, marginTop: 15 }, optional: { color: '#9BA7B7', fontWeight: '500' }, input: { backgroundColor: '#FBFCFE', borderColor: '#D9E2EC', borderRadius: 10, borderWidth: 1, color: '#122449', fontSize: 16, height: 49, paddingHorizontal: 13 }, addressInput: { height: 83, paddingTop: 12 }, phoneRow: { alignItems: 'center', backgroundColor: '#FBFCFE', borderColor: '#D9E2EC', borderRadius: 10, borderWidth: 1, flexDirection: 'row', height: 49 }, countryCode: { borderRightColor: '#DEE5ED', borderRightWidth: 1, color: '#20345B', fontSize: 16, fontWeight: '700', paddingHorizontal: 14 }, phoneInput: { color: '#122449', flex: 1, fontSize: 16, height: '100%', paddingHorizontal: 13 }, footer: { backgroundColor: '#FFFFFF', borderTopColor: '#E2E7ED', borderTopWidth: 1, paddingHorizontal: 20, paddingTop: 15 }, editButton: { alignItems: 'center', backgroundColor: '#276BEA', borderRadius: 13, height: 60, justifyContent: 'center' }, editButtonLabel: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' }, editActions: { flexDirection: 'row', gap: 12 }, cancelButton: { alignItems: 'center', borderColor: '#BDD0EC', borderRadius: 13, borderWidth: 1, flex: 0.75, height: 60, justifyContent: 'center' }, cancelButtonLabel: { color: '#2A68D4', fontSize: 17, fontWeight: '800' }, saveButton: { alignItems: 'center', backgroundColor: '#276BEA', borderRadius: 13, flex: 1.25, height: 60, justifyContent: 'center' }, saveButtonDisabled: { backgroundColor: '#ABC5F3' }, saveButtonLabel: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' }, pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
});

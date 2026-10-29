import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const driverPhoto = require('../../../assets/images/driver-ramesh-kumar.png');
const relationships = ['Father', 'Mother', 'Spouse', 'Son', 'Daughter', 'Friend', 'Others'] as const;
type Relationship = typeof relationships[number];

type DriverProfile = {
  contactName: string;
  contactPhone: string;
  email: string;
  expiryDate: string;
  firstName: string;
  lastName: string;
  licenceNumber: string;
  phone: string;
  relationship: Relationship;
};

const initialProfile: DriverProfile = {
  contactName: 'Meera Kumar', contactPhone: '9847263019', email: 'ramesh.kumar@guruvayurtravels.in', expiryDate: '12/2027', firstName: 'Ramesh', lastName: 'Kumar', licenceNumber: 'KL-08-20210012345', phone: '9847263018', relationship: 'Spouse',
};

function ProfileValue({ label, value }: { label: string; value: string }) {
  return <View style={styles.valueRow}><Text style={styles.valueLabel}>{label}</Text><Text style={styles.valueText}>{value}</Text></View>;
}

function TextField({ keyboardType, label, onChangeText, optional, placeholder, value }: { keyboardType?: 'default' | 'email-address' | 'phone-pad'; label: string; onChangeText: (value: string) => void; optional?: boolean; placeholder?: string; value: string }) {
  return <View style={styles.fieldGroup}><Text style={styles.fieldLabel}>{label}{optional ? <Text style={styles.optional}> (Optional)</Text> : null}</Text><TextInput autoCapitalize={keyboardType === 'email-address' ? 'none' : 'words'} autoComplete={keyboardType === 'email-address' ? 'email' : undefined} keyboardType={keyboardType} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#9AA8BD" style={styles.input} value={value} /></View>;
}

export default function DriverProfileScreen() {
  const [profile, setProfile] = useState<DriverProfile>(initialProfile);
  const [draft, setDraft] = useState<DriverProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [relationshipOpen, setRelationshipOpen] = useState(false);
  const updateDraft = <K extends keyof DriverProfile>(key: K, value: DriverProfile[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const valid = draft.firstName.trim().length > 0 && draft.phone.length === 10 && draft.email.includes('@') && draft.licenceNumber.trim().length > 0 && draft.expiryDate.trim().length > 0;

  const beginEdit = () => { setDraft(profile); setRelationshipOpen(false); setIsEditing(true); };
  const cancelEdit = () => { setDraft(profile); setRelationshipOpen(false); setIsEditing(false); };
  const saveProfile = () => { if (!valid) return; setProfile(draft); setRelationshipOpen(false); setIsEditing(false); };

  return <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
    <StatusBar style="dark" />
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.screen}>
      <View style={styles.header}>
        <Pressable accessibilityLabel="Go back" hitSlop={10} onPress={() => router.back()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}><Ionicons color="#55657B" name="chevron-back" size={29} /></Pressable>
        <Text style={styles.headerTitle}>{isEditing ? 'Edit Profile' : 'Driver Profile'}</Text>
        {isEditing ? <Pressable accessibilityRole="button" onPress={cancelEdit} style={styles.cancelHeaderButton}><Text style={styles.cancelHeaderLabel}>Cancel</Text></Pressable> : <Pressable accessibilityRole="button" onPress={beginEdit} style={styles.editHeaderButton}><Text style={styles.editHeaderLabel}>Edit Profile</Text></Pressable>}
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.profileHero}>
          <View style={styles.photoWrap}><Image accessibilityLabel="Ramesh Kumar" source={driverPhoto} style={styles.photo} />{isEditing ? <View style={styles.photoEditBadge}><Ionicons color="#FFFFFF" name="camera" size={16} /></View> : null}</View>
          <Text style={styles.driverName}>{profile.firstName} {profile.lastName}</Text>
          <Text style={styles.driverId}>Driver ID: GT-2983</Text>
          <View style={styles.agencyBadge}><Text style={styles.agencyBadgeText}>Guruvayur Travels</Text></View>
        </View>

        {isEditing ? <EditForm draft={draft} relationshipOpen={relationshipOpen} setRelationshipOpen={setRelationshipOpen} updateDraft={updateDraft} /> : <ProfileDetails profile={profile} />}
      </ScrollView>

      <View style={styles.footer}>
        {isEditing ? <View style={styles.editActions}><Pressable accessibilityRole="button" onPress={cancelEdit} style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}><Text style={styles.cancelButtonLabel}>Cancel</Text></Pressable><Pressable accessibilityRole="button" accessibilityState={{ disabled: !valid }} disabled={!valid} onPress={saveProfile} style={({ pressed }) => [styles.saveButton, !valid && styles.saveButtonDisabled, pressed && valid && styles.pressed]}><Text style={styles.saveButtonLabel}>Save Changes</Text></Pressable></View> : <Pressable accessibilityRole="button" onPress={beginEdit} style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}><Text style={styles.editButtonLabel}>Edit Profile</Text></Pressable>}
      </View>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}

function ProfileDetails({ profile }: { profile: DriverProfile }) {
  return <View><Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text><View style={styles.infoCard}><ProfileValue label="FIRST NAME" value={profile.firstName} /><ProfileValue label="LAST NAME" value={profile.lastName || '—'} /><ProfileValue label="PHONE NUMBER" value={`+91 ${profile.phone.slice(0, 5)} ${profile.phone.slice(5)}`} /><ProfileValue label="EMAIL ADDRESS" value={profile.email} /></View><Text style={styles.sectionTitle}>DRIVER INFORMATION</Text><View style={styles.infoCard}><ProfileValue label="DRIVING LICENCE NUMBER" value={profile.licenceNumber} /><ProfileValue label="LICENCE EXPIRY DATE" value={profile.expiryDate} /></View><Text style={styles.sectionTitle}>EMERGENCY CONTACT</Text><View style={styles.infoCard}><ProfileValue label="CONTACT NAME" value={profile.contactName} /><ProfileValue label="RELATIONSHIP" value={profile.relationship} /><ProfileValue label="CONTACT PHONE NUMBER" value={`+91 ${profile.contactPhone.slice(0, 5)} ${profile.contactPhone.slice(5)}`} /></View></View>;
}

function EditForm({ draft, relationshipOpen, setRelationshipOpen, updateDraft }: { draft: DriverProfile; relationshipOpen: boolean; setRelationshipOpen: (value: boolean) => void; updateDraft: <K extends keyof DriverProfile>(key: K, value: DriverProfile[K]) => void }) {
  return <View><Text style={styles.sectionTitle}>PERSONAL INFORMATION</Text><View style={styles.infoCard}><TextField label="First name" onChangeText={(value) => updateDraft('firstName', value)} value={draft.firstName} /><TextField label="Last name" onChangeText={(value) => updateDraft('lastName', value)} optional value={draft.lastName} /><Text style={styles.fieldLabel}>Phone number</Text><View style={styles.phoneInputRow}><Text style={styles.countryCode}>+91</Text><TextInput accessibilityLabel="Phone number" keyboardType="phone-pad" maxLength={10} onChangeText={(value) => updateDraft('phone', value.replace(/\D/g, '').slice(0, 10))} placeholder="98765 43210" placeholderTextColor="#9AA8BD" style={styles.phoneInput} value={draft.phone} /></View><TextField keyboardType="email-address" label="Email address" onChangeText={(value) => updateDraft('email', value)} value={draft.email} /></View><Text style={styles.sectionTitle}>DRIVER INFORMATION</Text><View style={styles.infoCard}><TextField label="DL number" onChangeText={(value) => updateDraft('licenceNumber', value.toUpperCase())} value={draft.licenceNumber} /><TextField label="Expiry date" onChangeText={(value) => updateDraft('expiryDate', value)} placeholder="MM/YYYY" value={draft.expiryDate} /></View><Text style={styles.sectionTitle}>EMERGENCY CONTACT</Text><View style={styles.infoCard}><TextField label="Contact name" onChangeText={(value) => updateDraft('contactName', value)} value={draft.contactName} /><Text style={styles.fieldLabel}>Relationship</Text><Pressable accessibilityRole="button" accessibilityState={{ expanded: relationshipOpen }} onPress={() => setRelationshipOpen(!relationshipOpen)} style={styles.dropdown}><Text style={styles.dropdownLabel}>{draft.relationship}</Text><Ionicons color="#61738E" name={relationshipOpen ? 'chevron-up' : 'chevron-down'} size={22} /></Pressable>{relationshipOpen ? <View style={styles.options}>{relationships.map((item) => <Pressable key={item} accessibilityRole="button" accessibilityState={{ selected: draft.relationship === item }} onPress={() => { updateDraft('relationship', item); setRelationshipOpen(false); }} style={({ pressed }) => [styles.option, draft.relationship === item && styles.optionSelected, pressed && styles.pressed]}><Text style={[styles.optionLabel, draft.relationship === item && styles.optionLabelSelected]}>{item}</Text>{draft.relationship === item ? <Ionicons color="#2369EA" name="checkmark" size={20} /> : null}</Pressable>)}</View> : null}<Text style={styles.fieldLabel}>Contact phone number</Text><View style={styles.phoneInputRow}><Text style={styles.countryCode}>+91</Text><TextInput accessibilityLabel="Contact phone number" keyboardType="phone-pad" maxLength={10} onChangeText={(value) => updateDraft('contactPhone', value.replace(/\D/g, '').slice(0, 10))} placeholder="98765 43210" placeholderTextColor="#9AA8BD" style={styles.phoneInput} value={draft.contactPhone} /></View></View></View>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F8FAFD', flex: 1 }, screen: { flex: 1 }, header: { alignItems: 'center', backgroundColor: '#F8FAFD', flexDirection: 'row', height: 74, justifyContent: 'space-between', paddingHorizontal: 20 }, backButton: { alignItems: 'center', backgroundColor: '#F1F4F8', borderRadius: 23, height: 46, justifyContent: 'center', width: 46 }, headerTitle: { color: '#09183A', fontSize: 25, fontWeight: '800', letterSpacing: -0.5 }, editHeaderButton: { backgroundColor: '#ECF5FF', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10 }, editHeaderLabel: { color: '#2869D9', fontSize: 15, fontWeight: '800' }, cancelHeaderButton: { paddingHorizontal: 5, paddingVertical: 10 }, cancelHeaderLabel: { color: '#5C6F8A', fontSize: 15, fontWeight: '700' }, content: { paddingBottom: 22, paddingHorizontal: 20 }, profileHero: { alignItems: 'center', paddingTop: 18 }, photoWrap: { position: 'relative' }, photo: { borderRadius: 64, height: 128, width: 128 }, photoEditBadge: { alignItems: 'center', backgroundColor: '#256BEA', borderColor: '#FFFFFF', borderRadius: 16, borderWidth: 2, bottom: 0, height: 32, justifyContent: 'center', position: 'absolute', right: 0, width: 32 }, driverName: { color: '#09183A', fontSize: 28, fontWeight: '800', letterSpacing: -0.7, marginTop: 17 }, driverId: { color: '#60718A', fontSize: 16, marginTop: 7 }, agencyBadge: { backgroundColor: '#EAF4FF', borderRadius: 7, marginTop: 15, paddingHorizontal: 12, paddingVertical: 6 }, agencyBadgeText: { color: '#2C67C9', fontSize: 14, fontWeight: '800' }, sectionTitle: { color: '#8A98A9', fontSize: 14, fontWeight: '800', letterSpacing: 0.3, marginLeft: 7, marginTop: 29 }, infoCard: { backgroundColor: '#FFFFFF', borderColor: '#E0E6ED', borderRadius: 20, borderWidth: 1, marginTop: 10, paddingHorizontal: 18 }, valueRow: { borderBottomColor: '#E5E9EE', borderBottomWidth: StyleSheet.hairlineWidth, paddingVertical: 16 }, valueLabel: { color: '#97A2B0', fontSize: 13, fontWeight: '500' }, valueText: { color: '#111C32', fontSize: 19, fontWeight: '500', marginTop: 7 }, fieldGroup: { borderBottomColor: '#E5E9EE', borderBottomWidth: StyleSheet.hairlineWidth, paddingBottom: 15, paddingTop: 15 }, fieldLabel: { color: '#718198', fontSize: 13, fontWeight: '700', marginBottom: 8, marginTop: 15 }, optional: { color: '#9AA7B8', fontWeight: '500' }, input: { backgroundColor: '#FBFCFE', borderColor: '#DCE4ED', borderRadius: 10, borderWidth: 1, color: '#102247', fontSize: 16, height: 49, paddingHorizontal: 13 }, phoneInputRow: { alignItems: 'center', backgroundColor: '#FBFCFE', borderColor: '#DCE4ED', borderRadius: 10, borderWidth: 1, flexDirection: 'row', height: 49 }, countryCode: { borderRightColor: '#DEE5ED', borderRightWidth: 1, color: '#1C3159', fontSize: 16, fontWeight: '700', paddingHorizontal: 14 }, phoneInput: { color: '#102247', flex: 1, fontSize: 16, height: '100%', paddingHorizontal: 13 }, dropdown: { alignItems: 'center', backgroundColor: '#FBFCFE', borderColor: '#DCE4ED', borderRadius: 10, borderWidth: 1, flexDirection: 'row', height: 49, justifyContent: 'space-between', paddingHorizontal: 13 }, dropdownLabel: { color: '#102247', fontSize: 16 }, options: { backgroundColor: '#FFFFFF', borderColor: '#DCE4ED', borderRadius: 10, borderWidth: 1, marginTop: 6, overflow: 'hidden' }, option: { alignItems: 'center', flexDirection: 'row', height: 43, justifyContent: 'space-between', paddingHorizontal: 13 }, optionSelected: { backgroundColor: '#EEF5FF' }, optionLabel: { color: '#263A5A', fontSize: 15 }, optionLabelSelected: { color: '#2369EA', fontWeight: '800' }, footer: { backgroundColor: '#FFFFFF', borderTopColor: '#E2E7ED', borderTopWidth: 1, paddingHorizontal: 20, paddingTop: 15 }, editButton: { alignItems: 'center', backgroundColor: '#286BEA', borderRadius: 13, height: 60, justifyContent: 'center' }, editButtonLabel: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' }, editActions: { flexDirection: 'row', gap: 12 }, cancelButton: { alignItems: 'center', borderColor: '#BDD0EC', borderRadius: 13, borderWidth: 1, flex: 0.72, height: 60, justifyContent: 'center' }, cancelButtonLabel: { color: '#2D6AD6', fontSize: 17, fontWeight: '800' }, saveButton: { alignItems: 'center', backgroundColor: '#286BEA', borderRadius: 13, flex: 1.28, height: 60, justifyContent: 'center' }, saveButtonDisabled: { backgroundColor: '#A9C4F3' }, saveButtonLabel: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' }, pressed: { opacity: 0.82, transform: [{ scale: 0.99 }] },
});

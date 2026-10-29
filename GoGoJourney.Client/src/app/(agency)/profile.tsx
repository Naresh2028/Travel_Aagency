import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

type ProfileFieldProps = {
  accessibilityLabel: string;
  editable: boolean;
  label: string;
  onChangeText: (value: string) => void;
  value: string;
};

function ProfileField({ accessibilityLabel, editable, label, onChangeText, value }: ProfileFieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={accessibilityLabel}
        editable={editable}
        onChangeText={onChangeText}
        selectTextOnFocus={editable}
        style={[styles.input, !editable && styles.readOnlyInput]}
        value={value}
      />
    </View>
  );
}

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [agencyName, setAgencyName] = useState('Guruvayur Travels');
  const [email, setEmail] = useState('bookings@guruvayurtravels.in');
  const [phone, setPhone] = useState('+91 487 242 1188');
  const [businessDetails, setBusinessDetails] = useState('GSTIN 32AABCG4182F1ZP · Passenger transport');

  const handleProfileAction = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setIsEditing(false);
    Alert.alert('Profile updated', 'Connect this form to the .NET agency-profile endpoint to save these changes.');
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={10}
          onPress={() => router.back()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Ionicons color="#252D39" name="chevron-back" size={26} />
        </Pressable>
        <View>
          <Text style={styles.title}>Agency Profile</Text>
          <Text style={styles.subtitle}>Business information</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.content}>
        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <ProfileField accessibilityLabel="Agency name" editable={isEditing} label="Agency name" onChangeText={setAgencyName} value={agencyName} />
          <ProfileField accessibilityLabel="Agency email" editable={isEditing} label="Email" onChangeText={setEmail} value={email} />
          <ProfileField accessibilityLabel="Agency phone" editable={isEditing} label="Phone" onChangeText={setPhone} value={phone} />
          <ProfileField accessibilityLabel="Business details" editable={isEditing} label="Business details" onChangeText={setBusinessDetails} value={businessDetails} />
          <Text style={styles.helpText}>Tap Edit to update the agency information shown to travellers.</Text>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable accessibilityRole="button" onPress={handleProfileAction} style={({ pressed }) => [styles.profileButton, pressed && styles.pressed]}>
            <Text style={styles.profileButtonLabel}>{isEditing ? 'Save profile' : 'Edit profile'}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: '#F8F9FB', flex: 1 },
  header: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E7E9EC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: 15,
    height: 94,
    paddingHorizontal: 23,
  },
  backButton: { alignItems: 'center', backgroundColor: '#F2F4F7', borderRadius: 22, height: 44, justifyContent: 'center', width: 44 },
  title: { color: '#151B2A', fontSize: 25, fontWeight: '700', letterSpacing: -0.45, lineHeight: 29 },
  subtitle: { color: '#69717E', fontSize: 14, lineHeight: 20, marginTop: 2 },
  content: { flex: 1 },
  form: { flexGrow: 1, paddingHorizontal: 23, paddingTop: 26 },
  fieldGroup: { marginBottom: 20 },
  label: { color: '#475361', fontSize: 16, fontWeight: '600', lineHeight: 21, marginBottom: 9 },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CDD1D7',
    borderRadius: 11,
    borderWidth: 1,
    color: '#536171',
    fontSize: 16,
    height: 54,
    paddingHorizontal: 16,
  },
  readOnlyInput: { backgroundColor: '#FAFBFC' },
  helpText: { color: '#718095', fontSize: 15, lineHeight: 21, marginTop: -1 },
  footer: { backgroundColor: '#FFFFFF', borderTopColor: '#E1E4E8', borderTopWidth: 1, height: 114, paddingHorizontal: 19, paddingTop: 18 },
  profileButton: { alignItems: 'center', backgroundColor: '#286CE1', borderRadius: 11, height: 57, justifyContent: 'center' },
  profileButtonLabel: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  pressed: { opacity: 0.82 },
});

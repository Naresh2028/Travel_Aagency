import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CODE_LENGTH = 6;
const RESEND_DELAY_SECONDS = 30;

const formatPhoneNumber = (value: string) => {
  const number = value.replace(/^\+91/, '').replace(/\D/g, '').slice(0, 10);
  return number ? `IN +91 ${number.slice(0, 5)}${number.length > 5 ? ` ${number.slice(5)}` : ''}` : 'IN +91';
};

export default function OtpVerifyScreen() {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber?: string }>();
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [secondsRemaining, setSecondsRemaining] = useState(RESEND_DELAY_SECONDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const code = digits.join('');
  const normalizedPhoneNumber = typeof phoneNumber === 'string' ? phoneNumber : '';

  useEffect(() => {
    if (secondsRemaining === 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining]);

  const updateDigit = (value: string, index: number) => {
    const enteredDigits = value.replace(/\D/g, '');
    const nextDigits = [...digits];

    if (enteredDigits.length > 1) {
      enteredDigits.slice(0, CODE_LENGTH - index).split('').forEach((digit, offset) => {
        nextDigits[index + offset] = digit;
      });
      setDigits(nextDigits);
      inputRefs.current[Math.min(index + enteredDigits.length, CODE_LENGTH - 1)]?.focus();
      return;
    }

    nextDigits[index] = enteredDigits;
    setDigits(nextDigits);

    if (enteredDigits && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyCode = async () => {
    if (code.length !== CODE_LENGTH || isSubmitting) return;

    setIsSubmitting(true);
    router.replace('./profile-selection');
    setIsSubmitting(false);
  };

  const resendCode = async () => {
    if (secondsRemaining > 0 || isResending || !normalizedPhoneNumber) return;

    setIsResending(true);

    setDigits(Array(CODE_LENGTH).fill(''));
    setSecondsRemaining(RESEND_DELAY_SECONDS);
    setIsResending(false);
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', default: undefined })} style={styles.screen}>
        <View style={styles.header}>
          <Pressable accessibilityLabel="Go back" hitSlop={8} onPress={() => router.back()} style={styles.backButton}>
            <Ionicons color="#375273" name="chevron-back" size={21} />
          </Pressable>
          <View style={styles.brand}>
            <View style={styles.brandIcon}>
              <Ionicons color="#FFFFFF" name="arrow-up" size={18} />
            </View>
            <Text style={styles.brandText}>Sky<Text style={styles.brandAccent}>Limit</Text></Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.verificationIcon}>
            <Ionicons color="#2563EB" name="phone-portrait-outline" size={28} />
            <View style={styles.checkmark}>
              <Ionicons color="#2563EB" name="checkmark" size={9} />
            </View>
          </View>

          <Text style={styles.title}>Verify your number</Text>
          <Text style={styles.subtitle}>Enter the 6-digit code</Text>
          <Text style={styles.phoneNumber}>{formatPhoneNumber(normalizedPhoneNumber)}</Text>

          <View style={styles.codeRow}>
            {digits.map((digit, index) => (
              <TextInput
                key={index}
                ref={(input) => {
                  inputRefs.current[index] = input;
                }}
                accessibilityLabel={`Verification code digit ${index + 1}`}
                autoFocus={index === 0}
                caretHidden
                keyboardType="number-pad"
                maxLength={index === 0 ? CODE_LENGTH : 1}
                onChangeText={(value) => updateDigit(value, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                selectTextOnFocus
                style={[styles.codeInput, digit && styles.codeInputFilled, index === 0 && !digit && styles.codeInputFocused]}
                value={digit}
              />
            ))}
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={code.length !== CODE_LENGTH || isSubmitting}
            onPress={verifyCode}
            style={({ pressed }) => [
              styles.verifyButton,
              code.length === CODE_LENGTH && styles.verifyButtonReady,
              pressed && code.length === CODE_LENGTH && styles.buttonPressed,
            ]}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={[styles.verifyButtonLabel, code.length === CODE_LENGTH && styles.verifyButtonLabelReady]}>
                Verify and continue
              </Text>
            )}
          </Pressable>

          <View style={styles.resendArea}>
            {secondsRemaining > 0 ? (
              <Text style={styles.resendCountdown}>Resend code in <Text style={styles.resendCountdownStrong}>{secondsRemaining} seconds.</Text></Text>
            ) : (
              <Pressable accessibilityRole="button" disabled={isResending} onPress={resendCode}>
                <Text style={styles.resendLink}>{isResending ? 'Resending code...' : 'Resend code'}</Text>
              </Pressable>
            )}
          </View>
        </View>

        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.changeNumberButton}>
          <Text style={styles.changeNumberText}>Change phone number</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFFFF', flex: 1 },
  screen: { flex: 1 },
  header: { alignItems: 'center', height: 65, justifyContent: 'center', paddingHorizontal: 31 },
  backButton: {
    alignItems: 'center',
    borderColor: '#DCE5F1',
    borderRadius: 9,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    left: 31,
    position: 'absolute',
    top: 10,
    width: 34,
  },
  brand: { alignItems: 'center', flexDirection: 'row', gap: 8, marginTop: 2 },
  brandIcon: {
    alignItems: 'center',
    backgroundColor: '#3E62F4',
    borderRadius: 12,
    elevation: 4,
    height: 37,
    justifyContent: 'center',
    shadowColor: '#3657DE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    width: 37,
  },
  brandText: { color: '#071330', fontSize: 16, fontWeight: '800', letterSpacing: -0.5 },
  brandAccent: { color: '#286CE1' },
  content: { alignItems: 'center', flex: 1, paddingHorizontal: 31, paddingTop: 44 },
  verificationIcon: {
    alignItems: 'center',
    backgroundColor: '#F1F7FF',
    borderRadius: 25,
    height: 76,
    justifyContent: 'center',
    position: 'relative',
    width: 76,
  },
  checkmark: {
    alignItems: 'center',
    backgroundColor: '#EAF3FF',
    borderColor: '#2563EB',
    borderRadius: 5,
    borderWidth: 1,
    bottom: 20,
    height: 10,
    justifyContent: 'center',
    position: 'absolute',
    right: 25,
    width: 10,
  },
  title: { color: '#06122D', fontSize: 24, fontWeight: '800', letterSpacing: -0.7, marginTop: 21 },
  subtitle: { color: '#5870A1', fontSize: 14, marginTop: 8 },
  phoneNumber: { color: '#20395F', fontSize: 11, fontWeight: '700', marginTop: 7 },
  codeRow: { flexDirection: 'row', gap: 7, marginTop: 30, width: '100%' },
  codeInput: {
    borderColor: '#DBE3EE',
    borderRadius: 9,
    borderWidth: 1,
    color: '#102448',
    flex: 1,
    fontSize: 19,
    fontWeight: '700',
    height: 45,
    padding: 0,
    textAlign: 'center',
  },
  codeInputFilled: { borderColor: '#86A8FF', backgroundColor: '#F8FBFF' },
  codeInputFocused: { borderColor: '#3772FF', borderWidth: 1.5, shadowColor: '#3772FF', shadowOpacity: 0.22, shadowRadius: 4 },
  verifyButton: { alignItems: 'center', backgroundColor: '#DDE5F0', borderRadius: 11, height: 46, justifyContent: 'center', marginTop: 25, width: '100%' },
  verifyButtonReady: { backgroundColor: '#286CE1' },
  verifyButtonLabel: { color: '#93A7C8', fontSize: 13, fontWeight: '600' },
  verifyButtonLabelReady: { color: '#FFFFFF' },
  buttonPressed: { opacity: 0.84 },
  resendArea: { alignItems: 'center', height: 22, justifyContent: 'center', marginTop: 18 },
  resendCountdown: { color: '#55709E', fontSize: 11 },
  resendCountdownStrong: { color: '#183A73', fontWeight: '700' },
  resendLink: { color: '#286CE1', fontSize: 12, fontWeight: '700' },
  changeNumberButton: { alignItems: 'center', paddingBottom: 25, paddingTop: 16 },
  changeNumberText: { color: '#274D80', fontSize: 13, fontWeight: '500' },
});

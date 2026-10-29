import { Stack } from 'expo-router';
import { AgencyDataProvider } from '@/providers/AgencyDataProvider';

export default function RootLayout() {
  return (
    <AgencyDataProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AgencyDataProvider>
  );
}

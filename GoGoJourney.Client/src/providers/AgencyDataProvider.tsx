import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type DriverGender = 'Male' | 'Female';
export type DriverVehicleType = 'Scooter' | 'Motorbike' | 'Auto' | 'Cab' | 'Car' | 'Van';
export type VehicleCategory = 'Two-wheeler' | 'Three-wheeler' | 'Four-wheeler';
export type VehicleStatus = 'Available' | 'On trip' | 'Service';

export type AgencyRate = {
  category: string;
  icon: 'bicycle' | 'car-sport' | 'car-outline' | 'bus-outline';
  name: string;
  rate: string;
};

export type AgencyDriver = {
  email: string;
  enabled: boolean;
  gender: DriverGender;
  id: string;
  initials: string;
  name: string;
  phone: string;
  vehicles: DriverVehicleType[];
};

export type AgencyVehicle = {
  category: VehicleCategory;
  id: string;
  registration: string;
  status: VehicleStatus;
  type: DriverVehicleType;
};

export type DriverDraft = Pick<AgencyDriver, 'email' | 'gender' | 'name' | 'phone' | 'vehicles'>;
export type VehicleDraft = Pick<AgencyVehicle, 'category' | 'registration' | 'status' | 'type'>;

type AgencyData = {
  addDriver: (driver: DriverDraft) => void;
  addVehicle: (vehicle: VehicleDraft) => void;
  drivers: AgencyDriver[];
  rates: AgencyRate[];
  resetDemoData: () => void;
  removeDriver: (id: string) => void;
  removeVehicle: (id: string) => void;
  setDriverEnabled: (id: string, enabled: boolean) => void;
  updateDriver: (id: string, driver: DriverDraft) => void;
  updateVehicle: (id: string, vehicle: VehicleDraft) => void;
  updateRate: (name: string, rate: string) => void;
  vehicles: AgencyVehicle[];
};

const initialDrivers: AgencyDriver[] = [
  { id: 'akhil', initials: 'AR', name: 'Akhil Raj', gender: 'Male', phone: '+91 98470 22184', email: 'akhil@example.com', vehicles: ['Cab', 'Car'], enabled: true },
  { id: 'anjali', initials: 'AM', name: 'Anjali Menon', gender: 'Female', phone: '+91 97462 81033', email: 'anjali@example.com', vehicles: ['Scooter', 'Car'], enabled: true },
  { id: 'shameer', initials: 'SP', name: 'Shameer P.', gender: 'Male', phone: '+91 99614 55219', email: 'shameer@example.com', vehicles: ['Auto'], enabled: false },
  { id: 'binu', initials: 'BT', name: 'Binu Thomas', gender: 'Male', phone: '+91 98952 11428', email: 'binu@example.com', vehicles: ['Car', 'Van'], enabled: true },
];

const initialVehicles: AgencyVehicle[] = [
  { id: 'bq2841', registration: 'KL-08-BQ-2841', type: 'Scooter', category: 'Two-wheeler', status: 'Available' },
  { id: 'ct9017', registration: 'KL-08-CT-9017', type: 'Auto', category: 'Three-wheeler', status: 'On trip' },
  { id: 'by4420', registration: 'KL-08-BY-4420', type: 'Cab', category: 'Four-wheeler', status: 'Available' },
  { id: 'az1188', registration: 'KL-08-AZ-1188', type: 'Van', category: 'Four-wheeler', status: 'Service' },
];

const initialRates: AgencyRate[] = [
  { name: 'Scooter', category: 'Two-wheeler', rate: '12', icon: 'bicycle' },
  { name: 'Motorbike', category: 'Two-wheeler', rate: '14', icon: 'bicycle' },
  { name: 'Auto', category: 'Three-wheeler', rate: '18', icon: 'car-sport' },
  { name: 'Car', category: 'Four-wheeler', rate: '24', icon: 'car-outline' },
  { name: 'Van', category: 'Four-wheeler', rate: '28', icon: 'bus-outline' },
];

const AgencyDataContext = createContext<AgencyData | null>(null);

const getInitials = (name: string) => name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'DR';
const newId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export function AgencyDataProvider({ children }: { children: ReactNode }) {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [rates, setRates] = useState(initialRates);

  const value = useMemo<AgencyData>(() => ({
    drivers,
    vehicles,
    rates,
    resetDemoData: () => {
      setDrivers(initialDrivers);
      setVehicles(initialVehicles);
      setRates(initialRates);
    },
    addDriver: (driver) => setDrivers((current) => [...current, { ...driver, id: newId('driver'), initials: getInitials(driver.name), enabled: true }]),
    updateDriver: (id, driver) => setDrivers((current) => current.map((item) => item.id === id ? { ...item, ...driver, initials: getInitials(driver.name) } : item)),
    removeDriver: (id) => setDrivers((current) => current.filter((item) => item.id !== id)),
    setDriverEnabled: (id, enabled) => setDrivers((current) => current.map((item) => item.id === id ? { ...item, enabled } : item)),
    addVehicle: (vehicle) => setVehicles((current) => [...current, { ...vehicle, id: newId('vehicle') }]),
    updateVehicle: (id, vehicle) => setVehicles((current) => current.map((item) => item.id === id ? { ...item, ...vehicle } : item)),
    removeVehicle: (id) => setVehicles((current) => current.filter((item) => item.id !== id)),
    updateRate: (name, rate) => setRates((current) => current.map((item) => item.name === name ? { ...item, rate } : item)),
  }), [drivers, rates, vehicles]);

  return <AgencyDataContext.Provider value={value}>{children}</AgencyDataContext.Provider>;
}

export function useAgencyData() {
  const context = useContext(AgencyDataContext);

  if (!context) {
    throw new Error('useAgencyData must be used within AgencyDataProvider.');
  }

  return context;
}

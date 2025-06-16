import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Contact } from '../types';

interface SafetyContextType {
  alertActive: boolean;
  bandConnected: boolean;
  batteryLevel: number;
  contacts: Contact[];
  alertHistory: AlertEvent[];
  toggleAlert: () => void;
  addContact: (contact: Contact) => void;
  removeContact: (id: string) => void;
  triggerStretchAlert: () => void;
}

interface AlertEvent {
  id: string;
  timestamp: Date;
  type: 'button' | 'stretch' | 'test';
  location: {
    latitude: number;
    longitude: number;
  };
  resolvedAt?: Date;
}

const SafetyContext = createContext<SafetyContextType | undefined>(undefined);

export const SafetyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alertActive, setAlertActive] = useState(false);
  const [bandConnected, setBandConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Emergency Contact 1', relation: 'Mother', phone: '+1 (555) 123-4567' },
    { id: '2', name: 'Emergency Contact 2', relation: 'Father', phone: '+1 (555) 987-6543' },
  ]);
  const [alertHistory, setAlertHistory] = useState<AlertEvent[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      type: 'test',
      location: { latitude: 40.7128, longitude: -74.006 },
      resolvedAt: new Date(Date.now() - 86390000),
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      type: 'button',
      location: { latitude: 40.7128, longitude: -74.006 },
      resolvedAt: new Date(Date.now() - 172790000),
    },
  ]);

  // Simulate battery drain
  React.useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => {
        if (prev <= 1) {
          setBandConnected(false);
          return 0;
        }
        return alertActive ? prev - 0.5 : prev - 0.1;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [alertActive]);

  const toggleAlert = () => {
    setAlertActive((prev) => {
      if (!prev) {
        // Add new alert to history when activated
        const newAlert: AlertEvent = {
          id: Date.now().toString(),
          timestamp: new Date(),
          type: 'button',
          location: {
            // Mock location
            latitude: 40.7128,
            longitude: -74.006,
          },
        };
        setAlertHistory((prev) => [newAlert, ...prev]);
      } else {
        // Resolve the latest alert when deactivated
        setAlertHistory((prev) => {
          const updated = [...prev];
          if (updated[0] && !updated[0].resolvedAt) {
            updated[0] = { ...updated[0], resolvedAt: new Date() };
          }
          return updated;
        });
      }
      return !prev;
    });
  };

  const triggerStretchAlert = () => {
    if (!alertActive) {
      setAlertActive(true);
      const newAlert: AlertEvent = {
        id: Date.now().toString(),
        timestamp: new Date(),
        type: 'stretch',
        location: {
          // Mock location
          latitude: 40.7128,
          longitude: -74.006,
        },
      };
      setAlertHistory((prev) => [newAlert, ...prev]);
    }
  };

  const addContact = (contact: Contact) => {
    setContacts((prev) => [...prev, { ...contact, id: Date.now().toString() }]);
  };

  const removeContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <SafetyContext.Provider
      value={{
        alertActive,
        bandConnected,
        batteryLevel,
        contacts,
        alertHistory,
        toggleAlert,
        addContact,
        removeContact,
        triggerStretchAlert,
      }}
    >
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (context === undefined) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};
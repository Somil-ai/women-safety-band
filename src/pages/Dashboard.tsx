import React from 'react';
import EmergencyButton from '../components/EmergencyButton';
import BandStatus from '../components/BandStatus';
import LocationCard from '../components/LocationCard';
import ContactList from '../components/ContactList';
import { useSafety } from '../context/SafetyContext';
import { ShieldAlert } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { alertActive } = useSafety();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h1 className={`text-2xl font-bold mb-2 flex items-center justify-center ${alertActive ? 'text-red-600' : 'text-blue-900'}`}>
          <ShieldAlert size={24} className="mr-2" /> 
          Safety Band
        </h1>
        <p className="text-gray-600">Your personal safety companion</p>
      </div>

      <div className={`rounded-xl p-6 mb-8 transition-all duration-500 flex flex-col items-center ${
        alertActive ? 'bg-red-200 animate-pulse' : 'bg-white shadow-md'
      }`}>
        <EmergencyButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <BandStatus />
          <LocationCard />
        </div>
        <div>
          <ContactList limit={3} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';

const EmergencyButton: React.FC = () => {
  const { alertActive, toggleAlert } = useSafety();

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggleAlert}
        className={`
          w-40 h-40 rounded-full flex items-center justify-center 
          shadow-lg transform transition-all duration-300
          ${
            alertActive
              ? 'bg-white text-red-600 shadow-red-400 animate-pulse scale-95'
              : 'bg-red-600 text-white shadow-red-300 hover:bg-red-700 active:scale-95'
          }
          focus:outline-none focus:ring-4 focus:ring-red-300
        `}
        aria-label="Emergency SOS Button"
      >
        <div className="flex flex-col items-center justify-center">
          <AlertTriangle size={48} className="mb-2" />
          <span className="text-lg font-bold">
            {alertActive ? 'CANCEL SOS' : 'SOS'}
          </span>
        </div>
      </button>
      <p className="mt-4 text-center text-gray-700 max-w-sm">
        {alertActive
          ? 'Alert is active! Emergency contacts and nearby authorities have been notified.'
          : 'Press the SOS button to alert your emergency contacts, nearby police stations, and hospitals.'}
      </p>
    </div>
  );
};

export default EmergencyButton;
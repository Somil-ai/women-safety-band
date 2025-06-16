import React from 'react';
import { useSafety } from '../context/SafetyContext';
import { Battery, Bluetooth } from 'lucide-react';

const BandStatus: React.FC = () => {
  const { bandConnected, batteryLevel, triggerStretchAlert } = useSafety();

  const handleStretchTest = () => {
    triggerStretchAlert();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Bluetooth size={20} className="mr-2" /> Band Status
      </h2>
      
      <div className="flex justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">Connection</p>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${bandConnected ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
            <span className="font-medium">{bandConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>
        
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">Battery</p>
          <div className="flex items-center">
            <Battery size={20} className={
              batteryLevel > 50 ? 'text-green-500' : 
              batteryLevel > 20 ? 'text-yellow-500' : 'text-red-500'
            } />
            <span className="ml-2 font-medium">{Math.round(batteryLevel)}%</span>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-1">Last Synced</p>
        <p className="font-medium">Just now</p>
      </div>
      
      <div className="pt-3 border-t border-gray-200">
        <button
          onClick={handleStretchTest}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        >
          Test Stretch Alert
        </button>
      </div>
    </div>
  );
};

export default BandStatus;
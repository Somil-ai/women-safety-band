import React, { useEffect, useState } from 'react';
import { useSafety } from '../context/SafetyContext';
import { Battery, Signal, Wifi, AlertTriangle } from 'lucide-react';

const StatusBar: React.FC = () => {
  const { alertActive, bandConnected, batteryLevel } = useSafety();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getBatteryColor = () => {
    if (batteryLevel > 50) return 'text-green-500';
    if (batteryLevel > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div 
      className={`px-4 py-2 shadow-md flex justify-between items-center transition-all duration-300 ${
        alertActive ? 'bg-red-600 text-white' : 'bg-white'
      }`}
    >
      <div className="flex items-center gap-1">
        <div className={`w-3 h-3 rounded-full ${bandConnected ? 'bg-green-500' : 'bg-red-500'} mr-1`}></div>
        <span className="text-sm font-medium">{bandConnected ? 'Connected' : 'Disconnected'}</span>
      </div>
      
      <div className="flex items-center">
        {alertActive && (
          <div className="animate-pulse flex items-center mr-3">
            <AlertTriangle size={16} className="mr-1" />
            <span className="text-sm font-bold">ALERT ACTIVE</span>
          </div>
        )}
        <span className="text-sm">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Signal size={16} className={bandConnected ? 'text-green-500' : 'text-gray-400'} />
        <Wifi size={16} className={bandConnected ? 'text-green-500' : 'text-gray-400'} />
        <div className="flex items-center">
          <Battery size={16} className={getBatteryColor()} />
          <span className="text-xs ml-1">{Math.round(batteryLevel)}%</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
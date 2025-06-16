import React from 'react';
import { Settings as SettingsIcon, Bell, Map, Shield, User, Smartphone } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <SettingsIcon size={24} className="mr-2 text-blue-700" /> 
        Settings
      </h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <h2 className="text-lg font-semibold text-blue-800 flex items-center">
            <Bell size={18} className="mr-2" /> Notification Settings
          </h2>
        </div>
        
        <div className="p-4">
          <SettingItem
            label="Emergency Contact Notifications"
            description="Send notifications to your emergency contacts when alert is triggered"
            type="toggle"
            defaultChecked={true}
          />
          
          <SettingItem
            label="Sound Alert"
            description="Play loud sound when emergency is triggered"
            type="toggle"
            defaultChecked={true}
          />
          
          <SettingItem
            label="Vibration Alert"
            description="Vibrate device when emergency is triggered"
            type="toggle"
            defaultChecked={true}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <h2 className="text-lg font-semibold text-blue-800 flex items-center">
            <Map size={18} className="mr-2" /> Location Settings
          </h2>
        </div>
        
        <div className="p-4">
          <SettingItem
            label="Share Precise Location"
            description="Share your exact location with emergency contacts"
            type="toggle"
            defaultChecked={true}
          />
          
          <SettingItem
            label="Emergency Services Range"
            description="Maximum distance to search for police and hospitals"
            type="select"
            options={['1 mile', '2 miles', '5 miles', '10 miles']}
            defaultValue="5 miles"
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <h2 className="text-lg font-semibold text-blue-800 flex items-center">
            <Shield size={18} className="mr-2" /> Safety Band Settings
          </h2>
        </div>
        
        <div className="p-4">
          <SettingItem
            label="Stretch Sensitivity"
            description="Adjust how sensitive the band is to stretching"
            type="select"
            options={['Low', 'Medium', 'High', 'Very High']}
            defaultValue="Medium"
          />
          
          <SettingItem
            label="Battery Saver Mode"
            description="Reduce features to extend battery life"
            type="toggle"
            defaultChecked={false}
          />
          
          <SettingItem
            label="Double-Press Protection"
            description="Require double-press to activate emergency button"
            type="toggle"
            defaultChecked={true}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <h2 className="text-lg font-semibold text-blue-800 flex items-center">
            <User size={18} className="mr-2" /> Account Settings
          </h2>
        </div>
        
        <div className="p-4">
          <SettingItem
            label="Personal Information"
            description="Update your name, emergency info, and blood type"
            type="button"
            buttonText="Edit"
          />
          
          <SettingItem
            label="Connected Devices"
            description="Manage safety band and other connected devices"
            type="button"
            buttonText="Manage"
            icon={<Smartphone size={16} />}
          />
          
          <SettingItem
            label="Logout"
            description="Sign out of your safety account"
            type="button"
            buttonText="Logout"
            buttonClass="bg-red-600 hover:bg-red-700"
          />
        </div>
      </div>
    </div>
  );
};

interface SettingItemProps {
  label: string;
  description: string;
  type: 'toggle' | 'select' | 'button';
  defaultChecked?: boolean;
  options?: string[];
  defaultValue?: string;
  buttonText?: string;
  buttonClass?: string;
  icon?: React.ReactNode;
}

const SettingItem: React.FC<SettingItemProps> = ({
  label,
  description,
  type,
  defaultChecked,
  options,
  defaultValue,
  buttonText,
  buttonClass = 'bg-blue-600 hover:bg-blue-700',
  icon
}) => {
  return (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        
        {type === 'toggle' && (
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        )}
        
        {type === 'select' && options && (
          <select className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" defaultValue={defaultValue}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        
        {type === 'button' && (
          <button className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm flex items-center ${buttonClass}`}>
            {icon && <span className="mr-1">{icon}</span>}
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
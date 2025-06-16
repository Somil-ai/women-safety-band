import React from 'react';
import { useSafety } from '../context/SafetyContext';
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const History: React.FC = () => {
  const { alertHistory } = useSafety();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAlertTypeLabel = (type: string) => {
    switch (type) {
      case 'button':
        return 'SOS Button Pressed';
      case 'stretch':
        return 'Band Stretched Alert';
      case 'test':
        return 'Test Alert';
      default:
        return 'Unknown Alert';
    }
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'button':
        return <AlertTriangle size={20} className="text-red-600" />;
      case 'stretch':
        return <AlertTriangle size={20} className="text-orange-600" />;
      case 'test':
        return <CheckCircle size={20} className="text-blue-600" />;
      default:
        return <AlertTriangle size={20} />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Clock size={24} className="mr-2 text-blue-700" /> 
        Alert History
      </h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {alertHistory.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No alert history available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {alertHistory.map((alert) => {
                  const duration = alert.resolvedAt
                    ? Math.round((alert.resolvedAt.getTime() - alert.timestamp.getTime()) / 1000)
                    : null;
                    
                  return (
                    <tr key={alert.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getAlertTypeIcon(alert.type)}
                          <span className="ml-2">{getAlertTypeLabel(alert.type)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(alert.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatTime(alert.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          alert.resolvedAt ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {alert.resolvedAt ? 'Resolved' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {duration !== null ? `${duration} seconds` : 'Ongoing'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
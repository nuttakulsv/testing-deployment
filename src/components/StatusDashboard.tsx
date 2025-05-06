import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, XCircle, Clock, Server, Database, Globe } from 'lucide-react';
import StatusCard from './StatusCard';

interface ServiceStatus {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  lastUpdated: string;
  icon: React.ReactNode;
}

const StatusDashboard: React.FC = () => {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setServices([
        {
          id: '1',
          name: 'Web Server',
          status: 'operational',
          lastUpdated: new Date().toISOString(),
          icon: <Server className="h-6 w-6" />
        },
        {
          id: '2',
          name: 'Database',
          status: 'operational',
          lastUpdated: new Date().toISOString(),
          icon: <Database className="h-6 w-6" />
        },
        {
          id: '3',
          name: 'API Gateway',
          status: 'degraded',
          lastUpdated: new Date().toISOString(),
          icon: <Globe className="h-6 w-6" />
        },
        {
          id: '4',
          name: 'Authentication Service',
          status: 'maintenance',
          lastUpdated: new Date().toISOString(),
          icon: <Clock className="h-6 w-6" />
        }
      ]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getSystemStatus = () => {
    if (services.some(service => service.status === 'outage')) {
      return { status: 'Major Outage', icon: <XCircle className="h-8 w-8 text-red-500" /> };
    } else if (services.some(service => service.status === 'degraded')) {
      return { status: 'Partial Outage', icon: <AlertCircle className="h-8 w-8 text-amber-500" /> };
    } else if (services.some(service => service.status === 'maintenance')) {
      return { status: 'Maintenance', icon: <Clock className="h-8 w-8 text-blue-500" /> };
    } else {
      return { status: 'All Systems Operational', icon: <CheckCircle className="h-8 w-8 text-green-500" /> };
    }
  };

  const systemStatus = getSystemStatus();

  return (
    <div className="space-y-8">
      <div className="text-center p-6 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-center space-x-3 mb-2">
          {systemStatus.icon}
          <h2 className="text-2xl font-bold">{systemStatus.status}</h2>
        </div>
        <p className="text-gray-600">Last updated: {new Date().toLocaleTimeString()}</p>
      </div>

      <h3 className="text-xl font-semibold text-gray-800">Service Status</h3>
      
      {isLoading ? (
        <div className="p-8 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading service status...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(service => (
            <StatusCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDashboard;
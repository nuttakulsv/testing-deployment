import React from 'react';

interface Service {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  lastUpdated: string;
  icon: React.ReactNode;
}

interface StatusCardProps {
  service: Service;
}

const StatusCard: React.FC<StatusCardProps> = ({ service }) => {
  const getStatusStyles = () => {
    switch (service.status) {
      case 'operational':
        return {
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          borderColor: 'border-green-200',
          iconColor: 'text-green-500'
        };
      case 'degraded':
        return {
          bgColor: 'bg-amber-50',
          textColor: 'text-amber-700',
          borderColor: 'border-amber-200',
          iconColor: 'text-amber-500'
        };
      case 'outage':
        return {
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          iconColor: 'text-red-500'
        };
      case 'maintenance':
        return {
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-500'
        };
      default:
        return {
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-500'
        };
    }
  };

  const styles = getStatusStyles();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  };

  const getStatusText = () => {
    switch (service.status) {
      case 'operational': return 'Operational';
      case 'degraded': return 'Degraded';
      case 'outage': return 'Outage';
      case 'maintenance': return 'Maintenance';
      default: return 'Unknown';
    }
  };

  return (
    <div className={`p-5 rounded-lg border ${styles.borderColor} ${styles.bgColor} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-center space-x-3 mb-2">
        <div className={styles.iconColor}>
          {service.icon}
        </div>
        <h3 className="font-semibold text-lg">{service.name}</h3>
      </div>
      <div className="flex justify-between items-center mt-3">
        <span className={`font-medium ${styles.textColor} text-sm`}>
          {getStatusText()}
        </span>
        <span className="text-xs text-gray-500">
          Updated {formatDate(service.lastUpdated)}
        </span>
      </div>
    </div>
  );
};

export default StatusCard;
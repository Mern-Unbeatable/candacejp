import React from 'react';
import { MapPin, Calendar, Clock, CheckCircle, Sparkles } from 'lucide-react';

export default function NotificationCard({ notification }) {
  const getBadgeConfig = (type) => {
    switch (type) {
      case 'new':
        return { 
          icon: <Sparkles size={14} className="text-[#257AFC]" />, 
          iconBg: 'bg-blue-50',
          badgeText: 'New', 
          badgeStyle: 'bg-[#257AFC] text-white' 
        };
      case 'pending':
        return { 
          icon: <Clock size={14} className="text-[#257AFC]" />, 
          iconBg: 'bg-blue-50',
          badgeText: 'Pending', 
          badgeStyle: 'bg-orange-100 text-orange-500' 
        };
      case 'confirmed':
        return { 
          icon: <CheckCircle size={14} className="text-[#257AFC]" />, 
          iconBg: 'bg-blue-50',
          badgeText: 'Confirmed', 
          badgeStyle: 'bg-green-100 text-green-500' 
        };
      default:
        return { 
          icon: <Sparkles size={14} className="text-gray-500" />, 
          iconBg: 'bg-gray-100',
          badgeText: 'Update', 
          badgeStyle: 'bg-gray-100 text-gray-600' 
        };
    }
  };

  const config = getBadgeConfig(notification.type);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${config.iconBg}`}>
            {config.icon}
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${config.badgeStyle}`}>
            {config.badgeText}
          </span>
        </div>
        <span className="text-xs font-semibold text-[#257AFC] bg-blue-50 px-2.5 py-1 rounded-md">{notification.date}</span>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1.5">{notification.title}</h3>
        <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-2xl">{notification.description}</p>
      </div>

      <div className="flex items-center gap-6 border-t border-gray-50 mt-2">
        <div className="flex items-center gap-2 text-gray-500">
          <MapPin size={14} />
          <span className="text-xs font-medium">Route: {notification.route}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar size={14} />
          <span className="text-xs font-medium">Date: {notification.date}</span>
        </div>
      </div>
    </div>
  );
}

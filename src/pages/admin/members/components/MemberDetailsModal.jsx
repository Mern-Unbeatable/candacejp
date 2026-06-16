import React from "react";
import { X, User, Mail, Phone, MapPin, CreditCard } from "lucide-react";

export default function MemberDetailsModal({ member, onClose }) {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col transform transition-all">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900">Member Details</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold flex-shrink-0">
              {member.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Active Member
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <Mail className="text-gray-400 mt-0.5" size={18} />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
                <p className="text-sm font-medium text-gray-900">{member.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="text-gray-400 mt-0.5" size={18} />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone Number</p>
                <p className="text-sm font-medium text-gray-900">{member.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-gray-400 mt-0.5" size={18} />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Address</p>
                <p className="text-sm font-medium text-gray-900 leading-relaxed">{member.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCard className="text-gray-400 mt-0.5" size={18} />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Payment</p>
                <p className="text-sm font-medium text-gray-900">{member.payment}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-5 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

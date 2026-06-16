import React, { useState } from "react";
import ConciergeModal from "./ConciergeModal";

export default function ConciergeList({ initialData }) {
  const [concierges, setConcierges] = useState(initialData);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const toggleStatus = (id) => {
    setConcierges(concierges.map(c => 
      c.id === id ? { ...c, isActive: !c.isActive } : c
    ));
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <div className="bg-[#F4F4F4] rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
      <div className="flex flex-col gap-6">
        {concierges.map((user) => (
          <div key={user.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Left Side: Avatar and Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50/80 flex items-center justify-center flex-shrink-0">
                <span className="text-[#257AFC] font-medium text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{user.name}</h3>
                <p className="text-xs font-medium text-gray-400 mt-0.5 tracking-wide">
                  {user.email} <span className="mx-1">•</span> {user.phone}
                </p>
              </div>
            </div>

            {/* Right Side: Actions */}
            <div className="flex items-center gap-3">
              {/* Toggle Switch */}
              <div className="flex items-center gap-2 mr-2">
                <button 
                  onClick={() => toggleStatus(user.id)}
                  className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${
                    user.isActive ? "bg-[#257AFC]" : "bg-gray-400"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    user.isActive ? "translate-x-5" : "translate-x-0"
                  }`} />
                </button>
                <span className="text-sm font-medium text-gray-900 bg-[#FFFFFF] px-3 py-1.5 rounded-md w-20 text-center">
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Edit Button */}
              <button 
                onClick={() => handleEditClick(user)}
                className="px-4 py-1.5 bg-[#EEEEEE] hover:bg-gray-200 text-gray-900 text-sm font-medium rounded-md transition-colors"
              >
                Edit
              </button>

              {/* Delete Button */}
              <button className="px-4 py-1.5 bg-[#FDECEC] text-[#EA0303] hover:bg-red-100 text-sm font-medium rounded-md transition-colors">
                Delete
              </button>
            </div>
            
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <ConciergeModal 
        isOpen={isEditModalOpen}
        mode="edit"
        initialData={editingUser}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(updatedData) => {
          setConcierges(concierges.map(c => c.id === editingUser.id ? { ...c, ...updatedData } : c));
        }}
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ConciergeModal({ isOpen, mode, initialData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Populate data when opening in edit mode
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && initialData) {
        setFormData({
          name: initialData.name || "",
          email: initialData.email || "",
          phone: initialData.phone || "",
          password: "", // Usually don't pre-fill password for editing
        });
      } else {
        // Reset form for add mode
        setFormData({ name: "", email: "", phone: "", password: "" });
      }
    }
  }, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 p-1"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* Header */}
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
            {mode === "add" ? "New Concierge" : "Edit Concierge"}
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name here" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your e-mail here" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Telephone</label>
              <input 
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter telephone no. here" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password ( minimum 6 characters)</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required={mode === "add"}
                minLength={6}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end items-center gap-3 pt-6 mt-2 border-t border-gray-50">
              <button 
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-[#E5E7EB] hover:bg-gray-300 text-gray-800 text-sm font-semibold rounded-full transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-5 py-2 bg-[#257AFC] hover:bg-blue-600 text-white text-sm font-semibold rounded-full transition-colors shadow-sm"
              >
                {mode === "add" ? "Create" : "Save"}
              </button>
            </div>
            
          </form>
        </div>

      </div>
    </div>
  );
}

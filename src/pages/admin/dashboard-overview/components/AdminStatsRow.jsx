import React from "react";
import { Users, UserCircle, Target, DollarSign } from "lucide-react";

export default function AdminStatsRow() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
        <div className="bg-[#257AFC] text-white p-3 rounded-lg flex-shrink-0">
          <Users size={20} />
        </div>
        <div>
          <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">
            Total Members
          </p>
          <p className="text-xl md:text-2xl font-bold text-gray-900">2.9k</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
        <div className="bg-gray-100 text-gray-600 p-3 rounded-lg flex-shrink-0">
          <UserCircle size={20} />
        </div>
        <div>
          <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">
            Staff
          </p>
          <p className="text-2xl font-bold text-gray-900">12</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col justify-center relative">
        <div className="">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 text-gray-600 p-3 rounded-lg flex-shrink-0">
              <Target size={20} />
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">
                Total Interest
              </p>
              <p className="text-2xl font-bold text-gray-900">50</p>
            </div>
          </div>
          <p className="text-xs font-bold text-[#4CAF50]  px-2 py-1 rounded">
            This Month
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
        <div className="bg-gray-100 text-gray-600 p-3 rounded-lg flex-shrink-0">
          <DollarSign size={20} />
        </div>
        <div>
          <p className="text-xs uppercase font-bold text-gray-500 tracking-wider">
            Total Revenue
          </p>
          <p className="text-2xl font-bold text-gray-900">$ 400.00</p>
        </div>
      </div>
    </div>
  );
}

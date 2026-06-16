import React, { useEffect } from "react";
import ConciergeList from "./components/ConciergeList";
import { Plus } from "lucide-react";

const dummyConcierges = [
  {
    id: 1,
    name: "Tet",
    email: "test@gmail.com",
    phone: "017xxxxxxxxx",
    isActive: true,
  },
  {
    id: 2,
    name: "Kitchen",
    email: "bestellungen@tarantella.at",
    phone: "",
    isActive: true,
  },
  {
    id: 3,
    name: "thank you",
    email: "sub@restaurant.local",
    phone: "+8801757525035",
    isActive: false,
  },
];

export default function AddConcierge() {
  useEffect(() => {
    document.title = "Concierges - Admin | RAVEN";
  }, []);

  return (
    <div className="mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="mb-6 mt-4">
          <h1 className="font-serif text-2xl md:text-4xl font-bold text-gray-900 tracking-tigh">
            Concierge
          </h1>
          <p className="mt-2 text-lg text-gray-800">
            Manage concierge staff and operations efficiently.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#257AFC] hover:bg-blue-600 text-white font-medium rounded-full transition-colors shadow-sm w-full md:w-auto">
          <Plus size={18} />
          New Concierge
        </button>
      </div>

      {/* Main Content List */}
      <ConciergeList initialData={dummyConcierges} />
    </div>
  );
}

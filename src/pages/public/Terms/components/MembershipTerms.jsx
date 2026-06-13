import { Star, Headphones, Navigation, CheckCircle2 } from "lucide-react";

export default function MembershipTerms() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm">
      <p className="mb-10 text-sm lg:text-base text-gray-900 font-medium leading-relaxed max-w-3xl">
        Membership at Raven grants access to a curated ecosystem of shared charter opportunities. Rather than booking an entire aircraft, members can purchase individual seats or blocks of time on pre-existing flight paths.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
        <div className="flex items-center space-x-4 border-b border-gray-100 pb-4">
          <Star className="w-5 h-5 text-gray-400 stroke-[1.5]" />
          <span className="text-sm lg:text-base text-[#555555]">Curated shared opportunities</span>
        </div>
        <div className="flex items-center space-x-4 border-b border-gray-100 pb-4">
          <Headphones className="w-5 h-5 text-gray-400 stroke-[1.5]" />
          <span className="text-sm lg:text-base text-[#555555]">Concierge coordination</span>
        </div>
        <div className="flex items-center space-x-4 border-b border-gray-100 pb-4">
          <Navigation className="w-5 h-5 text-gray-400 stroke-[1.5]" />
          <span className="text-sm lg:text-base text-[#555555]">Priority route access</span>
        </div>
        <div className="flex items-center space-x-4 border-b border-gray-100 pb-4">
          <CheckCircle2 className="w-5 h-5 text-gray-400 stroke-[1.5]" />
          <span className="text-sm lg:text-base text-[#555555]">Priority route access</span>
        </div>
      </div>
    </div>
  );
}

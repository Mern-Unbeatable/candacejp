import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "./Footer";
import ExperienceBanner from "./ExperienceBanner";
import Navbar from "./Navbar";

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col  text-ink-500">
      <ScrollRestoration />
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>
      {/* 
      <footer className="border-t border-ink-50 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-ink-300 sm:px-6">
          <p>&copy; {new Date().getFullYear()} CandaceJP. All rights reserved.</p>
        </div>
      </footer> */}
      <Footer />
    </div>
  );
}

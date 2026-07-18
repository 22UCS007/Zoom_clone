"use client";

import { Search, Settings, User, Bell } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16 flex items-center px-6">
      <div className="flex items-center gap-3 mr-8">
        <div className="w-9 h-9 bg-zoom-blue rounded-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 2H8.5C7.12 2 6 3.12 6 4.5V19.5C6 20.88 7.12 22 8.5 22H15.5C16.88 22 18 20.88 18 19.5V4.5C18 3.12 16.88 2 15.5 2Z" fill="white"/>
            <path d="M4 7V5.5C4 4.67 4.67 4 5.5 4H6V7H4Z" fill="white"/>
            <path d="M22 7V5.5C22 4.67 21.33 4 20.5 4H18V7H22Z" fill="white"/>
            <circle cx="12" cy="12" r="3" fill="#2D8CFF"/>
          </svg>
        </div>
        <span className="text-xl font-semibold text-gray-800 hidden sm:block">ZoomClone</span>
      </div>

      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-gray-100 border border-transparent focus:border-zoom-blue focus:bg-white focus:outline-none text-sm transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500">
          <Bell className="h-5 w-5" />
        </button>
        <button className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500">
          <Settings className="h-5 w-5" />
        </button>
        <div className="w-9 h-9 rounded-full bg-zoom-blue flex items-center justify-center text-white text-sm font-medium ml-1 cursor-pointer hover:bg-zoom-blue-dark transition-colors">
          <User className="h-4 w-4" />
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ActionCards from "@/components/ActionCards";
import MeetingLists from "@/components/MeetingLists";

export default function HomePage() {
  const [userName] = useState("User");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Welcome to ZoomClone
          </h1>
          <p className="text-gray-500 text-base">
            Video meetings for everyone. Get started by creating or joining a meeting.
          </p>
        </div>

        <ActionCards userName={userName} />
        <MeetingLists />
      </main>
    </div>
  );
}

"use client";

import { Suspense } from "react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ActionCards from "@/components/ActionCards";
import MeetingLists from "@/components/MeetingLists";

function HomeContent() {
  const [userName] = useState("User");

  return (
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
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense
        fallback={
          <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="animate-pulse text-gray-400">Loading...</div>
          </div>
        }
      >
        <HomeContent />
      </Suspense>
    </div>
  );
}

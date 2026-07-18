"use client";

import { Suspense } from "react";
import MeetingPage from "./MeetingPage";

export default function Page({ params }: { params: Promise<{ meetingId: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading meeting...</div>
        </div>
      }
    >
      <MeetingPage params={params} />
    </Suspense>
  );
}

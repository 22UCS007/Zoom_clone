"use client";

import { Suspense } from "react";
import JoinMeetingForm from "@/components/JoinMeetingForm";

export default function JoinPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      }
    >
      <JoinMeetingForm />
    </Suspense>
  );
}

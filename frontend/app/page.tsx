"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MeetingRoom from "@/components/MeetingRoom";
import { meetingApi } from "@/services/api";

export default function JoinPage() {
  const searchParams = useSearchParams();
  const meetingId = searchParams.get("meeting");
  const displayName = searchParams.get("name") || "Guest";

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!meetingId) {
      setError("Meeting ID is missing.");
      setStatus("error");
      return;
    }

    const joinMeeting = async () => {
      try {
        await meetingApi.joinMeeting({
          meeting_id: meetingId,
          display_name: displayName,
        });
        setStatus("ready");
      } catch {
        setError("Failed to join the meeting.");
        setStatus("error");
      }
    };

    joinMeeting();
  }, [meetingId, displayName]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Joining meeting...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return <MeetingRoom meetingId={meetingId!} displayName={displayName} isHost={false} />;
}

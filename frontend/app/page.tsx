"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MeetingRoom from "@/components/MeetingRoom";
import { meetingApi } from "@/services/api";

export default function JoinPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meetingId = searchParams.get("meeting");
  const displayName = searchParams.get("name") || "Guest";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!meetingId) {
      setError("Meeting ID is missing.");
      setLoading(false);
      return;
    }

    const join = async () => {
      try {
        await meetingApi.joinMeeting({
          meeting_id: meetingId,
          display_name: displayName,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to join the meeting.");
        setLoading(false);
      }
    };

    join();
  }, [meetingId, displayName]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Joining meeting...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  return <MeetingRoom meetingId={meetingId} displayName={displayName} isHost={false} />;
}

"use client";

import { useParams, useSearchParams } from "next/navigation";
import MeetingRoom from "@/components/MeetingRoom";

export default function MeetingPage() {
  const params = useParams();
  const meetingId = params.meetingId as string;

  const searchParams = useSearchParams();
  const displayName = searchParams.get("name") || "Guest";

  return (
    <MeetingRoom
      meetingId={meetingId}
      displayName={displayName}
      isHost={false}
    />
  );
}

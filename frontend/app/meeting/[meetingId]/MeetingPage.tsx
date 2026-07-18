"use client";

import { useSearchParams } from "next/navigation";
import MeetingRoom from "@/components/MeetingRoom";

interface MeetingPageProps {
  params: { meetingId: string };
}

export default function MeetingPage({ params }: MeetingPageProps) {
  const meetingId = params.meetingId;
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

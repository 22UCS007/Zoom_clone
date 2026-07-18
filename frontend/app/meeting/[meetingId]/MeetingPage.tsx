"use client";

import MeetingRoom from "@/components/MeetingRoom";

interface MeetingPageProps {
  params: { meetingId: string };
}

export default function MeetingPage({ params }: MeetingPageProps) {
  const meetingId = params.meetingId;

  return (
    <MeetingRoom
      meetingId={meetingId}
      displayName="Guest"
      isHost={false}
    />
  );
}

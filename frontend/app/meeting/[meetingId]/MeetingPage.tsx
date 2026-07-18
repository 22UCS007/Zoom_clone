"use client";

import { use } from "react";
import MeetingRoom from "@/components/MeetingRoom";

interface MeetingPageProps {
  params: Promise<{ meetingId: string }>;
}

export default function MeetingPage({ params }: MeetingPageProps) {
  const { meetingId } = use(params);

  return (
    <MeetingRoom
      meetingId={meetingId}
      displayName="Guest"
      isHost={false}
    />
  );
}

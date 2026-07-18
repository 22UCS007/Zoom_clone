"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";
import MeetingRoom from "@/components/MeetingRoom";

interface MeetingPageProps {
  params: Promise<{ meetingId: string }>;
}

export default function MeetingPage({ params }: MeetingPageProps) {
  const { meetingId } = use(params);
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

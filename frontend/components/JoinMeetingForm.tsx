"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useJoinMeeting } from "@/hooks/useMeetings";

export default function JoinMeetingForm() {
  const router = useRouter();

  const [meetingId, setMeetingId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const joinMeeting = useJoinMeeting();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const preset = params.get("meeting") || "";
    if (preset) setMeetingId(preset);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!meetingId.trim()) {
      setError("Please enter a Meeting ID");
      return;
    }
    if (!displayName.trim()) {
      setError("Please enter your display name");
      return;
    }

    try {
      const result = await joinMeeting.mutateAsync({
        meeting_id: meetingId.trim(),
        display_name: displayName.trim(),
      });
      router.push(`/meeting/${result.meeting_id}?name=${encodeURIComponent(displayName.trim())}`);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosErr = err as { response?: { data?: { detail?: string } } };
        setError(axiosErr.response?.data?.detail || "Meeting not found. Please check the Meeting ID.");
      } else {
        setError("Failed to join meeting. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-zoom-blue rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15.5 2H8.5C7.12 2 6 3.12 6 4.5V19.5C6 20.88 7.12 22 8.5 22H15.5C16.88 22 18 20.88 18 19.5V4.5C18 3.12 16.88 2 15.5 2Z" fill="white"/>
              <circle cx="12" cy="12" r="3" fill="#2D8CFF"/>
            </svg>
          </div>
          <span className="text-xl font-semibold text-gray-800">ZoomClone</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <Video className="h-8 w-8 text-zoom-blue" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Join a Meeting</h1>
              <p className="text-gray-500 text-sm mt-2">Enter the meeting details below to join</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="meeting-id" className="text-sm font-medium text-gray-700">
                  Meeting ID
                </Label>
                <Input
                  id="meeting-id"
                  placeholder="e.g. 872 492 153"
                  value={meetingId}
                  onChange={(e) => setMeetingId(e.target.value)}
                  className="mt-1.5 text-center text-lg tracking-widest font-mono font-medium"
                />
              </div>

              <div>
                <Label htmlFor="display-name" className="text-sm font-medium text-gray-700">
                  Your Name
                </Label>
                <Input
                  id="display-name"
                  placeholder="Enter your display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-1.5"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base"
                disabled={joinMeeting.isPending}
              >
                {joinMeeting.isPending ? (
                  "Joining..."
                ) : (
                  <>
                    Join Meeting
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

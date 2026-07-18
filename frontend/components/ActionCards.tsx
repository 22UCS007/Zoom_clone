"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Video,
  Users,
  CalendarPlus,
  Copy,
  Check,
  ArrowRight,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCreateMeeting, useScheduleMeeting, useJoinMeeting } from "@/hooks/useMeetings";

interface ActionCardsProps {
  userName: string;
}

export default function ActionCards({ userName }: ActionCardsProps) {
  const router = useRouter();
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [newMeetingData, setNewMeetingData] = useState<{
    meeting_id: string;
    meeting_link: string;
  } | null>(null);
  const [joinMeetingId, setJoinMeetingId] = useState("");
  const [joinError, setJoinError] = useState("");

  const createMeeting = useCreateMeeting();
  const scheduleMeeting = useScheduleMeeting();
  const joinMeeting = useJoinMeeting();

  const [scheduleForm, setScheduleForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: 60,
  });

  const handleNewMeeting = async () => {
    try {
      const result = await createMeeting.mutateAsync({ host_name: userName });
      setNewMeetingData({
        meeting_id: result.meeting_id,
        meeting_link: result.meeting_link,
      });
      setShowNewMeetingModal(true);
    } catch {
      alert("Failed to create meeting. Please try again.");
    }
  };

  const handleCopyLink = () => {
    if (newMeetingData) {
      navigator.clipboard.writeText(newMeetingData.meeting_link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleJoinFromModal = () => {
    if (newMeetingData) {
      router.push(`/join?meeting=${newMeetingData.meeting_id}`);
    }
  };

  const handleScheduleMeeting = async () => {
    try {
      await scheduleMeeting.mutateAsync({
        ...scheduleForm,
        host_name: userName,
      });
      setShowScheduleModal(false);
      setScheduleForm({ title: "", description: "", date: "", time: "", duration: 60 });
    } catch {
      alert("Failed to schedule meeting. Please try again.");
    }
  };

  const handleJoinMeeting = async () => {
    setJoinError("");
    if (!joinMeetingId.trim()) {
      setJoinError("Please enter a Meeting ID");
      return;
    }
    router.push(`/join?meeting=${joinMeetingId.trim()}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <button
          onClick={handleNewMeeting}
          disabled={createMeeting.isPending}
          className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-gray-100 transition-all duration-200 text-left flex flex-col items-start gap-4 cursor-pointer hover:border-zoom-blue/30"
        >
          <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-zoom-blue group-hover:text-white transition-all duration-200 text-zoom-blue">
            <Video className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">New Meeting</h3>
            <p className="text-sm text-gray-500">Start an instant meeting with anyone</p>
          </div>
        </button>

        <button
          onClick={() => setShowJoinModal(true)}
          className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-gray-100 transition-all duration-200 text-left flex flex-col items-start gap-4 cursor-pointer hover:border-zoom-blue/30"
        >
          <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-all duration-200 text-purple-500">
            <Users className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Join Meeting</h3>
            <p className="text-sm text-gray-500">Join an existing meeting by ID</p>
          </div>
        </button>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-gray-100 transition-all duration-200 text-left flex flex-col items-start gap-4 cursor-pointer hover:border-zoom-blue/30"
        >
          <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all duration-200 text-green-500">
            <CalendarPlus className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Schedule Meeting</h3>
            <p className="text-sm text-gray-500">Schedule a meeting for later</p>
          </div>
        </button>
      </div>

      {/* New Meeting Modal */}
      <Dialog open={showNewMeetingModal} onOpenChange={setShowNewMeetingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">New Meeting Created</DialogTitle>
            <DialogDescription>
              Share this meeting ID or link with others to join.
            </DialogDescription>
          </DialogHeader>
          {newMeetingData && (
            <div className="space-y-4 mt-2">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Meeting ID</p>
                <p className="text-2xl font-bold text-gray-800 tracking-wider">{newMeetingData.meeting_id}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Meeting Link</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600 truncate flex-1">{newMeetingData.meeting_link}</p>
                  <button
                    onClick={handleCopyLink}
                    className="shrink-0 w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setShowNewMeetingModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleJoinFromModal}>
                  Join Meeting <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Join Meeting Modal */}
      <Dialog open={showJoinModal} onOpenChange={setShowJoinModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Join Meeting</DialogTitle>
            <DialogDescription>
              Enter the Meeting ID to join an existing meeting.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="join-id" className="text-sm font-medium text-gray-700">
                Meeting ID
              </Label>
              <Input
                id="join-id"
                placeholder="e.g. 872 492 153"
                value={joinMeetingId}
                onChange={(e) => setJoinMeetingId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoinMeeting()}
                className="mt-1.5 text-base tracking-wider text-center font-medium"
              />
            </div>
            {joinError && (
              <p className="text-sm text-red-500">{joinError}</p>
            )}
            <Button className="w-full" onClick={handleJoinMeeting}>
              Join Meeting <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Meeting Modal */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Schedule Meeting</DialogTitle>
            <DialogDescription>
              Fill in the details to schedule a future meeting.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">Title</Label>
              <Input
                id="title"
                placeholder="Meeting title"
                value={scheduleForm.title}
                onChange={(e) => setScheduleForm({ ...scheduleForm, title: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
              <Textarea
                id="description"
                placeholder="Meeting description (optional)"
                value={scheduleForm.description}
                onChange={(e) => setScheduleForm({ ...scheduleForm, description: e.target.value })}
                className="mt-1.5"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-sm font-medium text-gray-700">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-sm font-medium text-gray-700">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                  className="mt-1.5"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="duration" className="text-sm font-medium text-gray-700">Duration (minutes)</Label>
              <select
                id="duration"
                value={scheduleForm.duration}
                onChange={(e) => setScheduleForm({ ...scheduleForm, duration: Number(e.target.value) })}
                className="mt-1.5 flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zoom-blue focus-visible:ring-offset-2"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
            <Button
              className="w-full"
              onClick={handleScheduleMeeting}
              disabled={scheduleMeeting.isPending}
            >
              {scheduleMeeting.isPending ? "Scheduling..." : "Schedule Meeting"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

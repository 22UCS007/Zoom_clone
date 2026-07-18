"use client";

import { Clock, Users, Copy, ExternalLink, Calendar } from "lucide-react";
import { Meeting } from "@/types";
import { formatDate, formatTime, formatDuration } from "@/utils/format";

interface MeetingCardProps {
  meeting: Meeting;
  type: "upcoming" | "recent";
}

export default function MeetingCard({ meeting, type }: MeetingCardProps) {
  const handleCopyId = () => {
    navigator.clipboard.writeText(meeting.meeting_id);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-card border border-gray-100 hover:shadow-card-hover transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-800 truncate">
            {meeting.title || "Instant Meeting"}
          </h4>
          <p className="text-xs text-gray-400 mt-0.5">Host: {meeting.host_name}</p>
        </div>
        <span
          className={`shrink-0 ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${
            type === "upcoming"
              ? "bg-green-50 text-green-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {type === "upcoming" ? "Scheduled" : "Ended"}
        </span>
      </div>

      <div className="space-y-1.5 mb-3">
        {meeting.scheduled_time && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(meeting.scheduled_time)}</span>
            <Clock className="h-3.5 w-3.5 ml-1" />
            <span>{formatTime(meeting.scheduled_time)}</span>
          </div>
        )}
        {meeting.duration && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatDuration(meeting.duration)}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyId}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-zoom-blue transition-colors"
            title="Copy Meeting ID"
          >
            <Copy className="h-3.5 w-3.5" />
            <span className="font-mono">{meeting.meeting_id}</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Users className="h-3.5 w-3.5" />
            <span>{meeting.participant_count ?? 0}</span>
          </div>
          <a
            href={`/join?meeting=${meeting.meeting_id}`}
            className="flex items-center gap-1 text-xs text-zoom-blue hover:text-zoom-blue-dark transition-colors font-medium"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Join
          </a>
        </div>
      </div>
    </div>
  );
}

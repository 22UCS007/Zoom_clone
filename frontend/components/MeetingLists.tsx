"use client";

import { useUpcomingMeetings, useRecentMeetings } from "@/hooks/useMeetings";
import MeetingCard from "./MeetingCard";

export default function MeetingLists() {
  const { data: upcoming, isLoading: loadingUpcoming } = useUpcomingMeetings();
  const { data: recent, isLoading: loadingRecent } = useRecentMeetings();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Upcoming Meetings</h2>
          {upcoming && upcoming.length > 0 && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
              {upcoming.length}
            </span>
          )}
        </div>
        {loadingUpcoming ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-card border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-1/2 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : upcoming && upcoming.length > 0 ? (
          <div className="space-y-3">
            {upcoming.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} type="upcoming" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 shadow-card border border-gray-100 text-center">
            <p className="text-gray-400 text-sm">No upcoming meetings</p>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Meetings</h2>
          {recent && recent.length > 0 && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
              {recent.length}
            </span>
          )}
        </div>
        {loadingRecent ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-card border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-1/2 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : recent && recent.length > 0 ? (
          <div className="space-y-3">
            {recent.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} type="recent" />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 shadow-card border border-gray-100 text-center">
            <p className="text-gray-400 text-sm">No recent meetings</p>
          </div>
        )}
      </div>
    </div>
  );
}

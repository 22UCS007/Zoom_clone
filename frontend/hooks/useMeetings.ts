"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { meetingApi } from "@/services/api";
import {
  CreateMeetingPayload,
  JoinMeetingPayload,
  ScheduleMeetingPayload,
} from "@/types";

export function useUpcomingMeetings() {
  return useQuery({
    queryKey: ["meetings", "upcoming"],
    queryFn: meetingApi.getUpcoming,
  });
}

export function useRecentMeetings() {
  return useQuery({
    queryKey: ["meetings", "recent"],
    queryFn: meetingApi.getRecent,
  });
}

export function useMeeting(meetingId: string) {
  return useQuery({
    queryKey: ["meetings", meetingId],
    queryFn: () => meetingApi.getMeeting(meetingId),
    enabled: !!meetingId,
  });
}

export function useCreateMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMeetingPayload) => meetingApi.createMeeting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
    },
  });
}

export function useScheduleMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ScheduleMeetingPayload) => meetingApi.scheduleMeeting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
    },
  });
}

export function useJoinMeeting() {
  return useMutation({
    mutationFn: (data: JoinMeetingPayload) => meetingApi.joinMeeting(data),
  });
}

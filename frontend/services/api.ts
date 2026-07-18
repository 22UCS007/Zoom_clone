import axios from "axios";
import {
  CreateMeetingPayload,
  CreateMeetingResponse,
  JoinMeetingPayload,
  JoinMeetingResponse,
  Meeting,
  ScheduleMeetingPayload,
} from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const meetingApi = {
  createMeeting: async (data: CreateMeetingPayload): Promise<CreateMeetingResponse> => {
    const response = await api.post("/meetings/new", data);
    return response.data;
  },

  scheduleMeeting: async (data: ScheduleMeetingPayload): Promise<Meeting> => {
    const response = await api.post("/meetings/schedule", data);
    return response.data;
  },

  joinMeeting: async (data: JoinMeetingPayload): Promise<JoinMeetingResponse> => {
    const response = await api.post("/meetings/join", data);
    return response.data;
  },

  getUpcoming: async (): Promise<Meeting[]> => {
    const response = await api.get("/meetings/upcoming");
    return response.data;
  },

  getRecent: async (): Promise<Meeting[]> => {
    const response = await api.get("/meetings/recent");
    return response.data;
  },

  getMeeting: async (meetingId: string): Promise<Meeting> => {
    const response = await api.get(`/meetings/${meetingId}`);
    return response.data;
  },
};

export default api;

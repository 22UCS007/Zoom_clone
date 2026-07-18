export interface Meeting {
  id: number;
  meeting_id: string;
  title: string | null;
  description: string | null;
  host_name: string;
  scheduled_time: string | null;
  duration: number | null;
  meeting_link: string | null;
  status: string;
  created_at: string;
  participants?: Participant[];
  participant_count?: number;
}

export interface Participant {
  id: number;
  display_name: string;
  joined_at: string;
  left_at: string | null;
  is_host: boolean;
}

export interface CreateMeetingResponse {
  id: number;
  meeting_id: string;
  meeting_link: string;
  host_name: string;
  status: string;
  created_at: string;
}

export interface JoinMeetingResponse {
  id: number;
  meeting_id: string;
  meeting_link: string;
  display_name: string;
  is_host: boolean;
}

export interface JoinMeetingPayload {
  meeting_id: string;
  display_name: string;
}

export interface CreateMeetingPayload {
  host_name: string;
}

export interface ScheduleMeetingPayload {
  title: string;
  description?: string;
  host_name: string;
  date: string;
  time: string;
  duration: number;
}

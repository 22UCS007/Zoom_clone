from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class MeetingCreate(BaseModel):
    host_name: str


class MeetingSchedule(BaseModel):
    title: str
    description: Optional[str] = None
    host_name: str
    date: str
    time: str
    duration: int


class MeetingJoin(BaseModel):
    meeting_id: str
    display_name: str


class ParticipantResponse(BaseModel):
    id: int
    display_name: str
    joined_at: datetime
    left_at: Optional[datetime] = None
    is_host: bool

    model_config = {"from_attributes": True}


class MeetingCreateResponse(BaseModel):
    id: int
    meeting_id: str
    meeting_link: str
    host_name: str
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class MeetingJoinResponse(BaseModel):
    id: int
    meeting_id: str
    meeting_link: str
    display_name: str
    is_host: bool

    model_config = {"from_attributes": True}


class MeetingDetail(BaseModel):
    id: int
    meeting_id: str
    title: Optional[str] = None
    description: Optional[str] = None
    host_name: str
    scheduled_time: Optional[datetime] = None
    duration: Optional[int] = None
    meeting_link: Optional[str] = None
    status: str
    created_at: datetime
    participants: list[ParticipantResponse] = []

    model_config = {"from_attributes": True}


class MeetingListResponse(BaseModel):
    id: int
    meeting_id: str
    title: Optional[str] = None
    host_name: str
    scheduled_time: Optional[datetime] = None
    duration: Optional[int] = None
    meeting_link: Optional[str] = None
    status: str
    created_at: datetime
    participant_count: int = 0

    model_config = {"from_attributes": True}

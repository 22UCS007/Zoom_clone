from datetime import datetime
from typing import Optional

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.config import settings
from app.models.meeting import Meeting
from app.models.participant import Participant
from app.schemas.meeting import MeetingCreate, MeetingJoin, MeetingSchedule
from urllib.parse import quote


def create_instant_meeting(db: Session, data: MeetingCreate) -> Meeting:
    meeting = Meeting(
        host_name=data.host_name,
        status="active",
    )
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    meeting.meeting_link = f"{settings.FRONTEND_URL}/join?meeting={quote(meeting.meeting_id)}"
    db.commit()
    db.refresh(meeting)

    participant = Participant(
        meeting_id=meeting.id,
        display_name=data.host_name,
        is_host=True,
    )
    db.add(participant)
    db.commit()

    return meeting


def schedule_meeting(db: Session, data: MeetingSchedule) -> Meeting:
    scheduled_dt = datetime.strptime(f"{data.date} {data.time}", "%Y-%m-%d %H:%M")

    meeting = Meeting(
        title=data.title,
        description=data.description,
        host_name=data.host_name,
        scheduled_time=scheduled_dt,
        duration=data.duration,
        status="scheduled",
    )
    db.add(meeting)
    db.commit()
    db.refresh(meeting)
    meeting.meeting_link = f"{settings.FRONTEND_URL}/join?meeting={quote(meeting.meeting_id)}"
    db.commit()
    db.refresh(meeting)

    return meeting


def join_meeting(db: Session, data: MeetingJoin) -> Optional[Meeting]:
    meeting = db.query(Meeting).filter(Meeting.meeting_id == data.meeting_id).first()
    if not meeting:
        return None

    participant = Participant(
        meeting_id=meeting.id,
        display_name=data.display_name,
        is_host=False,
    )
    db.add(participant)
    db.commit()
    db.refresh(meeting)

    return meeting


def get_meeting_by_id(db: Session, meeting_id: str) -> Optional[Meeting]:
    return db.query(Meeting).filter(Meeting.meeting_id == meeting_id).first()


def get_upcoming_meetings(db: Session) -> list[Meeting]:
    now = datetime.utcnow()
    meetings = (
        db.query(Meeting)
        .filter(
            (Meeting.scheduled_time > now) | (Meeting.status == "scheduled")
        )
        .order_by(Meeting.scheduled_time.asc())
        .all()
    )
    return meetings


def get_recent_meetings(db: Session) -> list[Meeting]:
    meetings = (
        db.query(Meeting)
        .order_by(Meeting.created_at.desc())
        .limit(10)
        .all()
    )
    return meetings


def get_participant_count(db: Session, meeting_id: int) -> int:
    return db.query(func.count(Participant.id)).filter(Participant.meeting_id == meeting_id).scalar()

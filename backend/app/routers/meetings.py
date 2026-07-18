from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.meeting import (
    MeetingCreate,
    MeetingCreateResponse,
    MeetingDetail,
    MeetingJoin,
    MeetingJoinResponse,
    MeetingListResponse,
    MeetingSchedule,
)
from app.services.meeting_service import (
    create_instant_meeting,
    get_meeting_by_id,
    get_participant_count,
    get_recent_meetings,
    get_upcoming_meetings,
    join_meeting,
    schedule_meeting,
)

router = APIRouter(prefix="/meetings", tags=["meetings"])


@router.post("/new", response_model=MeetingCreateResponse)
def create_new_meeting(data: MeetingCreate, db: Session = Depends(get_db)):
    meeting = create_instant_meeting(db, data)
    return meeting


@router.post("/schedule", response_model=MeetingDetail)
def schedule_new_meeting(data: MeetingSchedule, db: Session = Depends(get_db)):
    meeting = schedule_meeting(db, data)
    return meeting


@router.post("/join", response_model=MeetingJoinResponse)
def join_existing_meeting(data: MeetingJoin, db: Session = Depends(get_db)):
    meeting = join_meeting(db, data)
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found. Please check the Meeting ID.")

    participant = meeting.participants[-1] if meeting.participants else None
    return MeetingJoinResponse(
        id=meeting.id,
        meeting_id=meeting.meeting_id,
        meeting_link=meeting.meeting_link or "",
        display_name=participant.display_name if participant else data.display_name,
        is_host=participant.is_host if participant else False,
    )


@router.get("/upcoming", response_model=list[MeetingListResponse])
def list_upcoming_meetings(db: Session = Depends(get_db)):
    meetings = get_upcoming_meetings(db)
    result = []
    for m in meetings:
        m.participant_count = get_participant_count(db, m.id)
        result.append(m)
    return result


@router.get("/recent", response_model=list[MeetingListResponse])
def list_recent_meetings(db: Session = Depends(get_db)):
    meetings = get_recent_meetings(db)
    result = []
    for m in meetings:
        m.participant_count = get_participant_count(db, m.id)
        result.append(m)
    return result


@router.get("/{meeting_id}", response_model=MeetingDetail)
def get_meeting_details(meeting_id: str, db: Session = Depends(get_db)):
    meeting = get_meeting_by_id(db, meeting_id)
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found.")
    return meeting

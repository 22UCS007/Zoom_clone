from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ParticipantCreate(BaseModel):
    meeting_id: str
    display_name: str


class ParticipantOut(BaseModel):
    id: int
    meeting_id: int
    display_name: str
    joined_at: datetime
    left_at: Optional[datetime] = None
    is_host: bool

    model_config = {"from_attributes": True}

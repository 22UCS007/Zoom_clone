import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base


def generate_meeting_id() -> str:
    parts = []
    for _ in range(3):
        part = ""
        for _ in range(3):
            part += str(uuid.uuid4().int % 10)
        parts.append(part)
    return " ".join(parts)


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(String(11), unique=True, index=True, default=generate_meeting_id)
    title = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)
    host_name = Column(String(255), nullable=False)
    scheduled_time = Column(DateTime, nullable=True)
    duration = Column(Integer, nullable=True)
    meeting_link = Column(String(500), nullable=True)
    status = Column(String(20), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)

    participants = relationship("Participant", back_populates="meeting", cascade="all, delete-orphan")

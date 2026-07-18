from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.config import settings
from app.database import SessionLocal
from app.models.meeting import Meeting
from app.models.participant import Participant


def seed_data():
    db = SessionLocal()
    try:
        existing = db.query(Meeting).count()
        if existing > 0:
            return

        now = datetime.utcnow()

        upcoming_data = [
            {
                "title": "Sprint Planning",
                "description": "Weekly sprint planning meeting",
                "host_name": "Alice Johnson",
                "scheduled_time": now + timedelta(days=1, hours=2),
                "duration": 60,
                "status": "scheduled",
            },
            {
                "title": "Design Review",
                "description": "Review new UI designs for the dashboard",
                "host_name": "Bob Smith",
                "scheduled_time": now + timedelta(days=2, hours=3),
                "duration": 45,
                "status": "scheduled",
            },
            {
                "title": "Team Standup",
                "description": "Daily standup meeting",
                "host_name": "Carol White",
                "scheduled_time": now + timedelta(days=3, hours=1),
                "duration": 30,
                "status": "scheduled",
            },
            {
                "title": "Product Demo",
                "description": "Demo new features to stakeholders",
                "host_name": "David Lee",
                "scheduled_time": now + timedelta(days=4, hours=4),
                "duration": 90,
                "status": "scheduled",
            },
            {
                "title": "Retrospective",
                "description": "Sprint retrospective meeting",
                "host_name": "Eve Martinez",
                "scheduled_time": now + timedelta(days=5, hours=2),
                "duration": 60,
                "status": "scheduled",
            },
        ]

        recent_data = [
            {
                "title": "Code Review Session",
                "description": "Review pull requests",
                "host_name": "Frank Brown",
                "scheduled_time": None,
                "duration": None,
                "status": "ended",
                "created_at": now - timedelta(hours=2),
            },
            {
                "title": "Client Call",
                "description": "Monthly client update call",
                "host_name": "Grace Kim",
                "scheduled_time": None,
                "duration": None,
                "status": "ended",
                "created_at": now - timedelta(hours=5),
            },
            {
                "title": "Architecture Discussion",
                "description": "Discuss microservices migration",
                "host_name": "Henry Wang",
                "scheduled_time": None,
                "duration": None,
                "status": "ended",
                "created_at": now - timedelta(days=1),
            },
            {
                "title": "Onboarding Session",
                "description": "New team member onboarding",
                "host_name": "Iris Patel",
                "scheduled_time": None,
                "duration": None,
                "status": "ended",
                "created_at": now - timedelta(days=2),
            },
            {
                "title": "Budget Review",
                "description": "Q4 budget review meeting",
                "host_name": "Jack Turner",
                "scheduled_time": None,
                "duration": None,
                "status": "ended",
                "created_at": now - timedelta(days=3),
            },
        ]

        for data in upcoming_data:
            meeting = Meeting(**data)
            db.add(meeting)
            db.flush()
            meeting.meeting_link = f"{settings.FRONTEND_URL}/join/{meeting.meeting_id}"
            db.add(Participant(
                meeting_id=meeting.id,
                display_name=meeting.host_name,
                is_host=True,
            ))

        for data in recent_data:
            meeting = Meeting(**data)
            db.add(meeting)
            db.flush()
            meeting.meeting_link = f"{settings.FRONTEND_URL}/join/{meeting.meeting_id}"
            db.add(Participant(
                meeting_id=meeting.id,
                display_name=meeting.host_name,
                is_host=True,
            ))

        db.commit()
        print("Seed data inserted successfully.")
    except Exception as e:
        db.rollback()
        print(f"Seed failed: {e}")
    finally:
        db.close()

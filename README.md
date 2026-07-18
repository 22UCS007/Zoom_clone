# ZoomClone

A production-quality Zoom Clone built with Next.js 15 and FastAPI, featuring a modern UI inspired by Zoom's official web application.

## Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Axios** - HTTP client
- **React Hook Form** + **Zod** - Form validation
- **Lucide React** - Icons
- **shadcn/ui** - UI components
- **TanStack Query** - Server state management

### Backend
- **Python 3.12**
- **FastAPI** - Web framework
- **SQLAlchemy** - ORM
- **Pydantic** - Data validation
- **SQLite** - Database
- **Alembic** - Migrations

## Folder Structure

```
zoom_clone/
├── README.md
├── backend/
│   ├── requirements.txt
│   └── app/
│       ├── __init__.py
│       ├── main.py
│       ├── config.py
│       ├── database.py
│       ├── seed.py
│       ├── models/
│       │   ├── __init__.py
│       │   ├── meeting.py
│       │   └── participant.py
│       ├── schemas/
│       │   ├── __init__.py
│       │   ├── meeting.py
│       │   └── participant.py
│       ├── routers/
│       │   ├── __init__.py
│       │   └── meetings.py
│       ├── services/
│       │   ├── __init__.py
│       │   └── meeting_service.py
│       └── utils/
│           └── __init__.py
└── frontend/
    ├── package.json
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── postcss.config.js
    ├── .env.local
    ├── lib/
    │   └── utils.ts
    ├── types/
    │   └── index.ts
    ├── services/
    │   └── api.ts
    ├── hooks/
    │   └── useMeetings.ts
    ├── utils/
    │   └── format.ts
    ├── components/
    │   ├── ui/
    │   │   ├── button.tsx
    │   │   ├── input.tsx
    │   │   ├── label.tsx
    │   │   ├── textarea.tsx
    │   │   └── dialog.tsx
    │   ├── Navbar.tsx
    │   ├── ActionCards.tsx
    │   ├── MeetingCard.tsx
    │   ├── MeetingLists.tsx
    │   ├── MeetingRoom.tsx
    │   └── JoinMeetingForm.tsx
    └── app/
        ├── globals.css
        ├── layout.tsx
        ├── providers.tsx
        ├── page.tsx
        ├── join/
        │   └── page.tsx
        └── meeting/
            └── [meetingId]/
                ├── page.tsx
                └── MeetingPage.tsx
```

## Installation Steps

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. (Optional) Create a `.env` file in the backend directory:
   ```
   DATABASE_URL=sqlite:///./zoom_clone.db
   FRONTEND_URL=http://localhost:3000
   CORS_ORIGINS=["http://localhost:3000","http://127.0.0.1:3000"]
   ```

6. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

   The API will be available at `http://localhost:8000`. Auto-generated docs at `http://localhost:8000/docs`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

## Database

- **Engine**: SQLite
- **ORM**: SQLAlchemy
- **Tables**: `meetings`, `participants`
- **Relationship**: One Meeting → Many Participants
- **Seed Data**: Automatically inserted on startup (5 upcoming + 5 recent meetings)

## Environment Variables

### Backend
| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `sqlite:///./zoom_clone.db` | Database connection URL |
| `FRONTEND_URL` | `http://localhost:3000` | Frontend URL for meeting links |
| `CORS_ORIGINS` | `["http://localhost:3000"]` | Allowed CORS origins |

### Frontend
| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api` | Backend API base URL |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/meetings/new` | Create an instant meeting |
| `POST` | `/api/meetings/schedule` | Schedule a future meeting |
| `POST` | `/api/meetings/join` | Join an existing meeting |
| `GET` | `/api/meetings/upcoming` | List upcoming meetings |
| `GET` | `/api/meetings/recent` | List recent meetings |
| `GET` | `/api/meetings/{meeting_id}` | Get meeting details |
| `GET` | `/api/health` | Health check |

## Screenshots

<!-- Add screenshots of the following pages here -->
- Landing Page with action cards
- New Meeting modal
- Join Meeting page
- Schedule Meeting modal
- Meeting Room with toolbar

## Deployment

### Frontend (Vercel)

1. Push the `frontend` directory to a Git repository.
2. Import the project in [Vercel](https://vercel.com).
3. Set the environment variable `NEXT_PUBLIC_API_URL` to your deployed backend URL.
4. Deploy.

### Backend (Render / Railway)

1. Push the `backend` directory to a Git repository.
2. Create a new Web Service on [Render](https://render.com) or [Railway](https://railway.app).
3. Set the build command: `pip install -r requirements.txt`
4. Set the start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables as needed.
6. Deploy.

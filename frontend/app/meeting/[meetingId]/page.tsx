import MeetingPage from "./MeetingPage";

export default function Page({ params }: { params: { meetingId: string } }) {
  return <MeetingPage params={params} />;
}

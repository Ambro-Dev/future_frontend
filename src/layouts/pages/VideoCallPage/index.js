import PageLayout from "utils/LayoutContainers/PageLayout";
import { useParams } from "react-router-dom";
import VideoCall from "./VideoCall";

function VideoCallPage() {
  const { id: meetingId } = useParams();
  return (
    <PageLayout>
      <VideoCall meetingId={meetingId} />
    </PageLayout>
  );
}

export default VideoCallPage;

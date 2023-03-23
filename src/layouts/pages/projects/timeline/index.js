import { Button } from "@mui/material";
import { useState } from "react";
import VideoCall from "./context/VideoCall";

function Timeline() {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="Timeline" style={{ height: "100%" }}>
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <Button variant="contained" color="primary" onClick={() => setInCall(true)}>
          Join Call
        </Button>
      )}
    </div>
  );
}

export default Timeline;

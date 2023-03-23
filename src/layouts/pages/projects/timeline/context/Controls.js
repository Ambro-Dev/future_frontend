/* eslint-disable react/prop-types */
import { ExitToApp, Mic, MicExternalOff, Videocam, VideocamOff } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { useClient } from "./settings";

export default function Controls(props) {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => ({ ...ps, audio: !ps.audio }));
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => ({ ...ps, video: !ps.video }));
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Button
          variant="contained"
          color={trackState.audio ? "primary" : "secondary"}
          onClick={() => mute("audio")}
        >
          {trackState.audio ? <Mic /> : <MicExternalOff />}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color={trackState.video ? "primary" : "secondary"}
          onClick={() => mute("video")}
        >
          {trackState.video ? <Videocam /> : <VideocamOff />}
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="default" onClick={() => leaveChannel()}>
          Leave
          <ExitToApp />
        </Button>
      </Grid>
    </Grid>
  );
}

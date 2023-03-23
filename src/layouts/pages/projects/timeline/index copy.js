/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// Distance Learning React components
import { AppBar, Card, Grid, Icon, IconButton, Toolbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { maxWidth } from "@mui/system";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { useParams, Link } from "react-router-dom";

// Distance Learning React examples
import Footer from "examples/Footer";
import PageLayout from "examples/LayoutContainers/PageLayout";
import React, { useEffect, useRef, useState } from "react";
import useAuth from "hooks/useAuth";
import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = "080734c9455b4356b9d899ab4c0f0f97";

function Timeline() {
  const { auth } = useAuth();
  const { id } = useParams();
  const eventId = id;
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);

  const localVideoRef = useRef(null);
  const remoteVideosRef = useRef({});

  useEffect(() => {
    async function setupAgora() {
      // Create Agora client
      const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      await agoraClient.init(APP_ID);
      setClient(agoraClient);

      // Create local video stream
      const localStream = AgoraRTC.createCameraVideoTrack();
      localStream.play(localVideoRef.current);
      setLocalStream(localStream);

      // Create channel and join
      const channel = agoraClient.channel("default");
      await channel.join();
      setChannel(channel);

      // Publish local stream
      await agoraClient.publish(localStream);

      // Subscribe to remote streams
      channel.on("user-published", async (user, mediaType) => {
        await agoraClient.subscribe(user, mediaType);
        const remoteStream = await user.videoTrack();
        setRemoteStreams((prevStreams) => [
          ...prevStreams,
          { uid: user.uid, stream: remoteStream },
        ]);
      });

      channel.on("user-unpublished", (user) => {
        setRemoteStreams((prevStreams) => prevStreams.filter((stream) => stream.uid !== user.uid));
      });

      agoraClient.on("network-quality", (stats) => {
        console.log("Network quality:", stats);
      });

      agoraClient.on("error", (error) => {
        console.log("Agora error:", error);
      });
    }

    setupAgora();

    // Cleanup function
    return () => {
      if (localStream) {
        localStream.stop();
        localStream.close();
      }
      if (client) {
        client.removeAllListeners();
        client.release();
      }
    };
  }, []);

  useEffect(() => {
    if (remoteStreams.length > 0) {
      // Render remote video streams
      remoteStreams.forEach(({ uid, stream }) => {
        if (!remoteVideosRef.current[uid]) {
          const remoteVideo = document.createElement("div");
          remoteVideo.id = `remote-video-${uid}`;
          remoteVideosRef.current[uid] = remoteVideo;
          document.getElementById("remote-videos").appendChild(remoteVideo);
          stream.play(remoteVideo);
        }
      });
    }
  }, [remoteStreams]);

  return (
    <PageLayout>
      <AppBar color="inherit" sx={{ position: "relative" }}>
        <Toolbar sx={{ justifyContent: "end" }}>
          <MDBox>
            <MDBox>
              <Link to="/pages/profile/profile-overview">
                <IconButton size="large" disableRipple>
                  <Icon>account_circle</Icon>
                </IconButton>
              </Link>
              <IconButton size="large" disableRipple color="inherit">
                <Icon>settings</Icon>
              </IconButton>
              <IconButton
                size="large"
                disableRipple
                color="inherit"
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
              >
                <Icon>notifications</Icon>
              </IconButton>
              <MDButton color="error" variant="gradient">
                End Call
              </MDButton>
            </MDBox>
          </MDBox>
        </Toolbar>
      </AppBar>
      <MDBox>
        <Grid container spacing={2} p={3} pb={1} pt={1}>
          <Grid item xs={12} md={9} xl={10}>
            <MDBox>
              <Card
                sx={{
                  width: maxWidth,
                  aspectRatio: "16/ 9",
                  maxHeight: 1200,
                  alignItems: "center",
                  [theme.breakpoints.down("sm")]: {
                    width: maxWidth,
                    aspectRatio: "9 / 16",
                  },
                }}
              >
                <div>
                  <div>
                    <video ref={localVideoRef} autoPlay playsInline />
                  </div>
                  <div id="remote-videos" />
                </div>
              </Card>
            </MDBox>
            <MDBox
              pt={0.5}
              pl={3}
              pr={3}
              sx={{ display: "flex", justifyContent: "spece-between", flexWrap: "wrap" }}
            >
              {Array.from({ length: 16 }, (_, i) => (
                <MDBox sx={{ flexGrow: 1 }} key={i}>
                  <Card
                    sx={{
                      width: "calc(33.333% - 1px)",
                      aspectRatio: "1 / 1",
                      maxWidth: 400,
                      minWidth: 100,
                      alignItems: "center",
                      m: 0.5,
                    }}
                  >
                    User
                  </Card>
                </MDBox>
              ))}
            </MDBox>
          </Grid>

          <Grid item xs={0} md={3} xl={2}>
            <Card sx={{ width: maxWidth, height: "100%", alignItems: "center" }}>Menu</Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </PageLayout>
  );
}

export default Timeline;

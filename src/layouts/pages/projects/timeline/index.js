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
import { useEffect, useRef, useState } from "react";
import useAuth from "hooks/useAuth";

function Timeline() {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const { auth } = useAuth();
  const { id } = useParams();
  const eventId = id;
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const localVideoRef = useRef(null);
  const remoteVideoRefs = useRef([]);

  useEffect(() => {
    // Get the user's camera and microphone
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        // Set the local stream state
        setLocalStream(stream);
        // Play the local video in the video element
        localVideoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error getting user media:", error);
      });
  }, []);

  // Set up the WebRTC connection when the local stream state changes
  useEffect(() => {
    if (localStream) {
      const peerConnection = new RTCPeerConnection();

      // Add the local stream to the peer connection
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      // Set up the event listener for remote streams
      peerConnection.ontrack = (event) => {
        setRemoteStreams((prevStreams) => [...prevStreams, event.streams[0]]);
      };

      // Create and send an offer to the remote user
      peerConnection
        .createOffer()
        .then((offer) => {
          peerConnection.setLocalDescription(offer);
          // Send the offer to the server for the remote user to accept
          // This code assumes that you have set up a signaling server to exchange WebRTC messages
          // You will need to replace the placeholders with your own server URL and message format
          const socket = new WebSocket("ws://your-signaling-server.com");
          socket.onopen = () => {
            socket.send(
              JSON.stringify({
                type: "offer",
                offer: { offer },
                from: auth.userId,
                to: eventId,
              })
            );
          };
        })
        .catch((error) => {
          console.error("Error creating offer:", error);
        });
    }
  }, [localStream]);

  // Set up the remote video streams when the remote streams state changes
  useEffect(() => {
    remoteVideoRefs.current = remoteStreams.map((stream) => {
      const videoRef = useRef(null);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      return videoRef;
    });
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
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
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

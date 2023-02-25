/* eslint-disable no-underscore-dangle */
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Card, Grid, Toolbar } from "@mui/material";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import useAxiosPrivate from "hooks/useAxiosPrivate";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import useAuth from "hooks/useAuth";
import MDButton from "components/MDButton";
import { navbarContainer } from "examples/Navbars/DashboardNavbar/styles";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import "./styles/styles.css";
import Lottie from "lottie-react-web";
import conversationAnimation from "assets/images/illustrations/981-consultation-flat-edited.json";
import messageAnimation from "assets/images/illustrations/177-envelope-mail-send-flat-edited.json";

// Connect to the Socket.io server
const socket = io("http://localhost:8080");

// Data

function DataTables() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [query, setQuery] = useState();
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState({});
  const [messageText, setMessageText] = useState("");
  const messagesContainerRef = useRef();
  const sendRef = useRef();

  useEffect(() => {
    // Listen for new messages
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  useEffect(() => {
    const user = auth.userId;
    const conversation = selectedConversation;

    socket.emit("join-conversation", { user, conversation });

    return () => {
      socket.emit("leave-conversation", { user, conversation });
    };
  }, [auth.userId, selectedConversation]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleConversationSelect = (conversationId) => {
    setSelectedConversation(conversationId);
    axiosPrivate
      .get(`/messages/${conversationId}`)
      .then((response) => {
        setMessages(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setTimeout(() => {
      sendRef.current.scrollIntoView({ behavior: "auto" });
    }, 300);
  };

  const handleUserClick = (chatUser) => {
    const selectedUser = users.find((user) => user._id === chatUser);
    if (selectedUser) {
      const newConversation = {
        name: `${selectedUser.name} ${selectedUser.surname} - ${auth.name} ${auth.surname}`,
        members: [auth.userId, selectedUser._id],
      };
      axiosPrivate
        .post("/conversations/", newConversation)
        .then((response) => {
          setConversations((prevConversations) => [...prevConversations, response.data]);
          setSelectedConversation(response.data._id);
          setMessages([]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!selectedConversation) {
      return;
    }
    if (messageText.trim() === "") {
      return;
    }
    const newMessage = {
      sender: auth.userId,
      text: messageText,
      conversation: selectedConversation,
    };
    try {
      await socket.emit("send-message", newMessage);
      setMessageText("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Fetch the list of conversations from the server
    axiosPrivate
      .get(`/conversations/${auth.userId}`)
      .then((response) => {
        setConversations(response.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // Fetch the list of users from the server
    axiosPrivate
      .get("/users")
      .then((response) => {
        setUsers(response.data);
        console.log(users);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={4}>
            <MDBox mb={3}>
              <Toolbar sx={(theme) => navbarContainer(theme)}>
                <MDBox pr={1}>
                  <Autocomplete
                    disablePortal
                    options={users}
                    getOptionLabel={(user) => `${user.name} ${user.surname} ${user.studentNumber}`}
                    getOptionSelected={(option, value) => option._id === value._id}
                    onChange={(event, value) => setQuery(value ? value._id : "")}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Search users..." />}
                  />
                </MDBox>
                <MDBox>
                  <MDButton onClick={() => handleUserClick(query)}>
                    Create new conversation
                  </MDButton>
                </MDBox>
              </Toolbar>
            </MDBox>
            <MDBox mb={3}>
              <MDTypography pb={1} variant="h5">
                Conversations:
              </MDTypography>
              {conversations.map((conversation) => (
                <MDBox key={conversation._id} pt={1}>
                  <MDButton
                    size="large"
                    role="button"
                    onClick={() => handleConversationSelect(conversation._id)}
                    onKeyDown={() => handleConversationSelect(conversation._id)}
                    fullWidth
                  >
                    {conversation.name}
                  </MDButton>
                </MDBox>
              ))}
            </MDBox>
          </Grid>
          <Grid item xs={12} xl={8} sx={{ height: "max-content" }}>
            <Card className="chat-room">
              <MDBox m={3}>
                {selectedConversation ? (
                  <>
                    <MDBox className="chat-header">
                      <MDTypography variant="h5">
                        {conversations.find((conv) => conv._id === selectedConversation)?.name}
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      ref={messagesContainerRef}
                      className="messages-container"
                      display="flex"
                      flexDirection="column"
                      mt={2}
                    >
                      {messages && Object.values(messages).length > 0 ? (
                        Object.values(messages).map((message) => {
                          const sender = users.find((user) => user._id === message.sender);
                          return (
                            <Card
                              className={`chat-message ${
                                message.sender === auth.userId ? "self" : "other"
                              }`}
                              key={message._id}
                            >
                              <MDTypography
                                className="sender"
                                fontWeight="medium"
                                variant="caption"
                              >{`${sender.name} ${sender.surname}`}</MDTypography>
                              <MDTypography className="text" variant="button" color="text">
                                {message.text}
                              </MDTypography>
                            </Card>
                          );
                        })
                      ) : (
                        <Grid container spacing={2} display="flex" alignItems="center">
                          <Grid
                            item
                            xs={12}
                            xl={6}
                            alignItems="flex-center"
                            justifyContent="center"
                            display="flex"
                          >
                            <MDTypography
                              variant="h5"
                              fontWeight="medium"
                              textTransform="uppercase"
                            >
                              No messages yet
                            </MDTypography>
                          </Grid>
                          <Grid item xs={12} xl={6} sx={{ height: "300px" }}>
                            <Lottie
                              options={{
                                animationData: messageAnimation,
                                loop: true,
                                autoplay: true,
                              }}
                            />
                          </Grid>
                        </Grid>
                      )}
                    </MDBox>
                    <MDBox
                      display="flex"
                      component="form"
                      role="form"
                      onSubmit={handleSendMessage}
                      justifyContent="flex-end"
                      mt={2}
                    >
                      <MDInput
                        type="text"
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        fullWidth
                      />
                      <MDButton type="submit">Send</MDButton>
                    </MDBox>
                  </>
                ) : (
                  <Grid container spacing={2} display="flex" alignItems="center">
                    <Grid
                      item
                      xs={12}
                      xl={6}
                      alignItems="flex-center"
                      justifyContent="center"
                      display="flex"
                    >
                      <MDTypography variant="h5" fontWeight="medium" textTransform="uppercase">
                        Select conversation or create a new one
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} xl={6} sx={{ height: "400px" }}>
                      <Lottie
                        options={{
                          animationData: conversationAnimation,
                          loop: true,
                          autoplay: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
              </MDBox>
            </Card>
            <MDBox ref={sendRef} />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;

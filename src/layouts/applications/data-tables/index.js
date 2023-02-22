/* eslint-disable no-underscore-dangle */
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Card, Grid, Toolbar } from "@mui/material";

import { useEffect, useState } from "react";
import io from "socket.io-client";

import useAxiosPrivate from "hooks/useAxiosPrivate";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import useAuth from "hooks/useAuth";
import MDButton from "components/MDButton";
import { navbarContainer } from "examples/Navbars/DashboardNavbar/styles";

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
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for new messages
    socket.on("new-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for user-joined events
    socket.on("user-joined", (data) => {
      setUsers((prevUsers) => [...prevUsers, data.userId]);
    });

    // Listen for user-left events
    socket.on("user-left", (data) => {
      setUsers((prevUsers) => prevUsers.filter((userId) => userId !== data.userId));
    });

    // Fetch the list of conversations from the server
    axiosPrivate
      .get("/conversations")
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

    // Clean up the Socket.io connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleConversationSelect = (conversationId) => {
    setSelectedConversation(conversationId);
    axiosPrivate
      .get(`/messages/${conversationId}`)
      .then((response) => {
        setMessages(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
    socket.emit("join-conversation", { conversation: conversationId, userId: auth.userId });
  };

  const handleUserClick = (chatUser) => {
    const selectedUser = users.find((user) => user._id === chatUser);
    if (selectedUser) {
      const newConversation = {
        name: `${selectedUser.name} ${selectedUser.surname}`,
        members: [auth.userId, selectedUser._id],
      };
      axiosPrivate
        .post("/conversations", newConversation)
        .then((response) => {
          setConversations((prevConversations) => [...prevConversations, response.data]);
          setSelectedConversation(response.data._id);
          setMessages([]);
          console.log(selectedConversation);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
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
            <MDButton onClick={() => handleUserClick(query)}>Create chat room</MDButton>
          </MDBox>
        </Toolbar>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={3}>
            <MDBox mb={3}>
              <Card>
                <h2>Conversations:</h2>
                <ul>
                  {conversations.map((conversation) => (
                    <li key={conversation._id}>
                      <div
                        role="button"
                        tabIndex="0"
                        onClick={() => handleConversationSelect(conversation._id)}
                        onKeyDown={() => handleConversationSelect(conversation._id)}
                      >
                        {conversation.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </MDBox>
          </Grid>
          <Grid item xs={12} xl={9} sx={{ height: "max-content" }}>
            <Card>
              <h2>Chat Room:</h2>
              <div className="chat-messages-container">
                {messages.map((message) => (
                  <div
                    key={message._id}
                    className={`chat-message ${message.sender === auth.userId ? "self" : "other"}`}
                  >
                    <div className="sender">{message.sender}</div>
                    <div className="content">{message.content}</div>
                  </div>
                ))}
              </div>
              <div className="chat-input-container">
                <input type="text" placeholder="Type your message here" />
                <button type="button">Send</button>
              </div>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;

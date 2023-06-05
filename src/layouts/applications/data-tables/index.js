/* eslint-disable no-underscore-dangle */
// Distance Learning React components
import DLBox from "components/DLBox";

// Distance Learning React utils
import DashboardLayout from "utils/LayoutContainers/DashboardLayout";
import DashboardNavbar from "utils/Navbars/DashboardNavbar";
import Footer from "utils/Footer";
import { Card, Grid, Toolbar } from "@mui/material";

import { useContext, useEffect, useRef, useState } from "react";

import useAxiosPrivate from "hooks/useAxiosPrivate";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { SocketContext } from "context/socket";

import useAuth from "hooks/useAuth";
import DLButton from "components/DLButton";
import { navbarContainer } from "utils/Navbars/DashboardNavbar/styles";
import DLTypography from "components/DLTypography";
import DLInput from "components/DLInput";
import "./styles/styles.css";
import Lottie from "lottie-react-web";
import conversationAnimation from "assets/images/illustrations/981-consultation-flat-edited.json";
import messageAnimation from "assets/images/illustrations/177-envelope-mail-send-flat-edited.json";
import { useTranslation } from "react-i18next";

// Connect to the Socket.io server

// Data

function DataTables() {
  const { i18n } = useTranslation();
  const { t } = useTranslation("translation", { keyPrefix: "messages" });
  const { socket } = useContext(SocketContext);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [query, setQuery] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [conversationsList, setConversationsList] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messagesList, setMessagesList] = useState([]);
  const [messageText, setMessageText] = useState("");
  const messagesContainerRef = useRef();
  const sendRef = useRef();
  const [language, setLanguage] = useState("pl");

  useEffect(() => {
    // Fetch the list of conversations from the server
    axiosPrivate
      .get(`/conversations/${auth.userId}`)
      .then((response) => {
        setConversationsList(response.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // Fetch the list of users from the server
    axiosPrivate
      .get("/users")
      .then((response) => {
        setUsersList(response.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // Listen for new messages

    socket.on("conversation-messages", (messages) => {
      setMessagesList(messages);
    });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessagesList((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messagesList]);

  const handleConversationSelect = (conversationId) => {
    if (selectedConversation) {
      socket.emit("leave-conversation", { conversation: selectedConversation });
    }

    setSelectedConversation(conversationId);
    setMessagesList([]);
    socket.emit("join-conversation", conversationId);
    setTimeout(() => {
      sendRef.current.scrollIntoView({ behavior: "auto" });
    }, 300);
  };

  const handleUserClick = (chatUser) => {
    const selectedUser = usersList.find((user) => user._id === chatUser);
    if (selectedUser) {
      const newConversation = {
        name: `${selectedUser.name} ${selectedUser.surname} - ${auth.name} ${auth.surname}`,
        members: [auth.userId, selectedUser._id],
      };
      axiosPrivate
        .post("/conversations/", newConversation)
        .then((response) => {
          setConversationsList((prevConversations) => [...prevConversations, response.data]);
          handleConversationSelect(response.data._id);
          setQuery(null);
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
    const handleLanguageChange = () => {
      setLanguage(i18n.language);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DLBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={4}>
            <DLBox mb={3}>
              <Toolbar sx={(theme) => navbarContainer(theme)}>
                <DLBox pr={1}>
                  <Autocomplete
                    disablePortal
                    options={usersList}
                    getOptionLabel={(user) =>
                      `${user.name} ${user.surname} ${user.studentNumber || ""}`
                    }
                    onChange={(event, value) => setQuery(value ? value._id : "")}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label={t("search")} />}
                  />
                </DLBox>
              </Toolbar>
              <DLBox pl={3}>
                <DLButton onClick={() => handleUserClick(query)}>{t("create")}</DLButton>
              </DLBox>
            </DLBox>
            {conversationsList.length > 0 && (
              <DLBox mb={3}>
                <DLTypography pb={1} variant="h5">
                  {t("conversations")}
                </DLTypography>
                {conversationsList.map((conversation) => (
                  <DLBox key={conversation._id} pt={1}>
                    <DLButton
                      size="large"
                      role="button"
                      onClick={() => handleConversationSelect(conversation._id)}
                      onKeyDown={() => handleConversationSelect(conversation._id)}
                      fullWidth
                    >
                      {conversation.name}
                    </DLButton>
                  </DLBox>
                ))}
              </DLBox>
            )}
          </Grid>
          <Grid item xs={12} xl={8} sx={{ height: "max-content" }}>
            <Card className="chat-conversation">
              <DLBox m={3}>
                {selectedConversation && conversationsList.length > 0 ? (
                  <>
                    <DLBox className="chat-header">
                      <DLTypography variant="h5">
                        {conversationsList.find((conv) => conv._id === selectedConversation)?.name}
                      </DLTypography>
                    </DLBox>
                    <DLBox
                      ref={messagesContainerRef}
                      className="messages-container"
                      display="flex"
                      flexDirection="column"
                      mt={2}
                    >
                      {messagesList.length > 0 ? (
                        Object.values(messagesList).map((message) => {
                          const sender = usersList.find((user) => user._id === message.sender);
                          const formattedDate = new Date(message.createdAt).toLocaleDateString(
                            [t("lang")],
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          );
                          const formattedTime = new Date(message.createdAt).toLocaleTimeString(
                            [t("lang")],
                            {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: language === "en",
                            }
                          );
                          return (
                            <Card
                              className={`chat-message ${
                                message.sender === auth.userId ? "self" : "other"
                              }`}
                              key={message._id}
                            >
                              <DLTypography
                                className="sender"
                                fontWeight="medium"
                                variant="caption"
                              >{`${sender.name || ""} ${sender.surname || ""}`}</DLTypography>
                              <DLTypography className="text" variant="button" color="text">
                                {message.text}
                              </DLTypography>
                              <DLTypography
                                className="date"
                                variant="caption"
                                pt={2}
                                sx={({ justifyContent: "flex-end" }, { alignSelf: "flex-end" })}
                              >
                                {`${formattedDate} ${formattedTime}`}
                              </DLTypography>
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
                            <DLTypography
                              variant="h5"
                              fontWeight="medium"
                              textTransform="uppercase"
                            >
                              {t("nomessages")}
                            </DLTypography>
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
                    </DLBox>
                    <DLBox
                      display="flex"
                      component="form"
                      role="form"
                      onSubmit={handleSendMessage}
                      justifyContent="flex-end"
                      mt={2}
                    >
                      <DLInput
                        type="text"
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        fullWidth
                      />
                      <DLButton type="submit">{t("send")}</DLButton>
                    </DLBox>
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
                      <DLTypography variant="h5" fontWeight="medium" textTransform="uppercase">
                        {t("select")}
                      </DLTypography>
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
              </DLBox>
            </Card>
            <DLBox ref={sendRef} />
          </Grid>
        </Grid>
      </DLBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;

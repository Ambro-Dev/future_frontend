/* eslint-disable no-underscore-dangle */
// Distance Learning React components
import DLBox from "components/DLBox";

// Distance Learning React utils
import DashboardLayout from "utils/LayoutContainers/DashboardLayout";
import DashboardNavbar from "utils/Navbars/DashboardNavbar";
import Footer from "utils/Footer";
import { Backdrop, Card, CircularProgress, Grid, Toolbar } from "@mui/material";

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
import DLAvatar from "components/DLAvatar";
import EmojiPicker from "emoji-picker-react";
import ErrorContext from "context/ErrorProvider";

// Connect to the Socket.io server

// Data

function ChatPage() {
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
  const { showErrorNotification } = useContext(ErrorContext);
  const [messageText, setMessageText] = useState("");
  const messagesContainerRef = useRef();
  const sendRef = useRef();
  const [language, setLanguage] = useState("pl");
  const [loading, setLoading] = useState(true);
  const [imageUrls, setImageUrls] = useState([]);

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

  const getImages = (list) => {
    Promise.all(
      list.map((row) => {
        const otherUser = row.members.find((member) => member._id !== auth.userId);

        if (!otherUser) return null;
        return axiosPrivate
          .get(`/profile-picture/users/${otherUser._id}/picture`, {
            responseType: "blob",
          })
          .then((response) => URL.createObjectURL(response.data))
          .catch((error) => {
            showErrorNotification("Error", error.message);
            return null;
          });
      })
    ).then(setImageUrls);
  };

  useEffect(() => {
    // Fetch the list of conversations from the server
    axiosPrivate
      .get(`/conversations/${auth.userId}`)
      .then((response) => {
        setConversationsList(response.data);
        getImages(response.data);
      })
      .catch((err) => {
        showErrorNotification("Error", err.message);
      });
    setLoading(false);
  }, []);

  useEffect(() => {
    // Fetch the list of users from the server
    axiosPrivate
      .get("/users")
      .then((response) => {
        setUsersList(response.data);
      })
      .catch((err) => {
        showErrorNotification("Error", err.message);
      });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessagesList((prevMessages) => [...prevMessages, message]);
    });

    // Listen for new messages

    socket.on("conversation-messages", (messages) => {
      setMessagesList(messages);
    });
  }, []);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messagesList]);

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
          const newList = [...conversationsList, response.data];
          setConversationsList((prevConversations) => [...prevConversations, response.data]);
          handleConversationSelect(response.data._id);
          setQuery(null);
          getImages(newList);
        })
        .catch((err) => {
          showErrorNotification("Error", err.message);
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
      showErrorNotification("Error", err.message);
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

  const renderProfiles = conversationsList?.map((row, index) => {
    // retrieve messages for conversation and sort by timestamp
    row.messages.sort((a, b) => b.timestamp - a.timestamp);

    // extract text of last message and shorten it
    const lastMessage = row.messages[0];
    const shortenedDescription = lastMessage?.text?.slice(0, 30) || " ";
    const otherUser = row.members.find((member) => member._id !== auth.userId);

    return (
      <DLBox
        key={row._id}
        display="flex"
        alignItems="center"
        p={1}
        mb={1}
        sx={{
          borderRadius: selectedConversation === row._id && 3,
          background: selectedConversation === row._id && "#fafafa",
          boxShadow:
            selectedConversation === row._id && "6px 6px 10px #cbcbcb, 6px 6px 10px #ffffff",
        }}
      >
        <DLBox mr={2}>
          <DLAvatar src={imageUrls[index]} alt="something here" shadow="md" />
        </DLBox>
        <DLBox
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
        >
          <DLTypography variant="button" fontWeight="medium">
            {otherUser.name} {otherUser.surname}
          </DLTypography>
          <DLTypography variant="caption" color="text">
            {shortenedDescription}
          </DLTypography>
        </DLBox>
        <DLBox ml="auto">
          <DLButton onClick={() => handleConversationSelect(row._id)} variant="text" color="info">
            Message
          </DLButton>
        </DLBox>
      </DLBox>
    );
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!loading ? (
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
                      isOptionEqualToValue={(option, value) => option._id === value?._id}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label={t("search")} />}
                    />
                  </DLBox>
                </Toolbar>
                <DLBox pl={3}>
                  <DLButton onClick={() => handleUserClick(query)}>{t("create")}</DLButton>
                </DLBox>
              </DLBox>
              {conversationsList && conversationsList.length > 0 ? (
                <Card sx={{ height: "100%", boxShadow: "none" }}>
                  <DLBox pt={2} px={2}>
                    <DLTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                      {t("conversations")}
                    </DLTypography>
                  </DLBox>
                  <DLBox p={1}>
                    <DLBox display="flex" flexDirection="column" p={0} m={0}>
                      {renderProfiles}
                    </DLBox>
                  </DLBox>
                </Card>
              ) : (
                <DLBox>{t("noconversations")}</DLBox>
              )}
            </Grid>
            <Grid item xs={12} xl={8} sx={{ height: "max-content" }}>
              <Card className="chat-conversation">
                <DLBox m={3}>
                  {selectedConversation && conversationsList.length > 0 ? (
                    <>
                      <DLBox className="chat-header">
                        <DLTypography variant="h5">
                          {
                            conversationsList.find((conv) => conv._id === selectedConversation)
                              ?.name
                          }
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
                        <EmojiPicker />
                        <DLButton type="submit">{t("send")}</DLButton>
                      </DLBox>
                    </>
                  ) : (
                    <Grid container spacing={2} display="flex" alignItems="center">
                      <Grid item xs={12} xl={6} alignItems="flex-center" display="flex">
                        <DLBox textAlign="center" justifyContent="center">
                          <DLTypography variant="h5" fontWeight="medium" textTransform="uppercase">
                            {t("select")}
                          </DLTypography>
                        </DLBox>
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
      ) : (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <Footer />
    </DashboardLayout>
  );
}

export default ChatPage;

/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import useAxiosPrivate from "hooks/useAxiosPrivate";
import useAuth from "hooks/useAuth";

const axiosPrivate = useAxiosPrivate();
const { auth } = useAuth();
const { data } = axiosPrivate.get(`conversation/${auth.userId}`);

const conversationObjects = data.map((conversation) => {
  // retrieve messages for conversation and sort by timestamp
  conversation.messages.sort((a, b) => b.timestamp - a.timestamp);

  // extract text of last message and shorten it
  const lastMessage = conversation.messages[0];
  const shortenedDescription = lastMessage.text.slice(0, 30);

  // create conversation object
  return {
    image: conversation.image,
    name: conversation.name,
    description: shortenedDescription,
    action: {
      type: "internal",
      route: "/chat",
      color: "info",
      label: "message",
    },
  };
});

// display conversation objects in UI
export default conversationObjects;

import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import PostForm from "./PostForm";
import PostList from "./PostList";
import "./ChatPage.css";

const colors = [
  "#2196F3",
  "#32c787",
  "#00BCD4",
  "#ff5652",
  "#ffc107",
  "#ff85af",
  "#FF9800",
  "#39bbb0",
];

const ChatPage = () => {
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [connecting, setConnecting] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const stompClientRef = useRef(null);

  const connect = (event) => {
    event.preventDefault();
    if (username.trim()) {
      const socket = new SockJS("/ws");
      const client = Stomp.over(socket);

      client.connect(
        {},
        () => {
          client.subscribe("/user/queue/messages", onMessageReceived);

          client.send(
            "/app/chat.addUser",
            {},
            JSON.stringify({ sender: username, type: "JOIN" })
          );

          stompClientRef.current = client;
          setStompClient(client);
          setIsConnected(true);
          setConnecting(false);
        },
        onError
      );
    }
  };

  const onError = (error) => {
    setConnecting(false);
    alert(
      "Could not connect to WebSocket server. Please refresh this page to try again!"
    );
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (message.trim() && stompClient) {
      const chatMessage = {
        sender: username,
        receiver: receiver,
        content: message,
        type: "CHAT",
      };
      stompClient.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
      setMessage("");
    }
  };

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const getAvatarColor = (messageSender) => {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  const addPost = (post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  useEffect(() => {
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div id="main-page">
      {!isConnected ? (
        <div id="username-page">
          <div className="username-page-container">
            <h1 className="title">Type your username to enter the Chatroom</h1>
            <form id="usernameForm" name="usernameForm" onSubmit={connect}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  placeholder="Username"
                  autoComplete="off"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="accent username-submit">
                  Start Chatting
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div id="chat-page">
          <div className="chat-container">
            <div className="chat-header">
              <h2>Spring WebSocket Chat Demo - By Khetha</h2>
            </div>
            {connecting && <div className="connecting">Connecting...</div>}
            <div className="main-content">
              <div className="chat-box">
                <ul id="messageArea">
                  {messages.map((message, index) => (
                    <li
                      key={index}
                      className={
                        message.type === "JOIN" || message.type === "LEAVE"
                          ? "event-message"
                          : "chat-message"
                      }
                    >
                      {message.type !== "JOIN" && message.type !== "LEAVE" && (
                        <>
                          <i
                            style={{
                              backgroundColor: getAvatarColor(message.sender),
                            }}
                          >
                            {message.sender[0]}
                          </i>
                          <span>{message.sender}</span>
                        </>
                      )}
                      <p>
                        {message.type === "JOIN"
                          ? `${message.sender} joined!`
                          : message.type === "LEAVE"
                          ? `${message.sender} left!`
                          : message.content}
                      </p>
                    </li>
                  ))}
                </ul>
                <form
                  id="messageForm"
                  name="messageForm"
                  onSubmit={sendMessage}
                >
                  <div className="form-group">
                    <div className="input-group clearfix">
                      <input
                        type="text"
                        id="message"
                        placeholder="Type a message..."
                        autoComplete="off"
                        className="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <input
                        type="text"
                        id="receiver"
                        placeholder="Receiver"
                        autoComplete="off"
                        className="form-control"
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                      />
                      <button type="submit" className="primary">
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="post-section">
                <PostForm onAddPost={addPost} />
                <PostList posts={posts} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;

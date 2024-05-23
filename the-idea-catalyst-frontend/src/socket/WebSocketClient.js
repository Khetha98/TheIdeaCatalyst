import SockJS from "sockjs-client";
import Stomp from "stompjs";

const connectWebSocket = (url, onMessageReceived) => {
  const socket = new SockJS(url);
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    stompClient.subscribe("/topic/messages", (message) => {
      onMessageReceived(JSON.parse(message.body));
    });
  });

  return stompClient;
};

export default connectWebSocket;

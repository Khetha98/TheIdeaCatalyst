import "./App.css";
import { Route } from "react-router-dom";
import ChatsPage from "./Pages/ChatsPage";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={HomePage} exact />
      <Route path="/Chats" component={ChatsPage} />
    </div>
  );
}

export default App;

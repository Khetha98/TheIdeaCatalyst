import React from "react";
import { Routes, Route } from "react-router-dom";
// import "./App.css";
// import HomePage from "./Pages/HomePage";
import HomePage from "./Pages/LandingPage";
// import ChatPage from "./Pages/ChatPage";

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/chats" element={<ChatPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/chats" element={<ChatPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;

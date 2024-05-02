import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatsPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {/* Now you can map over the users array */}
      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.name} {user.surname}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChatsPage;

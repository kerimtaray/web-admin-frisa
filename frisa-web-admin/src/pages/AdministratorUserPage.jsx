import Styles from "./AdministratorUserPage.module.css";
import Navbar from "../components/Navbar";
import User from "../components/User"; 
import EditUser from "../components/EditUser";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AdminUserPage = () => {
  const activeLinks = true;

  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://api-test-frisa-rmex-dev.fl0.io/admin/getAllUsers");
        // Using the 'results' key from the API response to set the users
        setUsers(res.data.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  const handleClick = () => {
    setShowAddUser(!showAddUser);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(prevUsers => prevUsers.map(u => u._id === updatedUser._id ? updatedUser : u));
    setEditingUser(null); 
  };

  return (
    <div>
      <Navbar showLinks={activeLinks} />
      <h2>Usuarios Registrados</h2>

      {showAddUser && <AddUser hideAddUser={handleClick} />}

      {editingUser && 
        <EditUser 
          userData={editingUser} 
          hideEditUser={() => setEditingUser(null)} 
          updateUser={handleUpdateUser}
        />
      }

      <div className={Styles.container}>
        <div className={Styles.users}>
          {users.map((user) => (
            <User key={user._id} data={user} onEdit={() => setEditingUser(user)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;

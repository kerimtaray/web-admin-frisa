import Styles from "./AdministratorUserPage.module.css";
import Navbar from "../components/Navbar";
import User from "../components/User"; // Component to showcase each user
//import AddUser from "./AddUser"; // Placeholder for component if you want to add new users
import EditUser from "../components/EditUser";


import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AdminUserPage = () => {
  const activeLinks = true;
  

  const dummyUsers = [
    {
      id: 1,
      username: "JohnDoe123",
      email: "johndoe@example.com",
      password: "password123" // Normally, passwords wouldn't be directly visible in any frontend interface!
    },
    {
      id: 2,
      username: "JaneSmith456",
      email: "jane.smith@example.com",
      password: "janeSecurePwd"
    },
    {
      id: 3,
      username: "AdminUser789",
      email: "admin@example.com",
      password: "adminPwd"
    }
    //... Add more dummy users as needed
  ];

  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState(null); 

  useEffect(() => {
    // You can toggle between dummy data and real data by commenting/uncommenting the lines below

    setUsers(dummyUsers);
    /*
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
    */
  }, []);

  const handleClick = () => {
    setShowAddUser(!showAddUser);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
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
            <User key={user.id} data={user} onEdit={() => setEditingUser(user)} />

          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUserPage;

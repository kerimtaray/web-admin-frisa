import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Styles from "./EditUser.module.css"; 

const EditUser = ({ userData, hideEditUser, updateUser }) => {
  // State for form fields, pre-populated with passed userData
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save updated user details, e.g. making API call to update the user in the database
    updateUser({ ...userData, username, email }); // Pass the updated details
    hideEditUser();
  };

  return (
    <div className={Styles.overlay}>
      <div className={Styles.wrapper}>
        <div className={Styles.content}>
          <h2>Editar Usuario</h2>
          <button className={Styles.closeButton} onClick={hideEditUser}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <form className={Styles.editMode} onSubmit={handleSubmit}>
            <div className={Styles.title}>
              <label>Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className={Styles.email}>
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className={Styles.buttons}>
              <button type="submit" className="save">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;

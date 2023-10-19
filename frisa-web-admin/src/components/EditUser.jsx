import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Styles from "./EditUser.module.css";

const EditUser = ({ userData, hideEditUser, updateUser }) => {
  // State for form fields, pre-populated with passed userData
  const [name, setName] = useState(userData.name);
  const [lastname, setLastname] = useState(userData.lastname);
  const [email, setEmail] = useState(userData.email);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [state, setState] = useState(userData.state);
  const [city, setCity] = useState(userData.city);
  const [isAdmin, setIsAdmin] = useState(userData.isAdmin);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...userData,
      name,
      lastname,
      email,
      phoneNumber,
      state,
      city,
    };
    updateUser(updatedData);
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
            <div className={Styles.field}>
              <label>Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className={Styles.field}>
              <label>Lastname</label>
              <input type="text" value={lastname} onChange={e => setLastname(e.target.value)} />
            </div>
            <div className={Styles.field}>
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className={Styles.field}>
              <label>Phone Number</label>
              <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
            </div>
            <div className={Styles.field}>
              <label>State</label>
              <input type="text" value={state} onChange={e => setState(e.target.value)} />
            </div>
            <div className={Styles.field}>
              <label>City</label>
              <input type="text" value={city} onChange={e => setCity(e.target.value)} />
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


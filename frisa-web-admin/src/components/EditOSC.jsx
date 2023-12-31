import React, { useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Styles from "./EditOSC.module.css";

const EditOSC = ({ oscData, hideEditOSC, updateOSC }) => {
  const [name, setName] = useState(oscData.name);
  const [adminName, setAdminName] = useState(oscData.adminName);
  const [email, setEmail] = useState(oscData.email);
  const [phoneNumber, setPhoneNumber] = useState(oscData.phoneNumber);
  const [state, setState] = useState(oscData.state);
  const [city, setCity] = useState(oscData.city);
  const [description, setDescription] = useState(oscData.description);
  const [webpage, setWebpage] = useState(oscData.webpage);
  const [category, setCategory] = useState(oscData.category);

  const handleSubmit = async () => {
    const updatedData = {
      ...oscData,
      name,
      adminName,
      email,
      phoneNumber,
      state,
      city,
      description,
      webpage,
      category
    };
    
    try {
      await axios.put(`https://api-test-frisa-rmex-dev.fl0.io/admin/editOsc/${oscData._id}`, updatedData);
      updateOSC(updatedData); // This function can be used to refresh your component if needed
    } catch (error) {
      console.error("Error updating OSC:", error);
    }
  };

  const handleAccept = async () => {
    try {
      await axios.put(`https://api-test-frisa-rmex-dev.fl0.io/admin/acceptOsc/${oscData._id}`, { admited: true });
      hideEditOSC();
    } catch (error) {
      console.error("Error accepting OSC:", error);
    }
  };

  const handleReject = async () => {
    try {
      await axios.delete(`https://api-test-frisa-rmex-dev.fl0.io/admin/rejectOsc/${oscData.id}`);
      hideEditOSC();
    } catch (error) {
      console.error("Error rejecting OSC:", error);
    }
  };

  return (
    <div className={Styles.overlay}>
      <div className={Styles.wrapper}>
        <div className={Styles.content}>
          <h2>Editar OSC</h2>
          <button className={Styles.closeButton} onClick={hideEditOSC}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <form className={Styles.editMode} onSubmit={handleSubmit}>
            <div className={Styles.field}>
              <label>Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className={Styles.field}>
              <label>Admin Name</label>
              <input type="text" value={adminName} onChange={e => setAdminName(e.target.value)} />
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
            <div className={Styles.field}>
              <label>Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className={Styles.field}>
              <label>Webpage</label>
              <input type="url" value={webpage} onChange={e => setWebpage(e.target.value)} />
            </div>
            <div className={Styles.field}>
              <label>Category</label>
              <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
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

export default EditOSC;

import Styles from "./OSCRequest.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";

const OSCRequest = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [requestData, setRequestData] = useState(props.data);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/oscRequests/${id}`);
      console.log(res);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleAccept = async () => {
    try {
      // Assuming you have a backend route to accept the request
      const res = await axios.put(`http://localhost:8080/api/oscRequests/accept/${requestData.id}`);
      console.log(res);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRequestData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`http://localhost:8080/api/oscRequests/${requestData.id}`, requestData);
      console.log(res);
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

return (
    <div className={Styles.oscRequest} onClick={() => setIsModalOpen(true)}>
      <h3>{props.data.name}</h3>

      {isModalOpen && (
        <div className={`${Styles.modal} ${isModalOpen ? Styles.open : ''}`} onClick={(e) => e.stopPropagation()}>
          <button className={Styles.closeModal} onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}>
            x
          </button>

          {editMode ? (
            <div>
              <textarea name="description" value={requestData.description} onChange={handleInputChange}></textarea>
              <input name="location" value={requestData.location} onChange={handleInputChange} />
              <input name="moreInfo" value={requestData.moreInfo} onChange={handleInputChange} />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <p>{requestData.description}</p>
              <p><strong>Location:</strong> {requestData.location}</p>
              <p><strong>More Info:</strong> {requestData.moreInfo}</p>
            </div>
          )}

          <div className={Styles.buttons}>
            <button className={Styles.button} onClick={(e) => { e.stopPropagation(); handleDelete(requestData.id); }}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className={Styles.button} onClick={(e) => { e.stopPropagation(); handleEdit(); }}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button className={Styles.button} onClick={(e) => { e.stopPropagation(); handleAccept(); }}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OSCRequest;
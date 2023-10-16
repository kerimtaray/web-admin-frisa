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
          <button className={Styles.closeModal} onClick={(e) => { e.stopPropagation(); setIsModalOpen(false);
          setIsModalOpen(false);
          setEditMode(false);  }}>
            x
          </button>

          {editMode ? (
            <div className={Styles.editMode}>
              <label htmlFor="description">Description:</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={requestData.description} 
                  onChange={handleInputChange}
                ></textarea>
              <label htmlFor="location">Location:</label>
                <input 
                  id="location" 
                  name="location" 
                  value={requestData.location} 
                  onChange={handleInputChange} 
                />

              <label htmlFor="moreInfo">More Info:</label>
                  <input 
                    id="moreInfo" 
                    name="moreInfo" 
                    value={requestData.moreInfo} 
                    onChange={handleInputChange} 
                  />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div className={Styles.modalContent}>
              <div className={Styles.infoPair}>
                <p className={Styles.label}>Description:</p>
                <p className={Styles.value}>{requestData.description}</p>
              </div>
              <div className={Styles.infoPair}>
                <p className={Styles.label}>Location:</p>
                <p className={Styles.value}>{requestData.location}</p>
              </div>
              <div className={Styles.infoPair}>
                <p className={Styles.label}>More Info:</p>
                <p className={Styles.value}>{requestData.moreInfo}</p>
              </div>
            </div>
          )}

          {!editMode && (
              <div className={Styles.buttons}>
                  <button className={Styles.button} onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(requestData.id);
                  }}>
                      <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button className={Styles.button} onClick={(e) => {
                            e.stopPropagation();
                            handleEdit();
                        }}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button className={Styles.button} onClick={(e) => {
                      e.stopPropagation();
                      handleAccept();
                  }}>
                      <FontAwesomeIcon icon={faCheckCircle} />
                  </button>
              </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OSCRequest;
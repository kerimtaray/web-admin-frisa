import Styles from "./OSCRequest.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useState } from "react";

const OSCRequest = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [requestData, setRequestData] = useState(props.data);

  console.log(props.data)

  const handleDelete = async (_id) => {
    try {
      const res = await axios.delete(`https://api-test-frisa-rmex-dev.fl0.io/admin/rejectOsc/${_id}`);
      console.log(res);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccept = async () => {
    try {
      const res = await axios.put(`https://api-test-frisa-rmex-dev.fl0.io/admin/acceptOsc/${requestData._id}`, { admited: true });
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
      const res = await axios.patch(`https://api-test-frisa-rmex-dev.fl0.io/admin/editOsc/${requestData._id}`, requestData);
      console.log(res);
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
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
              {/* Name */}
              <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  name="name"
                  value={requestData.name}
                  onChange={handleInputChange}
                />
              {/* RFC */}
              <label htmlFor="rfc">RFC:</label>
              <input id="rfc" name="rfc" value={requestData.rfc} onChange={handleInputChange} />

              {/* Description */}
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" value={requestData.description} onChange={handleInputChange} />

              {/* PhoneNumber */}
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input id="phoneNumber" name="phoneNumber" value={requestData.phoneNumber} onChange={handleInputChange} />

              {/* State */}
              <label htmlFor="state">State:</label>
              <input id="state" name="state" value={requestData.state} onChange={handleInputChange} />

              {/* City */}
              <label htmlFor="city">City:</label>
              <input id="city" name="city" value={requestData.city} onChange={handleInputChange} />

              {/* Email */}
              <label htmlFor="email">Email:</label>
              <input id="email" name="email" value={requestData.email} onChange={handleInputChange} />

              {/* Webpage */}
              <label htmlFor="webpage">Webpage:</label>
              <input id="webpage" name="webpage" value={requestData.webpage} onChange={handleInputChange} />

              {/* Category */}
              <label htmlFor="category">Category:</label>
              <input id="category" name="category" value={requestData.category} onChange={handleInputChange} />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
              <div className={Styles.modalContent}>
                <div className={Styles.infoPair}>
                  <p className={Styles.label}>Name:</p>
                  <p className={Styles.value}>{requestData.name}</p>
                </div>

                <div className={Styles.infoPair}>
                  <p className={Styles.label}>Admin Name:</p>
                  <p className={Styles.value}>{requestData.adminName}</p>
                </div>

                <div className={Styles.infoPair}>
                  <p className={Styles.label}>RFC:</p>
                  <p className={Styles.value}>{requestData.rfc}</p>
                </div>

                <div className={Styles.infoPair}>
                  <p className={Styles.label}>Description:</p>
                  <p className={Styles.value}>{requestData.description}</p>
                </div>

                <div className={Styles.infoPair}>
                  <p className={Styles.label}>Phone Number:</p>
                  <p className={Styles.value}>{requestData.phoneNumber}</p>
                </div>

                <div className={Styles.infoPair}>
                  <p className={Styles.label}>State:</p>
                  <p className={Styles.value}>{requestData.state}</p>
                </div>

                <div className={Styles.infoPair}>
                  <p className={Styles.label}>City:</p>
                  <p className={Styles.value}>{requestData.city}</p>
                </div>

                <div className={Styles.infoPair}>
                  <p className={Styles.label}>Email:</p>
                  <p className={Styles.value}>{requestData.email}</p>
                </div>

                <div className={Styles.infoPair}>
                  <p className={Styles.label}>Webpage:</p>
                  <p className={Styles.value}>{requestData.webpage}</p>
                </div>

                <div className={Styles.infoPair}>
                  <p className={Styles.label}>Category:</p>
                  <p className={Styles.value}>{requestData.category}</p>
                </div>

                <div className={Styles.infoPair}>
                  <p className={Styles.label}>Val Given:</p>
                  <p className={Styles.value}>{requestData.valGiven}</p>
                </div>

                <div className={Styles.infoPair}>
                  <p className={Styles.label}>Total Votes:</p>
                  <p className={Styles.value}>{requestData.totalVotes}</p>
                </div>

                <div className={Styles.infoPair}>
                  <p className={Styles.label}>Average:</p>
                  <p className={Styles.value}>{requestData.avg}</p>
                </div>

                <div className={Styles.infoPair}>
                  <p className={Styles.label}>Is Admin:</p>
                  <p className={Styles.value}>{requestData.isAdmin ? "Yes" : "No"}</p>
                </div>

                <div className={Styles.infoPair}>
                  <p className={Styles.label}>Admitted:</p>
                  <p className={Styles.value}>{requestData.admited ? "Yes" : "No"}</p>
                </div>
              </div>
            )}
          {!editMode && (
              <div className={Styles.buttons}>
                  <button className={Styles.button} onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(requestData._id);
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